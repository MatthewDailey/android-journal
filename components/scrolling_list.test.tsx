import React from 'react'
import { render, screen } from '@testing-library/react-native'
import renderer from 'react-test-renderer'
import { ScrollingList } from './scrolling_list'
import { FlatList } from 'react-native'

describe('ScrollingList', () => {
    it('renders', () => {
        const tree = renderer.create(<ScrollingList entries={[]} />)
        expect(tree.root.findByType(FlatList)).toBeTruthy()
    })
})