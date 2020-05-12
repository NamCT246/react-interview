import React, {useState, useRef, useEffect} from 'react';
import './App.css';

const todos = [
    {id: 1, name: 'Go to the supermarket', complete: false},
    {id: 2, name: 'Call Alice', complete: false},
    {id: 3, name: 'Ask Alice to call Bob', complete: false},
    {id: 4, name: 'Do the dishes', complete: false},
    {id: 5, name: 'Change car tyres', complete: false}
];

const TodoItem = ({todo, onClick, onRemoveClick}) => {
    var color;
    var text;

    if (todo.complete === true) {
        color = 'lightgreen';
        text = 'Complete';
    } else {
        color = 'pink';
        text = 'Incomplete';
    }

    return (
        <div className="wrapper" style={{backgroundColor: color}}>
            <h3>{todo.name}</h3>
            <button
                className="btn"
                onClick={() => onClick(todo.id)}>
                {text}
            </button>
            <button
                className="btn"
                onClick={() =>
                    onRemoveClick(todo.id)
                }>
                Remove from list
            </button>
        </div>
    );
}

const TodoActionContainer = ({onSubmit, newTodoName, onInputChange}) => {
    return (
        <form
            className="wrapper"
            style={{'grid-template-columns': '7fr 2fr'}}
            onSubmit={onSubmit}>
            <input
                placeholder="Add new todo"
                value={newTodoName}
                onChange={onInputChange}
            />
            <button
                className="btn btn-success"
                type="submit"
                value="Submit">
                Submit
            </button>
        </form>
    );
}

const App = () => {
    const [todoList, setTodoList] = useState(todos)
    const [newTodoName, setNewTodoName] = useState('')
    const listLength = useRef(todos.length)


    useEffect (() => {
        listLength.current += 1
    }, [todoList])

    const generateNewId = () => {
        return listLength.current
    }

    const onAddNewTodo = (event) => {
        event.preventDefault();

        var newTodos = todoList.slice();

        newTodos.push({
            id: generateNewId(),
            name: newTodoName,
            complete: false
        });

        setTodoList(newTodos)
        setNewTodoName(newTodoName)
    }

    const onCompleteItemClick = (id) => {
        var todoItems = todoList.slice();
        for (let i = 0; i < todoList.length; i++) {
            if (todoItems[i].id === id) {
                var newComplete = !todoItems[i].complete;
                todoItems[i].complete = newComplete;
            }
        }
       setTodoList(todoItems)
    }

    const onInputChange = (event) => {
        setNewTodoName(event.target.value)
    }

    const onRemoveItemClick =(id) => {
        var todoItems = todoList.slice();

        for (let i = 0; i < todoList.length; i++) {
            if (todoItems[i] && todoItems[i].id === id) {
                todoItems.splice(i, 1)
                break // as the current implementation only remove 1 by 1
            }
        }

        setTodoList(todoItems)
    }

    const renderTodoItems = () => {
       return todoList.map(todo=> (
            <TodoItem
            key={todo.id}
            todo={todo}
            onClick={onCompleteItemClick}
            onRemoveClick={onRemoveItemClick}
            />
        ))
    };

    return (
        <div className="asd">
            {renderTodoItems()}
            <TodoActionContainer
                onSubmit={onAddNewTodo}
                newTodoName={newTodoName}
                onInputChange={onInputChange}
            />
        </div>
    );
}



export default App;
