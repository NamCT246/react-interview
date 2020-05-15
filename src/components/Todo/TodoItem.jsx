import React from 'react'
import { func, shape, string, number, bool } from 'prop-types'

const TodoItem = ({ todo, onClick, onRemoveClick }) => {
    let text

    if (todo.complete === true) {
        text = 'Complete'
    } else {
        text = 'Incomplete'
    }

    return (
        <li className="list-wrapper" role="list-item" data-testid="list-item">
            <input
                className="list-incompleted"
                onClick={() => onClick(todo.id)}
                type="checkbox"
                data-testid={`todo-complete-${todo.id}`}
                defaultChecked={todo.complete}
            />
            <p onClick={() => onClick(todo.id)}>{todo.name}</p>
            <span className="btn" onClick={() => onRemoveClick(todo.id)} data-testid={`todo-delete-${todo.id}`}>
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
