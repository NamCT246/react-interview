import React from 'react'
import { func, string, bool } from 'prop-types'

import classes from './TodoAction.module.css'

const TodoAction = ({ onSubmit, newTodoName, onInputChange, disabled }) => {
    return (
        <form className={classes.root} data-testid="todo-form">
            <input
                className={classes.input}
                placeholder="Add new todo"
                value={newTodoName}
                onChange={onInputChange}
                role="input"
                data-testid="todo-input"
                label="todo-input"
            />
            <button
                className="btn btn-success"
                type="submit"
                value="Submit"
                role="button"
                data-testid="todo-submit"
                disabled={disabled}
                onClick={onSubmit}
            >
                Add
            </button>
        </form>
    )
}

TodoAction.propTypes = {
    onSubmit: func.isRequired,
    newTodoName: string,
    onInputChange: func.isRequired,
    disabled: bool.isRequired,
}

export default TodoAction
