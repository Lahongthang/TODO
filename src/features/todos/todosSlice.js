import {createEntityAdapter, createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit'
import { encode } from '../encode/encode'

const todosAdapter = createEntityAdapter()

const initialState = todosAdapter.getInitialState({
    status: 'idle',
    meta: {},
    message: ''
})

// fetch todos with filters
export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async ({link, status, colors}) => {
        const tempUrl = link ?
            link + '&pageSize=3&sortBy=dateDesc' :
            `http://localhost:8000/api/todos?page=1&pageSize=3&sortBy=dateDesc`
        const statusParam = status ? `&status=${status}` : ''
        const colorsParam = colors ? `&colors=${colors}` : ''
        const url = tempUrl + statusParam + colorsParam
        // console.log('url: ', url)
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Todos Not Found!')
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
    async ({id, completed, color}, {rejectWithValue}) => {
        let body
        if (completed !== undefined && color) {
            body = {
                completed: !completed,
                color
            }
        } else if (completed === undefined) {
            body = {color}
        } else if (color === undefined) {
            body = {completed: !completed}
        } else {
            body = null
        }
        body = {kkk: 'kkk'}
        console.log('body: ', body)
        const formBody = encode(body)
        const url = `http://localhost:8000/api/todos/${id}`
        console.log('url: ', url)

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                body: formBody
            })
            if (!response.ok) {
                console.log('RESPONSE: ', response)
            }
            return response.json()
        } catch (error) {
            console.log('ERROR: ', error)
            return rejectWithValue(error)
        }
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
        const idParam = todoIds.length > 0 ? `?ids=${todoIds}` : '?ids=-1'
        const url = tempUrl + action + idParam
        console.log('URL: ', url)
        const response = await fetch(url)
        if (!response.ok) {
            if (action === 'mark-completed') {
                throw new Error('Mark all todos failed!')
            }
            throw new Error('Clear todos failed!')
        }
        return response.json()
    }
)

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        markAllCompleted(state) {
            Object.values(state.entities).forEach(entity => {
                entity.completed = true
            })
        },
        clearAllCompleted(state) {
            Object.values(state.entities).forEach(entity => {
                if (entity.completed) {
                    delete state.entities[entity.id]
                    state.ids = state.ids.filter(id => id !== entity.id)
                } 
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'idle'
                state.message = ''
                state.meta = action.payload.meta
                todosAdapter.setAll(state, action.payload.data)
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                console.log('message: ', action)
                state.status = 'failed'
                state.message = action.error.message
                state.meta = {}
                todosAdapter.removeAll(state)
            })

            .addCase(addTodo.fulfilled, (state, action) => {
                state.status = 'idle'
                // state.message = '1 todo added!'
                todosAdapter.addOne(state, action.payload.data)
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.message = action.error.message
            })

            .addCase(updateTodo.fulfilled, (state, action) => {
                state.message = 'Update todo succeed!'
                todosAdapter.upsertOne(state, action.payload.data)
            })
            .addCase(updateTodo.rejected, (state, action) => {
                console.log('message: ', action)
                state.message = action.error.message
            })

            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.message = '1 todo deleted'
                todosAdapter.removeOne(state, action.payload.data.id)
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.message = action.error.message
            })

            .addCase(markOrClear.fulfilled, (state, action) => {
                state.message = action.payload.message
            })
            .addCase(markOrClear.rejected, (state, action) => {
                state.message = action.error.message
            })
    }
})

export const {markAllCompleted, clearAllCompleted} = todosSlice.actions

export const {
    selectAll: selectTodos,
    selectIds: selectTodoIds,
    selectById: selectTodoById,
    selectEntities
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
