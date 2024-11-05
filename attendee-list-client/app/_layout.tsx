import {useEffect, useMemo} from "react";
import { Stack } from 'expo-router';
import { PowerSyncContext } from '@powersync/react';
import { useSystem } from "@/libs/powersync/System";

export default function RootLayout() {
    const system = useSystem();

    useEffect(() => {
        system.init();
    }, []);

    const db = useMemo(() => {
        return system.powersync;
    }, []);

    return (
        <PowerSyncContext.Provider value={db}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>
        </PowerSyncContext.Provider>
    );
}
