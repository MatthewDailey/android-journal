import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { JournalEntry } from "../types";

export const ScrollingList = (props: { entries: JournalEntry[] }) => {
    const renderItem = () => {
        return <View>
            <Text>Item</Text>
        </View>
    }

    return (
        <FlatList 
            data={props.entries}
            renderItem={renderItem}
        />
    )
}