export type JournalEntry = {
    dateMs: number;
    type: "journal"|"gratitude";
    text: string;
}