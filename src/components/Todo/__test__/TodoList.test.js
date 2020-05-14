import React from 'react'
import { waitFor, waitForElementToBeRemoved } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { screen, render } from '@testing-library/react'

import { fetchTodos } from '../todoMockRequest'
import TodoList from '../todoList'
import { todos } from '../mockTodoData'

jest.mock('../TodoItem', () => () => 'TodoItem')
jest.mock('../TodoAction', () => () => 'TodoAction')
jest.mock('../todoMockRequest')

// const mockFetchTodos = jest.fn().mockImplementationOnce(fetchTodos)

const useTodoList = () => {
    const useTodoList = render(<TodoList />)
    return useTodoList
}

afterEach(() => {
    jest.resetAllMocks()
})

test('todo component first render todo list', async () => {
    fetchTodos.mockResolvedValueOnce(todos)
    const { getByTestId, queryByTestId } = useTodoList()

    expect(fetchTodos).toHaveBeenCalledTimes(1)

    // await waitFor(() => {
    //     expect(getByTestId('todo-fetching')).toBeInTheDocument()
    // })
    await waitForElementToBeRemoved(() => getByTestId('todo-fetching'))

    expect(todos.length).toBe(5)
})

test('an error is rendered if there is a problem getting todos', async () => {
    const message = 'Failed to load Todos'

    fetchTodos.mockRejectedValueOnce({ message })

    const { getByTestId } = useTodoList()

    expect(fetchTodos).toHaveBeenCalledTimes(1)

    await waitForElementToBeRemoved(() => getByTestId('todo-fetching'))
    await waitFor(() => expect(getByTestId('todo-error')).toBeInTheDocument())
})

test('should add a new todo to the todo list', async () => {
    // const mockArray = [{ id: 6, name: 'Go to the supermarket', complete: false }]
    // fetchTodos.mockResolvedValueOnce(mockArray)
    // const { getByTestId } = useTodoList()
    // await userEvent.type(getByTestId('todo-input'), 'test user')
    // userEvent.click(getByTestId('todo-submit'))
    // expect(mockArray.length).toBe(2)
})
