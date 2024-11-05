import { PowerSyncDatabase } from '@powersync/react-native';
import { OPSqliteOpenFactory } from '@powersync/op-sqlite';
import { AppSchema } from './AppSchema';

export default class PowerSync {
    public db: PowerSyncDatabase;

    constructor() {
        const factory = new OPSqliteOpenFactory({
            dbFilename: 'sqlite.db'
        });
        this.db = new PowerSyncDatabase({ database: factory, schema: AppSchema });
    }
}
