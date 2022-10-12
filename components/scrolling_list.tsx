import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { JournalEntry } from "../types";
import { DateListItem, EditingListItem, GratitudeListItem, JournalListItem, NoEntryListItem } from './list_items';

type ListItemType = {
    type: 'date',
    dateMs: number
} | {
    type: 'no_entry',
} | {
    type: 'entry',
    entryData: JournalEntry,
}


export const ScrollingList = (props: { entries: JournalEntry[] }) => {
    const renderItem = ({item} : {item: ListItemType}) => {
        switch(item.type) {
            case 'date':
                return <DateListItem dateMs={item.dateMs} />
            case 'no_entry':
                return <NoEntryListItem />
            default:
                return null
        }
    }

    const entryListToRender: ListItemType[] = []
    entryListToRender.push({ type: 'date', dateMs: new Date().getTime() })
    entryListToRender.push({ type: 'no_entry' })

    return (
        <FlatList 
            data={entryListToRender}
            renderItem={renderItem}
        />
    )
}