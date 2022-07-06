import {render, screen} from '@testing-library/react'
import Main from './Main'

describe('Component Main', () => {
    test('renders Todos as a text', () => {
        render(<Main/>)

        const todosText = screen.getByText('Todos', {exact: false})
        expect(todosText).toBeInTheDocument()
    })
})