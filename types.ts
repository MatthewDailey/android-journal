export type JournalEntry = {
    id: string;
    dateMs: number;
    type: "journal"|"gratitude",
}