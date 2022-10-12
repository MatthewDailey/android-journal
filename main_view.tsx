import React from "react";
import { StyleSheet, View } from "react-native";
import { ButtonContainer, PrimaryButton } from "./components/button";
import { AddNewProps, ScrollingList } from "./components/scrolling_list";
import { StreakHeader } from "./components/streak";
import { JournalEntry } from "./types";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

type JournalEntriesProps = {
    entries: JournalEntry[];
    addEntry: (entry: JournalEntry) => void;
    removeEntry: (entry: JournalEntry) => void;
}
export const useJournalEntries = (): JournalEntriesProps => {
    return {
        entries: [],
        addEntry: () => { },
        removeEntry: () => { },
    }
}

type AppState = "viewing" | "addingGratitude" | "addingJournal" | "removing";

export const MainView = () => {
    const [appState, setAppState] = React.useState<AppState>("viewing");
    const { entries, addEntry, removeEntry } = useJournalEntries();

    const onTextChange = () => { }

    const buttonsFragment = () => {
        switch (appState) {
            case "addingJournal":
            case "addingGratitude":
                return (<ButtonContainer>
                    <PrimaryButton text="Cancel" onPress={() => {setAppState('viewing') }} />
                    <PrimaryButton text="Save" onPress={() => { }} />
                </ButtonContainer>)
            case "viewing":
            default:
                return (<ButtonContainer>
                    <PrimaryButton text="Journal" onPress={() => setAppState("addingJournal")} />
                    <PrimaryButton text="Gratitude" onPress={() => setAppState("addingGratitude")} />
                </ButtonContainer>)
        }
    }

    const getAddNew = () : AddNewProps|undefined => {
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

    return (
        <View style={styles.container}>
            <StreakHeader count={0} isStreak={false} />
            <ScrollingList entries={entries} addNew={getAddNew()} />
            {buttonsFragment()}
        </View >
    );
}