import renderer from 'react-test-renderer'

import { App } from './App'

describe('App', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<App />).toTree()
    expect(tree?.children?.length).toBe(2)
  })
})
