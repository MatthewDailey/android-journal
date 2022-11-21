import React, { MutableRefObject } from 'react'
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { JournalEntry } from "../types";
import { DateListItem, EditingListItem, GratitudeListItem, JournalListItem, NoEntryListItem } from './list_items';

type AddNewProps = {
    type: 'journal' | 'gratitude';
    onTextChange: (text: string) => void;
}
export type EditingProps =  AddNewProps | {
    type: 'removing';
    entry: JournalEntry;
}

export type ListItemType = {
    type: 'date',
    dateMs: number
} | {
    type: 'noEntry',
} | {
    type: 'entry',
    entryData: JournalEntry,
} | {
    type: 'addingNew',
    addNewProps: AddNewProps,
}

export const roundToDay = (dateMs: number) => {
    const date = new Date(dateMs)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() 
}

export const ScrollingList = (props: { entries: JournalEntry[], editing?: EditingProps, considerRemoving: (entry: JournalEntry) => void }) => {
    const flatListRef = React.useRef<FlatList<ListItemType>>(null)

    const renderItem = ({item} : {item: ListItemType}) => {
        switch(item.type) {
            case 'date':
                return <DateListItem dateMs={item.dateMs} />
            case 'noEntry':
                return <NoEntryListItem />
            case 'addingNew':
                return <EditingListItem header={item.addNewProps.type === 'gratitude' ? "I'm grateful for..." : undefined} onChangeText={item.addNewProps.onTextChange} />
            case 'entry':
                if (item.entryData.type === 'gratitude') {
                    const isFocussed = props.editing?.type === "removing" && props.editing.entry === item.entryData;
                    return (
                        <GratitudeListItem text={item.entryData.text} dateMs={item.entryData.dateMs} onLongPress={() => props.considerRemoving(item.entryData)} isFocussed={isFocussed}/>
                    )
                } else if (item.entryData.type === 'journal') {
                    const isFocussed = props.editing?.type === "removing" && props.editing.entry === item.entryData;
                    return (
                        <JournalListItem text={item.entryData.text} dateMs={item.entryData.dateMs} onLongPress={() => props.considerRemoving(item.entryData)} isFocussed={isFocussed} />
                    )
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

    if (props.editing && (props.editing.type === 'journal' || props.editing.type === 'gratitude')) {
        entryListToRender.push({ type: 'addingNew', addNewProps: props.editing })
        flatListRef.current?.scrollToIndex({ index: 0, animated: true })
    }

    const today = roundToDay(nowMs)
    let mostRecentlyAddedDay = today

    if (!props.editing && (localEntries.length === 0 || roundToDay(localEntries[0].dateMs) < today)) {
        entryListToRender.push({ type: 'noEntry' })
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