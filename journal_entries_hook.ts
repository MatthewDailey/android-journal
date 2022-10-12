import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JournalEntry } from "./types";

export type JournalEntriesProps = {
    entries: JournalEntry[];
    addEntry: (entry: JournalEntry) => void;
    removeEntry: (entry: JournalEntry) => void;
}

const STORAGE_KEY = "@journal_entries";

function storeEntries(entries: JournalEntry[]) {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export default {
    useJournalEntries: (): JournalEntriesProps => {
        const [entries, setEntries] = React.useState<JournalEntry[]>([]);
    
        React.useEffect(() => {
            AsyncStorage.getItem(STORAGE_KEY).then((entriesStr) => { entriesStr && setEntries(JSON.parse(entriesStr)) });
        }, []);

        return {
            entries,
            addEntry: (entry) => { 
                const newEntries = [entry].concat(entries)
                setEntries(newEntries);
                AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
            },
            removeEntry: () => { },
        }
    }
}