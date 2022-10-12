import React from 'react'
import { JournalEntry } from "./types";

export type JournalEntriesProps = {
    entries: JournalEntry[];
    addEntry: (entry: JournalEntry) => void;
    removeEntry: (entry: JournalEntry) => void;
}

export default {
    useJournalEntries: (): JournalEntriesProps => {
        const [entries, setEntries] = React.useState<JournalEntry[]>([]);
    
        return {
            entries,
            addEntry: (entry) => { 
                setEntries([entry].concat(entries));
            },
            removeEntry: () => { },
        }
    }
}