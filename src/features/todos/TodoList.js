import { useSelector } from 'react-redux'
import TodoListItem from './TodoListItem'
import { selectTodoIds, selectTodos, selectEntities } from './todosSlice'

const TodoList = () => {
    const todoIds = useSelector(selectTodoIds)
    const status = useSelector(state => state.todos.status)

    const todos = useSelector(selectTodos)
    console.log('todos: ', todos)
    const entities = useSelector(selectEntities)
    console.log('entities: ', entities)

    const renderedListItem = todoIds.map(todoId => {
        return <TodoListItem key={todoId} id={todoId}/>
    })

    return (
        <div>
            {status === 'loading' ? (
                <div className='todo-list'>
                    <div className='loader'></div>
                </div>
            ) : status === 'failed' ? (
                <div className='todo-list'>
                    <h2>Todos Not Found!</h2>
                </div>
            ) : (
                <ul className='todo-list'>{renderedListItem}</ul>
            )}
        </div>
    )
}

export default TodoList
