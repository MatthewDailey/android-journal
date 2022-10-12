import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { ButtonContainer, PrimaryButton } from "./components/button";
import { AddNewProps, roundToDay, ScrollingList } from "./components/scrolling_list";
import { StreakHeader } from "./components/streak";
import { colors, ONE_DAY_MS } from "./constants";
import JournalEntryHooks from "./journal_entries_hook";
import { JournalEntry } from "./types";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

type AppState = "viewing" | "addingGratitude" | "addingJournal" | "removing";

function firstEntryIsToday(entries: JournalEntry[]): boolean {
    return entries.length > 0 && roundToDay(entries[0].dateMs) === roundToDay(Date.now());
}

function firstEntryIsYesterday(entries: JournalEntry[]): boolean {
    return entries.length > 0 && roundToDay(entries[0].dateMs) === roundToDay(Date.now() - ONE_DAY_MS);
}

function computeStreak(entries: JournalEntry[]): number {
    if (!(firstEntryIsToday(entries) || firstEntryIsYesterday(entries))) {
        return 0
    }
    let streak = 0

    // Init to tomorrow if we know the streak starts today.
    let lastDate = Date.now() + (firstEntryIsToday(entries) ? ONE_DAY_MS : 0)
    for (const entry of entries) {
        const dayDifference = roundToDay(lastDate) - roundToDay(entry.dateMs)
        if (dayDifference === ONE_DAY_MS) {
            streak++;
        } else if (dayDifference > ONE_DAY_MS) {
            break;
        }
        lastDate = entry.dateMs;
    }
    return streak;
}

export const MainView = () => {
    const [appState, setAppState] = React.useState<AppState>("viewing");
    const { entries, addEntry, removeEntry } = JournalEntryHooks.useJournalEntries();

    const [newEntry, setNewEntry] = React.useState<string>("");
    const onTextChange = setNewEntry;

    if (!entries) {
        return null;
    }

    const buttonsFragment = () => {
        switch (appState) {
            case "addingJournal":
                return (<ButtonContainer>
                    <PrimaryButton text="Cancel" onPress={() => { setAppState('viewing') }} />
                    <PrimaryButton text="Save" onPress={() => {
                        addEntry({ type: 'journal', text: newEntry, dateMs: Date.now() });
                        setAppState('viewing');
                    }} />
                </ButtonContainer>)
            case "addingGratitude":
                return (<ButtonContainer>
                    <PrimaryButton text="Cancel" onPress={() => { setAppState('viewing') }} />
                    <PrimaryButton text="Save" onPress={() => {
                        addEntry({ type: 'gratitude', text: newEntry, dateMs: Date.now() });
                        setAppState('viewing');
                    }} />
                </ButtonContainer>)
            case "viewing":
            default:
                return (<ButtonContainer>
                    <PrimaryButton text="Journal" onPress={() => setAppState("addingJournal")} />
                    <PrimaryButton text="Gratitude" onPress={() => setAppState("addingGratitude")} />
                </ButtonContainer>)
        }
    }

    const getAddNew = (): AddNewProps | undefined => {
        switch (appState) {
            case "addingJournal":
                return {
                    type: "journal",
                    onTextChange
                }
            case "addingGratitude":
                return {
                    type: "gratitude",
                    onTextChange
                }
            default:
                undefined
        }
    }

    const isActiveStreak = firstEntryIsToday(entries);

    return (
        <View style={styles.container}>
            <StreakHeader count={computeStreak(entries)} isStreakActive={isActiveStreak} />
            <ScrollingList entries={entries} addNew={getAddNew()} />
            {buttonsFragment()}
            <StatusBar 
                barStyle="light-content" 
                backgroundColor={isActiveStreak ? colors.green : colors.red}
            />
        </View >
    );
}