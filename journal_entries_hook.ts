import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JournalEntry } from "./types";

export type JournalEntriesProps = {
    entries: JournalEntry[];
    addEntry: (entry: JournalEntry) => void;
    removeEntry: (entry: JournalEntry) => void;
}

const STORAGE_KEY = "@journal_entries";

async function storeEntries(entries: JournalEntry[]) {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
        console.log("Stored entries", entries);
    } catch (e) {
        console.error("Failed to store entries", e);
    }
}

export default {
    useJournalEntries: (): JournalEntriesProps => {
        const [entries, setEntries] = React.useState<JournalEntry[]|undefined>(undefined);
    
        React.useEffect(() => {
            AsyncStorage.getItem(STORAGE_KEY)
            .then((entriesStr) => { 
                console.log("Loaded entries", entriesStr);
                if (entriesStr) {
                    setEntries(JSON.parse(entriesStr));
                } else {
                    setEntries([]);
                }
            });
        }, []);

        return {
            entries,
            addEntry: (entry) => { 
                const newEntries = [entry].concat(entries)
                setEntries(newEntries);
                storeEntries(newEntries);
            },
            removeEntry: () => { },
        }
    }
}