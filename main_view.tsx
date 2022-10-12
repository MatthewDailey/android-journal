import React from "react";
import { StyleSheet, View } from "react-native";
import { ButtonContainer, PrimaryButton } from "./components/button";
import { AddNewProps, ScrollingList } from "./components/scrolling_list";
import { StreakHeader } from "./components/streak";
import JournalEntryHooks from "./journal_entries_hook";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

type AppState = "viewing" | "addingGratitude" | "addingJournal" | "removing";

export const MainView = () => {
    const [appState, setAppState] = React.useState<AppState>("viewing");
    const { entries, addEntry, removeEntry } = JournalEntryHooks.useJournalEntries();

    const [newEntry, setNewEntry] = React.useState<string>("");
    const onTextChange = setNewEntry;

    const buttonsFragment = () => {
        switch (appState) {
            case "addingJournal":
                return (<ButtonContainer>
                    <PrimaryButton text="Cancel" onPress={() => {setAppState('viewing') }} />
                    <PrimaryButton text="Save" onPress={() => { 
                        addEntry({type: 'journal', text: newEntry, dateMs: Date.now()});
                        setAppState('viewing');
                    }} />
                </ButtonContainer>)
            case "addingGratitude":
                return (<ButtonContainer>
                    <PrimaryButton text="Cancel" onPress={() => {setAppState('viewing') }} />
                    <PrimaryButton text="Save" onPress={() => { 
                        addEntry({type: 'gratitude', text: newEntry, dateMs: Date.now()});
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