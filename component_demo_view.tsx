import React from "react";
import { StyleSheet, View } from "react-native";
import { ButtonContainer, PrimaryButton } from "./components/button";
import { ScrollingList } from "./components/scrolling_list";
import { StreakHeader } from "./components/streak";
import { JournalEntry } from "./types";

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
            <StreakHeader count={streakCount} isStreakActive={streakCount > 1} />
            <ScrollingList entries={exampleList} editing={streakCount === 1 ? { type:"gratitude", onTextChange(text) {}} : undefined}/>
            <ButtonContainer>
                <PrimaryButton onPress={() => { setStreakCount(streakCount + 1)} } text="Increment" />
                <PrimaryButton onPress={() => { setStreakCount(streakCount - 1)} } text="Decrement" />
            </ButtonContainer>
        </View>
    );
}
