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
// TODO: add editing type


const roundToDay = (dateMs: number) => {
    const date = new Date(dateMs)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

export const ScrollingList = (props: { entries: JournalEntry[] }) => {
    const renderItem = ({item} : {item: ListItemType}) => {
        switch(item.type) {
            case 'date':
                return <DateListItem dateMs={item.dateMs} />
            case 'no_entry':
                return <NoEntryListItem />
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

    // TODO consider sorting entries by date

    const entryListToRender: ListItemType[] = []
    const nowMs = new Date().getTime()
    entryListToRender.push({ type: 'date', dateMs: nowMs })

    const today = roundToDay(nowMs)
    let mostRecentlyAddedDay = today

    if (props.entries.length === 0 || roundToDay(props.entries[0].dateMs) < today) {
        entryListToRender.push({ type: 'no_entry' })
    }

    props.entries.forEach(entry => { 
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