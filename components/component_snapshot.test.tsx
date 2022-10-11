import React from "react"
import renderer from 'react-test-renderer'
import { ButtonContainer, PrimaryButton } from "./button"
import { DateListItem, EditingListItem, GratitudeListItem, JournalListItem, NoEntryListItem } from "./list_items"
import { HeavyText, LightText, NormalText, NormalTextInput } from "./text"

describe('Component Snapshot Tests', () => {
    it('PrimaryButton', () => {    
        const tree: any = renderer.create(<PrimaryButton onPress={() => { } } text="Journal" />).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it('ButtonContainer', () => {    
        const tree: any = renderer.create(
            <ButtonContainer>
                <PrimaryButton onPress={() => { } } text="Journal" />
                <PrimaryButton onPress={() => { } } text="Gratitude" />
            </ButtonContainer>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it('HeavyText', () => {
        const tree: any = renderer.create(<HeavyText>October 5, 2022</HeavyText>).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it('LightText', () => {
        const tree: any = renderer.create(<LightText>5:04pm</LightText>).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it('NormalText', () => {
        const tree: any = renderer.create(<NormalText>Exerted enterence focus hear him</NormalText>).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it('NormalTextInput', () => {
        const tree = renderer.create(<NormalTextInput />).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it('EditingListItem', () => {
        const tree = renderer.create(<EditingListItem header="I'm grateful for..." onChangeText={function (text: string): void {} } />).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it('GratitudeListItem', () => {
        const tree = renderer.create(<GratitudeListItem text="This is a long string that will wrap to many lines that needs to be truncated so that this element does not take up too much space." dateMs={1665553993440} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it('JournalListItem', () => {
        const tree = renderer.create(<JournalListItem text="This is a long string that will wrap to many lines that needs to be truncated so that this element does not take up too much space." dateMs={1665553993440} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it('DateListItem', () => {
        const tree = renderer.create(<DateListItem dateMs={new Date('2022-10-10T20:12:30.913Z').getTime()}/>).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it('NoEntryListItem', () => {
        const tree = renderer.create(<NoEntryListItem />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})