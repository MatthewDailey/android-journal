import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import renderer from 'react-test-renderer'
import { MainView } from './main_view'
import { ScrollingList } from './components/scrolling_list'
import { StreakHeader } from './components/streak'
import { PrimaryButton } from './components/button'
import JournalEntryHooks from './journal_entries_hook'
import { ONE_DAY_MS } from './constants'

describe('MainView', () => {
    it('renders key views', () => {
        jest.spyOn(JournalEntryHooks, 'useJournalEntries').mockReturnValue({ entries: [], addEntry: jest.fn(), removeEntry: jest.fn() })
        const tree = renderer.create(<MainView />)
        expect(tree.root.findAllByType(ScrollingList).length).toEqual(1)
        expect(tree.root.findAllByType(StreakHeader).length).toEqual(1)
        expect(tree.root.findAllByType(PrimaryButton).length).toEqual(2)
    })
    it('can start adding gratitude', () => {
        jest.spyOn(JournalEntryHooks, 'useJournalEntries').mockReturnValue({ entries: [], addEntry: jest.fn(), removeEntry: jest.fn() })
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
        jest.spyOn(JournalEntryHooks, 'useJournalEntries').mockReturnValue({ entries: [], addEntry: jest.fn(), removeEntry: jest.fn() })
        render(<MainView />)
        fireEvent.press(screen.getByText('Journal'))

        // Check buttons
        expect(screen.getByText('Save')).toBeTruthy()
        expect(screen.getByText('Cancel')).toBeTruthy()

        // Check input
        expect(screen.findByTestId('edit_input')).toBeTruthy()
    })
    it('can cancel adding', () => {
        jest.spyOn(JournalEntryHooks, 'useJournalEntries').mockReturnValue({ entries: [], addEntry: jest.fn(), removeEntry: jest.fn() })
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
        jest.spyOn(JournalEntryHooks, 'useJournalEntries').mockReturnValue({ entries: [], addEntry, removeEntry: jest.fn() })

        render(<MainView />)
        fireEvent.press(screen.getByText('Journal'))
        fireEvent.changeText(screen.getByTestId('edit_input'), 'test')
        fireEvent.press(screen.getByText('Save'))

        // Check save called
        expect(addEntry).toHaveBeenCalledWith({ type: 'journal', text: 'test', dateMs: testDateMs })

        // Check returned to viewing
        expect(screen.getByText('Journal')).toBeTruthy()
        expect(screen.getByText('Gratitude')).toBeTruthy()
        expect(screen.queryByTestId('edit_input')).toBeFalsy()
    })
    it('calls save after editing gratitude', () => {
        const addEntry = jest.fn()
        const testDateMs = 123
        jest.spyOn(Date, 'now').mockReturnValue(testDateMs)
        jest.spyOn(JournalEntryHooks, 'useJournalEntries').mockReturnValue({ entries: [], addEntry, removeEntry: jest.fn() })

        render(<MainView />)
        fireEvent.press(screen.getByText('Gratitude'))
        fireEvent.changeText(screen.getByTestId('edit_input'), 'test')
        fireEvent.press(screen.getByText('Save'))

        // Check save called
        expect(addEntry).toHaveBeenCalledWith({ type: 'gratitude', text: 'test', dateMs: testDateMs })

        // Check returned to viewing
        expect(screen.getByText('Journal')).toBeTruthy()
        expect(screen.getByText('Gratitude')).toBeTruthy()
        expect(screen.queryByTestId('edit_input')).toBeFalsy()
    })
    it('passes empty streak', () => {
        jest.spyOn(JournalEntryHooks, 'useJournalEntries').mockReturnValue({ entries: [], addEntry: jest.fn(), removeEntry: jest.fn() })
        const main = renderer.create(<MainView />)
        const streak = main.root.findByType(StreakHeader)
        expect(streak.props.count).toEqual(0)
        expect(streak.props.isStreakActive).toEqual(false)
    })
    it('passes single streak', () => {
        jest.spyOn(Date, 'now').mockReturnValue(new Date("2022-11-05T00:00:00.000Z").getTime())

        jest.spyOn(JournalEntryHooks, 'useJournalEntries').mockReturnValue({ 
            entries: [{ type: 'gratitude', text: 'text', dateMs: Date.now() }], 
            addEntry: jest.fn(),
            removeEntry: jest.fn() 
        })

        const main = renderer.create(<MainView />)
        const streak = main.root.findByType(StreakHeader)
        expect(streak.props.count).toEqual(1)
        expect(streak.props.isStreakActive).toEqual(true)
    })
    it('only counts streak per day to 2', () => {
        jest.spyOn(Date, 'now').mockReturnValue(new Date("2022-11-05T00:00:00.000Z").getTime())

        jest.spyOn(JournalEntryHooks, 'useJournalEntries').mockReturnValue({ 
            entries: [{ type: 'gratitude', text: 'text', dateMs: Date.now() },
            { type: 'gratitude', text: 'text', dateMs: Date.now() },
            { type: 'gratitude', text: 'text', dateMs: Date.now() - ONE_DAY_MS }
        ], 
            addEntry: jest.fn(),
            removeEntry: jest.fn() 
        })
        const main = renderer.create(<MainView />)
        const streak = main.root.findByType(StreakHeader)
        expect(streak.props.count).toEqual(2)
        expect(streak.props.isStreakActive).toEqual(true)
    })
    it('only starts streak on today or yesterday', () => {  
        jest.spyOn(JournalEntryHooks, 'useJournalEntries').mockReturnValue({ 
            entries: [{ type: 'gratitude', text: 'text', dateMs: Date.now() - ONE_DAY_MS * 2}
        ], 
            addEntry: jest.fn(),
            removeEntry: jest.fn() 
        })
        const main = renderer.create(<MainView />)
        const streak = main.root.findByType(StreakHeader)
        expect(streak.props.count).toEqual(0)
        expect(streak.props.isStreakActive).toEqual(false)
    })
    it('starts streak yesterday', () => {
        jest.spyOn(JournalEntryHooks, 'useJournalEntries').mockReturnValue({ 
            entries: [{ type: 'gratitude', text: 'text', dateMs: Date.now() - ONE_DAY_MS * 1}
        ], 
            addEntry: jest.fn(),
            removeEntry: jest.fn() 
        })
        const main = renderer.create(<MainView />)
        const streak = main.root.findByType(StreakHeader)
        expect(streak.props.count).toEqual(1)
        expect(streak.props.isStreakActive).toEqual(false)
    })
    it('counts streak over fall daylights savings', () => {
        const dayLightSavings2022 = new Date("2022-11-06T21:43:42.586Z").getTime()
        jest.spyOn(Date, 'now').mockReturnValue(dayLightSavings2022 + ONE_DAY_MS * 2)
        jest.spyOn(JournalEntryHooks, 'useJournalEntries').mockReturnValue({ 
            entries: [
            { type: 'gratitude', text: 'text', dateMs: dayLightSavings2022 + ONE_DAY_MS * 2},
            { type: 'gratitude', text: 'text', dateMs: dayLightSavings2022 + ONE_DAY_MS * 1},
            { type: 'gratitude', text: 'text', dateMs: dayLightSavings2022},
            { type: 'gratitude', text: 'text', dateMs: dayLightSavings2022 - ONE_DAY_MS * 1},
            { type: 'gratitude', text: 'text', dateMs: dayLightSavings2022 - ONE_DAY_MS * 2},
        ], 
            addEntry: jest.fn(),
            removeEntry: jest.fn() 
        })
        const main = renderer.create(<MainView />)
        const streak = main.root.findByType(StreakHeader)
        expect(streak.props.count).toEqual(5)
    })
    it('counts streak over spring daylights savings', () => {
        const dayLightSavings2022 = new Date("2022-03-13T21:43:42.586Z").getTime()
        jest.spyOn(Date, 'now').mockReturnValue(dayLightSavings2022 + ONE_DAY_MS * 2)
        jest.spyOn(JournalEntryHooks, 'useJournalEntries').mockReturnValue({ 
            entries: [
            { type: 'gratitude', text: 'text', dateMs: dayLightSavings2022 + ONE_DAY_MS * 2},
            { type: 'gratitude', text: 'text', dateMs: dayLightSavings2022 + ONE_DAY_MS * 1},
            { type: 'gratitude', text: 'text', dateMs: dayLightSavings2022},
            { type: 'gratitude', text: 'text', dateMs: dayLightSavings2022 - ONE_DAY_MS * 1},
            { type: 'gratitude', text: 'text', dateMs: dayLightSavings2022 - ONE_DAY_MS * 2},
        ], 
            addEntry: jest.fn(),
            removeEntry: jest.fn() 
        })
        const main = renderer.create(<MainView />)
        const streak = main.root.findByType(StreakHeader)
        expect(streak.props.count).toEqual(5)
    })
})