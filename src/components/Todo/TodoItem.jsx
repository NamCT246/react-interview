import React from 'react'
import { func, shape, string, number, boolean } from 'prop-types'

const TodoItem = ({ todo, onClick, onRemoveClick }) => {
    let color
    let text

    if (todo.complete === true) {
        color = 'lightgreen'
        text = 'Complete'
    } else {
        color = 'pink'
        text = 'Incomplete'
    }

    return (
        <div className="wrapper" style={{ backgroundColor: color }}>
            <h3>{todo.name}</h3>
            <button className="btn" onClick={() => onClick(todo.id)}>
                {text}
            </button>
            <button className="btn" onClick={() => onRemoveClick(todo.id)}>
                Remove from list
            </button>
        </div>
    )
}

TodoItem.propTypes = {
    todo: shape({
        id: number,
        name: string,
        completed: boolean,
    }),
    onClick: func.isRequired,
    onRemoveClick: func.isRequired,
}

export default TodoItem
