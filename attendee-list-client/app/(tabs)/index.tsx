import {FlatList, StyleSheet, View} from "react-native";
import {useEffect, useState} from "react";
import {Card, Paragraph, Title, Button, Chip} from 'react-native-paper';
import {useSystem} from "@/libs/powersync/System";
import {AttendeeRecord} from "@/libs/powersync/AppSchema";
import {router} from "expo-router";

export default function Index() {
    const { powersync } = useSystem();
    const [attendees, setAttendees] = useState<any>([]);

    useEffect(() => {
        const loadAttendees = async () => {
            console.log("Loading attendees");
            const result = await powersync.execute("SELECT * FROM attendee");
            const attendee_list = result.rows?._array.map((row) => {
                return {
                    id: row.id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    email: row.email
                };
            })
            setAttendees(attendee_list);
        }

        loadAttendees();
    }, []);

    const isCheckedIn = (attendee: any) => {
        return attendee.checked_id === 1 ? "Yes" : "No";
    }

    const renderItem = ({ item }: { item: AttendeeRecord }) => (
        <Card style={styles.card}>
            <Card.Content>
                <Title>{`${item.first_name} ${item.last_name}`}</Title>
                <Paragraph>{item.email}</Paragraph>
                <Card.Actions>
                    <Button onPress={() => {
                        router.push({
                            pathname: '../attendee/[id]',
                            params: { id: item.id }
                        });
                    }}>{">"}</Button>
                </Card.Actions>
                <Chip icon="information">Checked In? ({isCheckedIn(item)})</Chip>
            </Card.Content>
        </Card>
    );

    return (
        <View style={styles.container}>
            <Paragraph style={styles.text}>Attendees</Paragraph>
            <FlatList
                data={attendees}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
    },
    text: {
        color: '#fff',
    },
    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
    },
    card: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        elevation: 3, // For shadow on Android
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 14,
        color: 'gray',
    },
});
