import {createEntityAdapter, createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit'

const todosAdapter = createEntityAdapter()

const initialState = todosAdapter.getInitialState({
    status: 'idle',
    links: {},
    meta: {}
})

// fetch todos with filters
export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async ({link, status, colors}) => {
        let tempUrl = link ? link : `http://localhost:8000/api/todos?page=1`
        const statusParam = status ? `&status=${status}` : ''
        const colorsParam = colors ? `&colors=${colors}` : ''
        const url = tempUrl + '&pageSize=3&sortBy=dateDesc' + statusParam + colorsParam
        console.log('url: ', url)
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('fetch todos failed!')
        }
        return response.json()
    }
)

export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async text => {
        const response = await fetch(`http://localhost:8000/api/todos?text=${text}`, {method: 'POST'})
        if (!response.ok) {
            throw new Error('Add todo failed!')
        }
        return response.json()
    }
)

export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async ({id, completed, color}) => {
        const completedParam = completed !== undefined ? `completed=${!completed}` : ''
        const colorParam = color ? `color=${color}` : ''
        let tempUrl = `http://localhost:8000/api/todos/${id}?`
        const url = tempUrl + completedParam + colorParam
        console.log('url: ', url)
        const response = await fetch(url, {method: 'PUT'})
        if (!response.ok) {
            throw new Error('Update todo failed!')
        }
        return response.json()
    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async todoId => {
        const url = `http://localhost:8000/api/todos/${todoId}`
        const response = await fetch(url, {method: 'DELETE'})
        if (!response.ok) {
            throw new Error('Delete todo failed!')
        }
        return response.json()
    }
)

export const markOrClear = createAsyncThunk(
    'todos/markOrClear',
    async ({todoIds, action}) => {
        const tempUrl = 'http://localhost:8000/api/todos/'
        const idParam = `?ids=${todoIds}`
        const url = tempUrl + action + idParam
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Mark or Clear todo failed!')
        }
        return response.json()
    }
)

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        markAllCompleted(state) {
            const newEntities = {}
            Object.values(state.entities).map(entity => {
                newEntities[entity.id] = {
                    ...entity,
                    completed: true
                }
            })
            state.entities = newEntities
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                console.log('payload: ', action.payload)
                state.status = 'idle'
                state.links = action.payload.links
                state.meta = action.payload.meta
                todosAdapter.removeAll(state)
                todosAdapter.setAll(state, action.payload.data)
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed'
                todosAdapter.removeAll(state)
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                todosAdapter.addOne(state, action.payload.data)
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                console.log('jjjjjjjjj: ', action.payload.data)
                todosAdapter.upsertOne(state, action.payload.data)
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                todosAdapter.removeOne(state, action.payload.data.id)
            })
    }
})

export const {markAllCompleted, clearAllCompleted} = todosSlice.actions

export const {
    selectAll: selectTodos,
    selectIds: selectTodoIds,
    selectById: selectTodoById
} = todosAdapter.getSelectors(state => state.todos)

const selectCompletedTodos = createSelector(
    selectTodos,
    todos => todos.filter(todo => todo.completed)
)

export const selectCompletedTodoIds = createSelector(
    selectCompletedTodos,
    completedTodos => completedTodos.map(todo => todo.id)
)

export default todosSlice.reducer
