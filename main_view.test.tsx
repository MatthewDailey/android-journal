import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import renderer from 'react-test-renderer'
import { MainView } from './main_view'
import { ScrollingList } from './components/scrolling_list'
import { StreakHeader } from './components/streak'
import { PrimaryButton } from './components/button'
import JournalEntryHooks from './journal_entries_hook'

describe('MainView', () => {
    it('renders key views', () => {
        const tree = renderer.create(<MainView />)
        expect(tree.root.findAllByType(ScrollingList).length).toEqual(1)
        expect(tree.root.findAllByType(StreakHeader).length).toEqual(1)
        expect(tree.root.findAllByType(PrimaryButton).length).toEqual(2)
    })
    it('can start adding gratitude', () => {
        render(<MainView />)
        fireEvent.press(screen.getByText('Gratitude'))
        
        // Check buttons
        expect(screen.getByText('Save')).toBeTruthy()
        expect(screen.getByText('Cancel')).toBeTruthy()

        // Check input
        expect(screen.getByText("I'm grateful for...")).toBeTruthy()
        expect(screen.findByTestId('edit_input')).toBeTruthy()
    })
    it('can start adding journal', () => {
        render(<MainView />)
        fireEvent.press(screen.getByText('Journal'))
        
        // Check buttons
        expect(screen.getByText('Save')).toBeTruthy()
        expect(screen.getByText('Cancel')).toBeTruthy()

        // Check input
        expect(screen.findByTestId('edit_input')).toBeTruthy()
    })
    it('can cancel adding', () => {
        render(<MainView />)
        fireEvent.press(screen.getByText('Journal'))
        fireEvent.press(screen.getByText('Cancel'))
        
        // Check buttons
        expect(screen.getByText('Journal')).toBeTruthy()
        expect(screen.getByText('Gratitude')).toBeTruthy()

        // Check input
        expect(screen.queryByTestId('edit_input')).toBeFalsy()
    })
    it('calls save after editing journal', () => {
        const addEntry = jest.fn()
        const testDateMs = 123
        jest.spyOn(Date, 'now').mockReturnValue(testDateMs)
        jest.spyOn(JournalEntryHooks, 'useJournalEntries').mockReturnValue({entries: [], addEntry, removeEntry: jest.fn()})

        render(<MainView />)
        fireEvent.press(screen.getByText('Journal'))
        fireEvent.changeText(screen.getByTestId('edit_input'), 'test')
        fireEvent.press(screen.getByText('Save'))

        // Check save called
        expect(addEntry).toHaveBeenCalledWith({type: 'journal', text: 'test', dateMs: testDateMs})

        // Check returned to viewing
        expect(screen.getByText('Journal')).toBeTruthy()
        expect(screen.getByText('Gratitude')).toBeTruthy()
        expect(screen.queryByTestId('edit_input')).toBeFalsy()
    })
    it('calls save after editing gratitude', () => {
        const addEntry = jest.fn()
        const testDateMs = 123
        jest.spyOn(Date, 'now').mockReturnValue(testDateMs)
        jest.spyOn(JournalEntryHooks, 'useJournalEntries').mockReturnValue({entries: [], addEntry, removeEntry: jest.fn()})

        render(<MainView />)
        fireEvent.press(screen.getByText('Gratitude'))
        fireEvent.changeText(screen.getByTestId('edit_input'), 'test')
        fireEvent.press(screen.getByText('Save'))

        // Check save called
        expect(addEntry).toHaveBeenCalledWith({type: 'gratitude', text: 'test', dateMs: testDateMs})

        // Check returned to viewing
        expect(screen.getByText('Journal')).toBeTruthy()
        expect(screen.getByText('Gratitude')).toBeTruthy()
        expect(screen.queryByTestId('edit_input')).toBeFalsy()
    })
})