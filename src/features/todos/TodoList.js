import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TodoListItem from './TodoListItem'
import { selectTodoIds, selectEntities, fetchTodos } from './todosSlice'

const TodoList = () => {
    const dispatch = useDispatch()
    const todoIds = useSelector(selectTodoIds)
    const status = useSelector(state => state.todos.status)
    const {status: stateStatus, colors} = useSelector(state => state.filters)

    const renderedListItem = todoIds.map(todoId => {
        return <TodoListItem key={todoId} id={todoId}/>
    })

    useEffect(() => {
        if (todoIds.length === 0) {
            dispatch(fetchTodos({status: stateStatus, colors}))
        }
    }, [todoIds.length])

    return (
        <div>
            {status === 'loading' ? (
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
