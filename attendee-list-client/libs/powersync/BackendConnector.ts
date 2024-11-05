import {AbstractPowerSyncDatabase, CrudEntry, PowerSyncBackendConnector, UpdateType} from "@powersync/react-native";
import {AppConfig} from "@/libs/powersync/AppConfig";
import {ApiClient} from "@/libs/ApiClient";

const FATAL_RESPONSE_CODES = [
    // Class 22 — Data Exception
    // Examples include data type mismatch.
    new RegExp('^22...$'),
    // Class 23 — Integrity Constraint Violation.
    // Examples include NOT NULL, FOREIGN KEY and UNIQUE violations.
    new RegExp('^23...$'),
    // INSUFFICIENT PRIVILEGE - typically a row-level security violation
    new RegExp('^42501$')
];

export class BackendConnector implements PowerSyncBackendConnector {

    private apiClient: ApiClient;

    constructor() {
        const backendUrl = AppConfig.backendUrl ? AppConfig.backendUrl : "";
        this.apiClient = new ApiClient(backendUrl);
    }

    async fetchCredentials() {
        const auth = await this.apiClient.getToken("");
        const powersyncUrl = AppConfig.powersyncUrl ? AppConfig.powersyncUrl : "";
        const data = {
            endpoint: powersyncUrl,
            token: auth.token
        }
        console.log(data);
        return data;
    }

    async uploadData(database: AbstractPowerSyncDatabase): Promise<void> {
        const transaction = await database.getNextCrudTransaction();

        if (!transaction) {
            return;
        }

        let lastOp: CrudEntry | null = null;
        try {
            // Note: If transactional consistency is important, use database functions
            // or edge functions to process the entire transaction in a single call.
            for (const op of transaction.crud) {
                lastOp = op;
                const record = { table: op.table, data: { ...op.opData, id: op.id } };
                console.log(record);
                switch (op.op) {
                    case UpdateType.PUT:
                        await this.apiClient.upsert(record);
                        break;
                    case UpdateType.PATCH:
                        await this.apiClient.update(record);
                        break;
                    case UpdateType.DELETE:
                        await this.apiClient.delete(record);
                        break;
                }
            }

            await transaction.complete();
        } catch (ex: any) {
            console.debug(ex);
            if (typeof ex.code == 'string' && FATAL_RESPONSE_CODES.some((regex) => regex.test(ex.code))) {
                /**
                 * Instead of blocking the queue with these errors,
                 * discard the (rest of the) transaction.
                 *
                 * Note that these errors typically indicate a bug in the application.
                 * If protecting against data loss is important, save the failing records
                 * elsewhere instead of discarding, and/or notify the user.
                 */
                console.error('Data upload error - discarding:', lastOp, ex);
                await transaction.complete();
            } else {
                // Error may be retryable - e.g. network error or temporary server error.
                // Throwing an error here causes this call to be retried after a delay.
                throw ex;
            }
        }
    }
}
