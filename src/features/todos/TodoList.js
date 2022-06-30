import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TodoListItem from './TodoListItem'
import { selectTodoIds, selectEntities, fetchTodos } from './todosSlice'

const TodoList = () => {
    const dispatch = useDispatch()
    const todoIds = useSelector(selectTodoIds)
    const todosStatus = useSelector(state => state.todos.status)
    const {filterStatus, fetchStatus, colors} = useSelector(state => state.filters)

    const renderedListItem = todoIds.map(todoId => {
        return <TodoListItem key={todoId} id={todoId}/>
    })

    useEffect(() => {
        if (todoIds.length === 0) {
            dispatch(fetchTodos({filterStatus, colors}))
        }
    }, [todoIds.length])

    return (
        <div>
            {todosStatus === 'loading' || fetchStatus === 'loading' ? (
                <div className='todo-list'>
                    <div className='loader'></div>
                </div>
            ) : (
                <ul className='todo-list'>
                    {renderedListItem}
                </ul>
            )}
        </div>
    )
}

export default TodoList
