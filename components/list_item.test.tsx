import React from "react"
import renderer from 'react-test-renderer'
import { GratitudeListItem } from "./list_items"
import { LightText, NormalText } from "./text"

describe('List Items', () => {
    describe('GratitudeListItem', () => {
        it('presents date - PM', () => {
            const tree: any = renderer.create(<GratitudeListItem text="amazing wife" dateMs={1665553993440} />)
            const header = tree.root.findByType(LightText)
            expect(header).toBeDefined()
            expect(header.props.children).toContain('10:53pm')
            const text = tree.root.findByType(NormalText)
            expect(text).toBeDefined()
            expect(text.props.children).toEqual("amazing wife")
        })
        it('presents date - AM', () => {
            const tree: any = renderer.create(<GratitudeListItem text="amazing wife" dateMs={1665503993440} />)
            const header = tree.root.findByType(LightText)
            expect(header).toBeDefined()
            expect(header.props.children).toContain('8:59am')
            const text = tree.root.findByType(NormalText)
            expect(text).toBeDefined()
            expect(text.props.children).toEqual("amazing wife")
        })
    })
})