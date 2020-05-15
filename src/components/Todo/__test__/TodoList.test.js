import React from 'react'
import { waitFor, waitForElementToBeRemoved, getByText, getAllByLabelText, getByRole } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { render, within } from '@testing-library/react'

import { fetchTodos } from '../todoMockRequest'
import TodoList from '../todoList'
import { todos } from '../mockTodoData'

jest.mock('../todoMockRequest')

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
    const mockArray = [{ id: 6, name: 'Go to the supermarket', complete: false }]
    const mockInput = 'test user'
    fetchTodos.mockResolvedValueOnce(mockArray)
    const { getByTestId, getByRole } = useTodoList()

    expect(fetchTodos).toHaveBeenCalledTimes(1)
    await waitForElementToBeRemoved(() => getByTestId('todo-fetching'))
    await userEvent.type(getByTestId('todo-input'), mockInput)
    userEvent.click(getByTestId('todo-submit'))

    const ul = getByRole('list-item-group')
    const todoItems = within(ul).getAllByRole('list-item')

    expect(todoItems.length).toBe(2)
    expect(todoItems[1].querySelector('p').textContent).toEqual(mockInput)
})

test('should remove a todo from the list', async () => {
    const mockArray = [
        {
            id: 1,
            name: 'Go to the supermarket',
            complete: false,
        },
        { id: 2, name: 'Call Alice', complete: false },
    ]
    fetchTodos.mockResolvedValueOnce(mockArray)
    const { getByTestId, getAllByRole, getByRole } = useTodoList()

    expect(fetchTodos).toHaveBeenCalledTimes(1)
    await waitForElementToBeRemoved(() => getByTestId('todo-fetching'))

    userEvent.click(getByTestId('todo-delete-1'))

    const ul = getByRole('list-item-group')
    const todoItems = within(ul).getAllByRole('list-item')

    expect(todoItems.length).toBe(1)
    expect(todoItems[0].querySelector('p').textContent).not.toEqual('Go to the supermarket')
})

test('should complete a todo in the todo list', async () => {
    const mockArray = [{ id: 1, name: 'Go to the supermarket', complete: false }]

    fetchTodos.mockResolvedValueOnce(mockArray)
    const { getByTestId, getAllByRole, getByRole } = useTodoList()

    expect(fetchTodos).toHaveBeenCalledTimes(1)
    await waitForElementToBeRemoved(() => getByTestId('todo-fetching'))

    userEvent.click(getByTestId('todo-complete-1'))

    const ul = getByRole('list-item-group')
    const todoItems = within(ul).getAllByRole('list-item')

    expect(todoItems[0].querySelector("input[type='checkbox']").checked).toBe(true)
})
