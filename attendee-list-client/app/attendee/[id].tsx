import {useEffect, useState} from "react";
import {StyleSheet, View} from 'react-native';
import {Stack, useLocalSearchParams} from "expo-router";
import {useSystem} from "@/libs/powersync/System";
import {Button, Paragraph, Switch, TextInput} from "react-native-paper";

export default function Attendee() {
    const { powersync } = useSystem();
    const params = useLocalSearchParams<{ id: string }>();
    const attendee_id = params.id;

    const [isLoading, setIsLoading] = useState(false);
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const loadAttendees = async () => {
            setIsLoading(true);
            const data = await powersync.execute("SELECT * FROM attendee WHERE id = ?", [attendee_id]);
            const rows = data.rows;
            const attendee = rows?._array[0];

            setFirstName(attendee.first_name);
            setLastName(attendee.last_name);
            setEmail(attendee.email);
            setIsSwitchOn(() => {
                return attendee.checked_id === 1;
            })
            setIsLoading(false);
        }
        loadAttendees()
    }, [])

    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
    }

    const handleSave = async () => {
        const int = !isSwitchOn ? 0 : 1;
        console.log(int);
        await powersync.execute("UPDATE attendee SET checked_in = ?, first_name = ?, last_name = ?, email = ? WHERE id = ?", [int, first_name, last_name, email ,attendee_id]);
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
                <TextInput style={{margin: 20}}
                    label="First name"
                    value={first_name}
                    onChangeText={text => setFirstName(text)}
                />
                <TextInput style={{margin: 20}}
                    label="Last name"
                    value={last_name}
                    onChangeText={text => setLastName(text)}
                />

                <TextInput style={{margin: 20}}
                    label="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />

                <Paragraph style={styles.text}>Checked In?</Paragraph>
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                <Button onPress={handleSave}>Save</Button>
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
