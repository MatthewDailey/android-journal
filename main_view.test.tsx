import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import renderer from 'react-test-renderer'
import { MainView } from './main_view'
import { ScrollingList } from './components/scrolling_list'
import { StreakHeader } from './components/streak'
import { PrimaryButton } from './components/button'

describe('MainView', () => {
    it('renders key views', () => {
        const tree = renderer.create(<MainView />)
        expect(tree.root.findAllByType(ScrollingList).length).toEqual(1)
        expect(tree.root.findAllByType(StreakHeader).length).toEqual(1)
        expect(tree.root.findAllByType(PrimaryButton).length).toEqual(2)
    })
})