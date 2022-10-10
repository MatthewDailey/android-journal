import React from "react"
import renderer from 'react-test-renderer'
import { MainView } from "./main"

describe('MainView', () => {
  it('renders correctly', () => {
    const tree: any = renderer.create(<MainView />).toJSON()
    expect(tree.children.length).toBe(2)
  })
})
