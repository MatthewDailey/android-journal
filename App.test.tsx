import React from "react"
import renderer from 'react-test-renderer'

import { AppComponent } from './App'
import { BasicDiv } from "./basic_div"

describe('App', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<BasicDiv />).toTree()
    expect(tree?.children?.length).toBe(2)
  })
})
