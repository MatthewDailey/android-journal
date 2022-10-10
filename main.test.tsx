import React from "react"
import renderer from 'react-test-renderer'
import { MainView } from "./main"

describe('App', () => {
  it('renders correctly', () => {
    const tree: any = renderer.create(<MainView />).toJSON()
    console.log(tree)
    expect(tree.children.length).toBe(1)
  })
})
