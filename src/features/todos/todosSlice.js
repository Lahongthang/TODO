import {createEntityAdapter, createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit'
import { encode } from '../encode/encode'
import { capitalize } from '../filters/colors'

const baseUrl = 'http://localhost:8000/api/'

export const headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Accept': 'application/json'
}

const todosAdapter = createEntityAdapter()

const initialState = todosAdapter.getInitialState({
    status: 'idle',
    meta: {},
    message: ''
})

// fetch todos with filters
export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async ({link, filterStatus, colors}, {rejectWithValue, fulfillWithValue}) => {
        const tempUrl = link ?
            link + '&pageSize=3&sortBy=dateDesc' :
            `http://localhost:8000/api/todos?page=&pageSize=3&sortBy=dateDesc`
        const statusParam = filterStatus ? `&status=${filterStatus}` : ''
        const colorsParam = colors ? `&colors=${colors}` : ''
        const url = tempUrl + statusParam + colorsParam
        console.log('url: ', url)

        const response = await fetch(url, {headers: headers})
        const data = await response.json()
        if (!response.ok) {
            return rejectWithValue(data)
        }
        return fulfillWithValue(data)
    }
)

export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async (text, {rejectWithValue, fulfillWithValue}) => {
        const formBody = encode({text: text})
        const response = await fetch(`http://localhost:8000/api/todos`, {
            method: 'POST',
            headers: headers,
            body: formBody
        })
        const data = await response.json()
        if (!response.ok) {
            return rejectWithValue(data)
        }
        return fulfillWithValue(data)
    }
)

export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async ({id, completed, color}, {rejectWithValue, fulfillWithValue}) => {
        const body = {}
        if (completed !== undefined) Object.assign(body, {completed: !completed})
        if (color !== undefined) Object.assign(body, {color})

        const formBody = encode(body)
        console.log('formBody: ', formBody)
        console.log('type: ', typeof(formBody))
        const url = `http://localhost:8000/api/todos/${id}`
        console.log('url: ', url)

        const response = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: formBody
        })
        const data = await response.json()
        if (!response.ok) {
            return rejectWithValue(data)
        }
        return fulfillWithValue(data)
    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (todoId, {rejectWithValue, fulfillWithValue}) => {
        const url = `http://localhost:8000/api/todos/${todoId}`
        const response = await fetch(url, {method: 'DELETE', headers: headers})
        const data = await response.json()
        if (!response.ok) {
            return rejectWithValue(data)
        }
        return fulfillWithValue(data)
    }
)

export const markOrClear = createAsyncThunk(
    'todos/markOrClear',
    async ({todoIds, action}, {rejectWithValue, fulfillWithValue}) => {
        const tempUrl = 'http://localhost:8000/api/todos/'
        const idParam = todoIds.length > 0 ? `?ids=${todoIds}` : '?ids=[]'
        const url = tempUrl + action + idParam
        console.log('URL: ', url)

        const response = await fetch(url, {headers: headers})
            const data = await response.json()
        if (!response.ok) {
            return rejectWithValue(data)
        }
        return fulfillWithValue(data)
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
        },
        resetMessage(state) {
            state.message = ''
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
                // state.message = action.payload.message
                state.message = 'Todos not found!'
                state.meta = {}
                todosAdapter.removeAll(state)
            })

            .addCase(addTodo.fulfilled, (state, action) => {
                state.status = 'idle'
                // state.message = '1 todo added!'
                todosAdapter.addOne(state, action.payload.data)
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.message = action.payload.message
            })

            .addCase(updateTodo.fulfilled, (state, action) => {
                state.message = 'Update todo succeed!'
                todosAdapter.upsertOne(state, action.payload.data)
            })
            .addCase(updateTodo.rejected, (state, action) => {
                console.log('message: ', action)
                state.message = action.payload.message
            })

            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.message = '1 todo deleted'
                todosAdapter.removeOne(state, action.payload.data.id)
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.message = action.payload.message
            })

            .addCase(markOrClear.fulfilled, (state, action) => {
                state.message = action.payload.message
            })
            .addCase(markOrClear.rejected, (state, action) => {
                state.message = action.payload.message
            })
    }
})

export const {markAllCompleted, clearAllCompleted, resetMessage} = todosSlice.actions

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
