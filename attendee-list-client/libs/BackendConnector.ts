import { PowerSyncBackendConnector } from "@powersync/react-native";
import {AppConfig} from "@/libs/AppConfig";
import {ApiClient} from "@/libs/ApiClient";

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

    async uploadData () {

    }
}
