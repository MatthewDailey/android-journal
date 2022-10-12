import { JournalEntry } from "./types";

export type JournalEntriesProps = {
    entries: JournalEntry[];
    addEntry: (entry: JournalEntry) => void;
    removeEntry: (entry: JournalEntry) => void;
}

export default {
    useJournalEntries: (): JournalEntriesProps => {
        return {
            entries: [],
            addEntry: () => { },
            removeEntry: () => { },
        }
    }
}