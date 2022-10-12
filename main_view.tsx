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

type JournalEntriesProps = {
    entries: JournalEntry[];
    addEntry: (entry: JournalEntry) => void;
    removeEntry: (entry: JournalEntry) => void;
}
export const useJournalEntries = (): JournalEntriesProps => {
    return {
        entries: [],
        addEntry: () => {},
        removeEntry: () => {},
    }
}

type AppState = "viewing" | "adding" | "removing";

export const MainView = () => {
    const [appState, setAppState] = React.useState<AppState>("viewing");
    const { entries, addEntry, removeEntry } = useJournalEntries();

    return (
        <View style={styles.container}>
            <StreakHeader count={0} isStreak={false} />
            <ScrollingList entries={entries} />
            <ButtonContainer>
                <PrimaryButton text="Journal" onPress={() => setAppState("adding")} />
                <PrimaryButton text="Gratitude" onPress={() => setAppState("removing")} />
            </ButtonContainer>
        </View>
    );
}