import {Text, View, StyleSheet} from "react-native";
import {Link} from "expo-router";
import {useEffect, useState} from "react";
import PowerSync from "../../libs/PowerSync"
import {BackendConnector} from "@/libs/BackendConnector";

export default function Index() {

    const [attendees, setAttendees] = useState<any>([]);

    useEffect(() => {
        console.log("Booting PowerSync");
        const ps = new PowerSync();
        const connector = new BackendConnector();
        ps.db.init().then(() => {
            ps.db.connect(connector).then(() => {
                console.log("Database Connected");
                ps.db.get("SELECT * FROM attendee").then((data) => {
                    console.log(data);
                })
            });
        });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home screen</Text>
            { attendees.forEach(() => {

            }) }
            <Link href="/(tabs)/about" style={styles.button}>
                Go to about
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
    },
    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
    }
});
