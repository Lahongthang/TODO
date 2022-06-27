import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import TodoListItem from './TodoListItem'
import { selectTodoIds } from './todosSlice'

const TodoList = () => {
    const todoIds = useSelector(selectTodoIds, shallowEqual)
    const status = useSelector(state => state.todos.status)

    const message = useSelector(state => state.todos.message)

    const renderedListItem = todoIds.map(todoId => {
        return <TodoListItem key={todoId} id={todoId}/>
    })

    return (
        <div>
            {status === 'loading' ? (
                <div className='todo-list'>
                    <div className='loader'></div>
                </div>
            ) : message === 'succeed' ? (
                <ul className='todo-list'>{renderedListItem}</ul>
            ) : (
                <center className='todo-list message'>{message}</center>
            )}
        </div>
    )
}

export default TodoList
