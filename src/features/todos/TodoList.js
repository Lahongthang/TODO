import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import TodoListItem from './TodoListItem'
import { selectTodos, selectTodoIds } from './todosSlice'

const TodoList = () => {
    const todoIds = useSelector(selectTodoIds, shallowEqual)

    const renderedListItem = todoIds.map(todoId => {
        return <TodoListItem key={todoId} id={todoId}/>
    })

    return (
        <ul className="todo-list">{renderedListItem}</ul>
    )
}

export default TodoList
