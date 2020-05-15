import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react'

import TodoItem from './TodoItem'
import TodoAction from './TodoAction'
import classes from './TodoList.module.css'

import { fetchTodos } from './todoMockRequest'

const TodoList = () => {
    const [todoList, setTodoList] = useState([])
    const [fetching, setFetching] = useState(false)
    const [error, setError] = useState(false)
    const [newTodoName, setNewTodoName] = useState('')
    const listLength = useRef(todoList.length)

    // fetch todo list
    useEffect(() => {
        setFetching(true)

        fetchTodos()
            .then((data) => {
                setTodoList(data)
                listLength.current = data.length
            })
            .catch((e) => setError(e))
            .finally(() => setFetching(false))
    }, [])

    useEffect(() => {
        listLength.current += 1
    }, [todoList])

    const onAddNewTodo = useCallback(
        (event) => {
            event.preventDefault()

            const newTodos = todoList.slice()

            newTodos.push({
                id: listLength.current,
                name: newTodoName,
                complete: false,
            })

            setTodoList(newTodos)
            setNewTodoName(newTodoName)
        },
        [newTodoName, todoList]
    )

    const onCompleteItemClick = useCallback(
        (id) => {
            const todoItems = todoList.slice()
            for (let i = 0; i < todoList.length; i++) {
                if (todoItems[i].id === id) {
                    const newComplete = !todoItems[i].complete
                    todoItems[i].complete = newComplete
                }
            }
            setTodoList(todoItems)
        },
        [todoList]
    )

    const onInputChange = (event) => {
        setNewTodoName(event.target.value)
    }

    const onRemoveItemClick = useCallback(
        (id) => {
            const filteredTodos = todoList.filter((item) => item.id !== id)

            setTodoList(filteredTodos)
        },
        [todoList]
    )

    // So we dont have to rerender the list when input changed.
    const renderTodoItems = useMemo(() => {
        return todoList.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onClick={onCompleteItemClick} onRemoveClick={onRemoveItemClick} />
        ))
    }, [todoList])

    return (
        <div className={classes.root}>
            {fetching && <div data-testid="todo-fetching">Fetching</div>}
            {error && <div data-testid="todo-error">Failed to load Todos</div>}
            <>
                <ul className={classes.listItemGroup} role="list-item-group">
                    {renderTodoItems}
                </ul>
                <TodoAction
                    onSubmit={onAddNewTodo}
                    newTodoName={newTodoName}
                    onInputChange={onInputChange}
                    disabled={fetching || error}
                />
            </>
        </div>
    )
}

export default TodoList
