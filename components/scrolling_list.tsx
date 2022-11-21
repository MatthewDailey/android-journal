import React, { MutableRefObject } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { JournalEntry } from "../types";
import { DateListItem, EditingListItem, GratitudeListItem, JournalListItem, NoEntryListItem } from './list_items';

export type EditingProps = {
    type: 'journal' | 'gratitude';
    onTextChange: (text: string) => void;
} | {
    type: 'removing';
    entry: JournalEntry;
}

export type ListItemType = {
    type: 'date',
    dateMs: number
} | {
    type: 'no_entry',
} | {
    type: 'entry',
    entryData: JournalEntry,
} | {
    type: 'editing',
    addNewProps: EditingProps,
}

export const roundToDay = (dateMs: number) => {
    const date = new Date(dateMs)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() 
}

const longPressable = (component: JSX.Element, onLongPress: () => void) => {
    return (
        <Pressable onLongPress={onLongPress}>
            {component}
        </Pressable>
    )
}

export const ScrollingList = (props: { entries: JournalEntry[], editing?: EditingProps, considerRemoving: (entry: JournalEntry) => void }) => {
    const flatListRef = React.useRef<FlatList<ListItemType>>(null)

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
                    return longPressable(<GratitudeListItem text={item.entryData.text} dateMs={item.entryData.dateMs} />, () => props.considerRemoving(item.entryData))
                } else if (item.entryData.type === 'journal') {
                    return longPressable(<JournalListItem text={item.entryData.text} dateMs={item.entryData.dateMs} />, () => props.considerRemoving(item.entryData))
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

    if (props.editing) {
        entryListToRender.push({ type: 'editing', addNewProps: props.editing })
        flatListRef.current?.scrollToIndex({ index: 0, animated: true })
    }

    const today = roundToDay(nowMs)
    let mostRecentlyAddedDay = today

    if (!props.editing && (localEntries.length === 0 || roundToDay(localEntries[0].dateMs) < today)) {
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
            ref={flatListRef}
            scrollEnabled={!props.editing}
            data={entryListToRender}
            renderItem={renderItem}
        />
    )
}