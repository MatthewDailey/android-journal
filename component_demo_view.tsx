import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton, ButtonContainer } from "./components/button";
import { DateListItem, EditingListItem, GratitudeListItem, NoEntryListItem } from "./components/list_items";
import { StreakHeader } from "./components/streak";
import { JournalEntry } from "./types";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
});


const exampleList: JournalEntry[] = [
    {
        dateMs: new Date('2022-10-10T20:12:30.913Z').getTime(),
        type: 'gratitude',
        text: 'for my family',
    },
    {
        dateMs: new Date('2022-10-10T20:12:30.913Z').getTime(),
        type: 'gratitude',
        text: 'for my friends',
    },
    {
        dateMs: new Date('2022-10-10T20:12:30.913Z').getTime(),
        type: 'gratitude',
        text: 'for my health',
    },
    {
        dateMs: new Date('2022-10-10T20:12:30.913Z').getTime(),
        type: 'journal',
        text: 'I am grateful for my family, friends, and health.',
    },
    {
        dateMs: new Date('2022-10-10T20:12:30.913Z').getTime(),
        type: 'gratitude',
        text: 'for my health',
    },
    {
        dateMs: new Date('2022-10-09T20:12:30.913Z').getTime(),
        type: 'journal',
        text: 'This is a long string that will wrap to many lines that needs to be truncated so that this element does not take up too much space.',
    },
    {
        dateMs: new Date('2022-10-08T20:12:30.913Z').getTime(),
        type: 'gratitude',
        text: 'for my health',
    },
    {
        dateMs: new Date('2022-10-07T20:12:30.913Z').getTime(),
        type: 'gratitude',
        text: 'for my health',
    },
    {
        dateMs: new Date('2022-10-05T20:12:30.913Z').getTime(),
        type: 'journal',
        text: 'This is a long string that will wrap to many lines that needs to be truncated so that this element does not take up too much space.',
    },
    {
        dateMs: new Date('2022-10-05T20:10:30.913Z').getTime(),
        type: 'gratitude',
        text: 'for my health',
    },
]

export function ComponentDemoView() {
    const [streakCount, setStreakCount] = React.useState(0);

    return (
        <View style={styles.container}>
            <StreakHeader count={streakCount} isStreak={streakCount > 1} />
            <DateListItem dateMs={new Date().getTime()}/>
            <EditingListItem header="I'm grateful for..." onChangeText={function (text: string): void {} } />
            <DateListItem dateMs={new Date().getTime()}/>
            <NoEntryListItem />
            <DateListItem dateMs={new Date().getTime() - 1000 * 60 * 60 * 24}/>
            <GratitudeListItem text="This is a long string that will wrap to many lines that needs to be truncated so that this element does not take up too much space." dateMs={1665553993440} />
            <ButtonContainer>
                <PrimaryButton onPress={() => { setStreakCount(streakCount + 1)} } text="Increment" />
                <PrimaryButton onPress={() => { setStreakCount(streakCount - 1)} } text="Decrement" />
            </ButtonContainer>
        </View>
    );
}
