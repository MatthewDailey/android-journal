import React from "react"
import renderer from 'react-test-renderer'
import { ButtonContainer, PrimaryButton } from "./button"
import { HeavyText, LightText, NormalText } from "./text"

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
})