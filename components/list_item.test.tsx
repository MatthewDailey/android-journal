import React from "react"
import renderer, { ReactTestInstance } from 'react-test-renderer'
import {render, screen, fireEvent} from '@testing-library/react-native'
import { GratitudeListItem } from "./list_items"
import { LightText, NormalText } from "./text"

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
            fireEvent.press(renderResult.container.children[0] as ReactTestInstance)
            expect(screen.getByText(longText).props.numberOfLines).toEqual(undefined)
        })
    })
})