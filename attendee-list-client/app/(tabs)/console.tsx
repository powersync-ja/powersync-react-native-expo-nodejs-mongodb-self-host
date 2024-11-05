import {useState} from "react";
import {StyleSheet, Animated, TextInput, Button, View} from 'react-native';
import { Table, Row } from 'react-native-reanimated-table';
import {QueryResult} from "@powersync/common";
import {useSystem} from "@/libs/powersync/System";
import ScrollView = Animated.ScrollView;

const DEFAULT_QUERY = 'SELECT * from attendee LIMIT 100';

export default function Console() {
    const { powersync } = useSystem();
    const [query, setQuery] = useState<string>(DEFAULT_QUERY);
    const [output, setOutput] = useState<QueryResult | null>(null);

    const handlePress = async () => {
        const result = await powersync.execute(query);
        setOutput(result);
    }

    const rows = output?.rows?._array ?? [];
    const firstItem = output?.rows?.item(0);
    const cellKeys = firstItem ? Object.keys(firstItem) : [];

    return (
        <View style={styles.container}>
            <ScrollView key={'console'}>
                <TextInput
                    placeholder={DEFAULT_QUERY}
                    value={query}
                    onChangeText={setQuery}
                    style={styles.text}
                />
                <Button title={"Execute"} onPress={handlePress} />
                {output ? (
                    <Table borderStyle={styles.table}>
                        <Row style={styles.row} data={cellKeys} />
                        {rows.map((row, index) => (
                            <Row key={index.toString()} data={cellKeys.map((key) => row[key])} />
                        ))}
                    </Table>
                ) : null}
            </ScrollView>
        </View>
    );
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
