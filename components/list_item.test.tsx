import React from "react"
import renderer, { ReactTestInstance } from 'react-test-renderer'
import {render, screen, fireEvent} from '@testing-library/react-native'
import { DateListItem, GratitudeListItem, JournalListItem } from "./list_items"
import { HeavyText, LightText, NormalText } from "./text"
import { Text } from "react-native"

describe('List Items', () => {
    const longText = "This is a long string that will wrap to many lines that needs to be truncated so that this element does not take up too much space. This is a long string that will wrap to many lines that needs to be truncated so that this element does not take up too much space."
    describe('GratitudeListItem', () => {
        it('presents date - PM', () => {
            const tree: any = renderer.create(<GratitudeListItem text="amazing wife" dateMs={1665553993440} />)
            const header = tree.root.findByType(LightText)
            expect(header.props.children).toContain('10:53pm')
        })
        it('presents date - AM', () => {
            const tree: any = renderer.create(<GratitudeListItem text="amazing wife" dateMs={1665503993440} />)
            const header = tree.root.findByType(LightText)
            expect(header.props.children).toContain('8:59am')
        })
        it('includes text', () => {
            const tree: any = renderer.create(<GratitudeListItem text="amazing wife" dateMs={1665553993440} />)
            const text = tree.root.findByType(NormalText)
            expect(text.props.children).toEqual("amazing wife")
        })
        it('truncates text', () => {
            render(<GratitudeListItem text={longText} dateMs={1665553993440} />)
            expect(screen.getByText(longText).props.numberOfLines).toEqual(2)
        })
        it('expands text on tap', () => {
            const renderResult = render(<GratitudeListItem text={longText} dateMs={1665553993440} />)
            expect(screen.getByText(longText).props.numberOfLines).toEqual(2)
            fireEvent.press(screen.getByText(longText))
            expect(screen.getByText(longText).props.numberOfLines).toEqual(undefined)
        })
    })

    describe('JournalListItem', () => {
        it('presents date - PM', () => {
            const tree: any = renderer.create(<JournalListItem text="amazing wife" dateMs={1665553993440} />)
            const header = tree.root.findByType(LightText) 
            expect(header.props.children).toEqual('10:53pm')
        })
        it('presents date - AM', () => {
            const tree: any = renderer.create(<JournalListItem text="amazing wife" dateMs={1665503993440} />)
            const header = tree.root.findByType(LightText)
            expect(header.props.children).toContain('8:59am')
        })
        it('includes text', () => {
            const tree: any = renderer.create(<JournalListItem text="amazing wife" dateMs={1665553993440} />)
            const text = tree.root.findByType(NormalText)
            expect(text.props.children).toEqual("amazing wife")
        })
        it('truncates text', () => {
            render(<JournalListItem text={longText} dateMs={1665553993440} />)
            expect(screen.getByText(longText).props.numberOfLines).toEqual(2)
        })
        it('expands text on tap', () => {
            const renderResult = render(<JournalListItem text={longText} dateMs={1665553993440} />)
            expect(screen.getByText(longText).props.numberOfLines).toEqual(2)
            fireEvent.press(screen.getByText(longText))
            expect(screen.getByText(longText).props.numberOfLines).toEqual(undefined)
        })
    })

    describe('DateListItem', () => {
        const dateNotToday = new Date('2022-10-10T20:12:30.913Z')
        const dateToday = new Date()

        it('shows the date', () => {
            const tree: any = renderer.create(<DateListItem dateMs={dateNotToday.getTime()} />)
            const header = tree.root.findByType(Text)
            expect(header.props.children).toContain('October 10, 2022')
        })
        it('shows "Today" for today', () => {
            const tree: any = renderer.create(<DateListItem dateMs={dateToday.getTime()} />)
            const header = tree.root.findByType(Text)
            expect(header.props.children).toContain('Today')
        })
    })
})