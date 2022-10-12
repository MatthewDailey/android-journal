import React from 'react'
import { render, screen } from '@testing-library/react-native'
import renderer from 'react-test-renderer'
import { ScrollingList } from './scrolling_list'
import { FlatList } from 'react-native'
import { DateListItem, GratitudeListItem, JournalListItem, NoEntryListItem } from './list_items'
import { JournalEntry } from '../types'

describe('ScrollingList', () => {
    const nowMs = new Date().getTime()
    const yesterdayMs = nowMs - 1000 * 60 * 60 * 24
    const oct10thMs = new Date('2022-10-10T20:12:30.913Z').getTime()

    it('empty entries includes today and no entry', () => {
        const tree = renderer.create(<ScrollingList entries={[]} />)
        expect(tree.root.findByType(NoEntryListItem)).toBeTruthy()
        expect(tree.root.findByType(DateListItem).findByProps({ children: "Today" })).toBeTruthy()
    })
    it('includes gratitude', () => {
        const gratitudeEntry: JournalEntry = { type: "gratitude", text: "amazing wife", dateMs: nowMs }
        const tree = renderer.create(<ScrollingList entries={[gratitudeEntry]} />)
        const listItem = tree.root.findByType(GratitudeListItem)
        expect(listItem.findByProps({ children: "amazing wife" })).toBeTruthy()
    })
    it('includes journal', () => {
        const journalEntry: JournalEntry = { type: "journal", text: "amazing wife", dateMs: nowMs }
        const tree = renderer.create(<ScrollingList entries={[journalEntry]} />)
        const listItem = tree.root.findByType(JournalListItem)
        expect(listItem.findByProps({ children: "amazing wife" })).toBeTruthy()
    })
    it('includes older date when entry exists', () => {
        const journalEntry: JournalEntry = { type: "journal", text: "amazing wife", dateMs: oct10thMs }
        const tree = renderer.create(<ScrollingList entries={[journalEntry]} />)
        expect(tree.root.findByProps({ children: "October 10, 2022" })).toBeTruthy()
    })
    it('does not include no entry if today has an entry', () => {
        const journalEntry: JournalEntry = { type: "journal", text: "amazing wife", dateMs: nowMs }
        const tree = renderer.create(<ScrollingList entries={[journalEntry]} />)
        expect(tree.root.findAllByType(NoEntryListItem).length).toBe(0)
    })
    it('only includes one copy of date', () => {
        const journalEntry: JournalEntry = { type: "journal", text: "amazing wife", dateMs: nowMs }
        const tree = renderer.create(<ScrollingList entries={[journalEntry, journalEntry]} />)
        expect(tree.root.findAllByType(DateListItem).length).toBe(1)
    })
})