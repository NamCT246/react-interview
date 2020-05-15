import React from 'react'
import { func, shape, string, number, bool } from 'prop-types'

import classes from './TodoItem.module.css'

const TodoItem = ({ todo, onClick, onRemoveClick }) => {
    const todoCompletedClass = todo.complete ? classes.complete : classes.incomplete

    return (
        <li className={`${classes.root} ${todoCompletedClass}`} id="todo-input-checkbox" role="list-item">
            <input
                className={classes.input}
                onChange={() => onClick(todo.id)}
                type="checkbox"
                data-testid={`todo-complete-${todo.id}`}
                checked={todo.complete}
            />
            <label class={classes.label} for="todo-input-checkbox">
                <span></span>
            </label>
            <p className={classes.name} onClick={() => onClick(todo.id)}>
                {todo.name}
            </p>
            <span
                className={classes.delete}
                onClick={() => onRemoveClick(todo.id)}
                data-testid={`todo-delete-${todo.id}`}
            >
                x
            </span>
        </li>
    )
}

TodoItem.propTypes = {
    todo: shape({
        id: number,
        name: string,
        completed: bool,
    }),
    onClick: func.isRequired,
    onRemoveClick: func.isRequired,
}

export default TodoItem
