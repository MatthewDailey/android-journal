import React from "react";
import { StyleSheet, View, StatusBar as RNStatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ButtonContainer, PrimaryButton } from "./components/button";
import { EditingProps, ScrollingList } from "./components/scrolling_list";
import { StreakHeader } from "./components/streak";
import { colors, ONE_DAY_MS } from "./constants";
import JournalEntryHooks from "./journal_entries_hook";
import { JournalEntry } from "./types";

const styles = StyleSheet.create({
    container: {
        marginTop: RNStatusBar.currentHeight,
        flex: 1,
    },
});

type AppState = "viewing" | "addingGratitude" | "addingJournal" | "removing";

function roundToDayOfYear(ms: number): number {
    const date = new Date(ms)
    return Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
}

function firstEntryIsToday(entries: JournalEntry[]): boolean {
    return entries.length > 0 && roundToDayOfYear(entries[0].dateMs) === roundToDayOfYear(Date.now());
}

function firstEntryIsYesterday(entries: JournalEntry[]): boolean {
    return entries.length > 0 && roundToDayOfYear(entries[0].dateMs) === roundToDayOfYear(Date.now() - ONE_DAY_MS);
}

function computeStreak(entries: JournalEntry[]): number {
    if (!(firstEntryIsToday(entries) || firstEntryIsYesterday(entries))) {
        return 0
    }
    let streak = 0

    // Init to tomorrow if we know the streak starts today.
    let lastDate = Date.now() + (firstEntryIsToday(entries) ? ONE_DAY_MS : 0)
    for (const entry of entries) {
        const dayDifference = roundToDayOfYear(lastDate) - roundToDayOfYear(entry.dateMs)
        if (dayDifference === 1) {
            streak++;
        } else if (dayDifference > 1) {
            break;
        }
        lastDate = entry.dateMs;
    }
    console.log("streak", streak)
    return streak;
}

export const MainView = () => {
    const [appState, setAppState] = React.useState<AppState>("viewing");
    const { entries, addEntry, removeEntry } = JournalEntryHooks.useJournalEntries();
    const [entryBeingRemoved, setRemovingEntry] = React.useState<JournalEntry | undefined>(undefined);

    const [newEntry, setNewEntry] = React.useState<string>("");
    const onTextChange = setNewEntry;

    const onClickDelete = () => {
        if (entryBeingRemoved) {
            removeEntry(entryBeingRemoved);
            setRemovingEntry(undefined);
        }
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
            case "removing":
                return (<ButtonContainer>
                    <PrimaryButton text="Cancel" onPress={() => { setAppState('viewing') }} />
                    <PrimaryButton text="Delete" onPress={() => { 
                        onClickDelete(); 
                        setAppState('viewing') 
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

    const getEditing = (): EditingProps | undefined => {
        if (entryBeingRemoved) {
            return {
                type: "removing",
                entry: entryBeingRemoved,
            }
        }
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
    const considerRemoving = (entry: JournalEntry) => {
        console.log("Consider removing", entry)
        setRemovingEntry(entry);
        setAppState("removing");
    }

    return (
        <View style={styles.container}>
            <StreakHeader count={computeStreak(entries)} isStreakActive={isActiveStreak} />
            <ScrollingList entries={entries} editing={getEditing()} considerRemoving={considerRemoving}/>
            {buttonsFragment()}
            <ExpoStatusBar backgroundColor={isActiveStreak ? colors.green : colors.red} />
        </View >
    );
}