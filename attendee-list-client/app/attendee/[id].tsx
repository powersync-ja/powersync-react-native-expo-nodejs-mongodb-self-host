import {useEffect, useState} from "react";
import {StyleSheet, View} from 'react-native';
import {Stack, useLocalSearchParams} from "expo-router";
import {useSystem} from "@/libs/powersync/System";
import {Paragraph, Switch} from "react-native-paper";

export default function Attendee() {
    const { powersync } = useSystem();
    const params = useLocalSearchParams<{ id: string }>();
    const attendee_id = params.id;

    const [isLoading, setIsLoading] = useState(false);
    const [attendee, setAttendee] = useState<any | null>(null);
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    useEffect(() => {
        const loadAttendees = async () => {
            setIsLoading(true);
            const data = await powersync.execute("SELECT * FROM attendee WHERE id = ?", [attendee_id]);
            const rows = data.rows;
            const attendee = rows?._array[0];
            setAttendee(attendee);
            setIsSwitchOn(() => {
                return attendee.checked_id === 1;
            })
            setIsLoading(false);
        }
        loadAttendees()
    }, [])

    const onToggleSwitch = async () => {
        setIsSwitchOn(!isSwitchOn)
        if(isSwitchOn) {
            await powersync.execute("UPDATE attendee SET checked_id = ? WHERE id = ?", [1, attendee_id]);
        }
    }

    if (isLoading) {
        return (
            <View>
                <Stack.Screen
                    options={{
                        title: "Loading attendee data"
                    }}
                />
                <Paragraph style={styles.text}>Loading...</Paragraph>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Stack.Screen
                    options={{
                        title: "Attendee Information"
                    }}
                />
                <Paragraph style={styles.text}>First Name: {attendee?.first_name}</Paragraph>
                <Paragraph style={styles.text}>Last Name: {attendee?.last_name}</Paragraph>
                <Paragraph style={styles.text}>Email: {attendee?.email}</Paragraph>
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e'
    },
    text: {
        color: '#fff'
    },
    row: {
        backgroundColor: '#999',
        color: '#25292e'
    },
    table: {
        borderWidth: 2,
        padding: 2,
    }
});
