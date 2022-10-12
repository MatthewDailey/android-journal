import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { JournalEntry } from "../types";
import { DateListItem, EditingListItem, GratitudeListItem, JournalListItem, NoEntryListItem } from './list_items';

type AddNewProps = {
    type: 'journal' | 'gratitude';
    onTextChange: (text: string) => void;
}

type ListItemType = {
    type: 'date',
    dateMs: number
} | {
    type: 'no_entry',
} | {
    type: 'entry',
    entryData: JournalEntry,
} | {
    type: 'editing',
    addNewProps: AddNewProps,
}

const roundToDay = (dateMs: number) => {
    const date = new Date(dateMs)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

export const ScrollingList = (props: { entries: JournalEntry[], addNew?: AddNewProps }) => {
    const renderItem = ({item} : {item: ListItemType}) => {
        switch(item.type) {
            case 'date':
                return <DateListItem dateMs={item.dateMs} />
            case 'no_entry':
                return <NoEntryListItem />
            case 'editing':
                return <EditingListItem header={item.addNewProps.type === 'gratitude' ? "I'm grateful for..." : undefined} onChangeText={item.addNewProps.onTextChange} />
            case 'entry':
                if (item.entryData.type === 'gratitude') {
                    return <GratitudeListItem text={item.entryData.text} dateMs={item.entryData.dateMs} />
                } else if (item.entryData.type === 'journal') {
                    return <JournalListItem text={item.entryData.text} dateMs={item.entryData.dateMs} />
                }
            default:
                return null
        }
    }

    const localEntries = [...props.entries]
    localEntries.sort((a, b) => b.dateMs - a.dateMs)

    const entryListToRender: ListItemType[] = []
    const nowMs = new Date().getTime()
    entryListToRender.push({ type: 'date', dateMs: nowMs })

    if (props.addNew) {
        entryListToRender.push({ type: 'editing', addNewProps: props.addNew })  
    }

    const today = roundToDay(nowMs)
    let mostRecentlyAddedDay = today

    if (!props.addNew && (localEntries.length === 0 || roundToDay(localEntries[0].dateMs) < today)) {
        entryListToRender.push({ type: 'no_entry' })
    }

    localEntries.forEach(entry => { 
        const entryDay = roundToDay(entry.dateMs)
        if (entryDay < mostRecentlyAddedDay) {
            entryListToRender.push({ type: 'date', dateMs: entry.dateMs })
            mostRecentlyAddedDay = entryDay
        }
        entryListToRender.push({ type: 'entry', entryData: entry }) 
    })

    return (
        <FlatList 
            data={entryListToRender}
            renderItem={renderItem}
        />
    )
}