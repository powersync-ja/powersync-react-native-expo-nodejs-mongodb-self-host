import '@azure/core-asynciterator-polyfill';

import { PowerSyncDatabase } from '@powersync/react-native';
import React from 'react';

// import Logger from 'js-logger';
import { AppSchema } from './AppSchema';
import { BackendConnector} from "@/libs/powersync/BackendConnector";
import { OPSqliteOpenFactory } from "@powersync/op-sqlite";

// Logger.useDefaults();

export class System {
    connector: BackendConnector;
    powersync: PowerSyncDatabase;

    constructor() {
        this.connector = new BackendConnector();
        const factory = new OPSqliteOpenFactory({
            dbFilename: 'sqlite.db'
        });
        this.powersync = new PowerSyncDatabase({
            database: factory,
            schema: AppSchema
        });
    }

    async init() {
        await this.powersync.init();
        await this.powersync.connect(this.connector);
        console.log(this.powersync.connected);
    }
}

export const system = new System();

export const SystemContext = React.createContext(system);
export const useSystem = () => React.useContext(SystemContext);
