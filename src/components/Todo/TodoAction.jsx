import React from 'react'
import { func, string, boolean } from 'prop-types'

import classes from './TodoAction.module.css'

const TodoAction = ({ onSubmit, newTodoName, onInputChange, disabled }) => {
    return (
        <div
            className="todo-input"
            style={{ 'grid-template-columns': '7fr 2fr' }}
            onSubmit={onSubmit}
            data-testid="todo-form"
        >
            <input
                placeholder="Add new todo"
                value={newTodoName}
                onChange={onInputChange}
                data-testid="todo-input"
                label="todo-input"
            />
            <button
                className="btn btn-success"
                type="submit"
                value="Submit"
                data-testid="todo-submit"
                disabled={disabled}
            >
                Submit
            </button>
        </div>
    )
}

TodoAction.propTypes = {
    onSubmit: func.isRequired,
    newTodoName: string,
    onInputChange: func.isRequired,
    disabled: boolean,
}

export default TodoAction
