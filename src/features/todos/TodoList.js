import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import TodoListItem from './TodoListItem'
import { selectTodoIds } from './todosSlice'

const TodoList = () => {
    const todoIds = useSelector(selectTodoIds, shallowEqual)
    const status = useSelector(state => state.todos.status)

    const renderedListItem = todoIds.map(todoId => {
        return <TodoListItem key={todoId} id={todoId}/>
    })

    return (
        <div>
            {status === 'idle' ? (
                <ul className="todo-list">{renderedListItem}</ul>
            ) : (
                <div className='todo-list'>
                    <div className='loader'></div>
                </div>
            )}
        </div>
    )
}

export default TodoList
