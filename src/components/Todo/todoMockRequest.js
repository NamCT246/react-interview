import { todos } from './mockTodoData'

export const fetchTodos = () => new Promise((resolve, reject) => resolve(todos))
