import React from 'react'
import { render, screen } from '@testing-library/react-native'
import renderer from 'react-test-renderer'
import { ScrollingList } from './scrolling_list'
import { FlatList } from 'react-native'
import { DateListItem, NoEntryListItem } from './list_items'

describe('ScrollingList', () => {
    it('empty entries includes today and no entry', () => {
        const tree = renderer.create(<ScrollingList entries={[]} />)
        expect(tree.root.findByType(NoEntryListItem)).toBeTruthy()
        expect(tree.root.findByType(DateListItem).findByProps({ children: "Today" })).toBeTruthy()
    })
})