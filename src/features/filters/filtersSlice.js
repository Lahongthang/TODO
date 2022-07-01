import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit"
import { encode } from "../encode/encode"
import { headers } from "../todos/todosSlice"

export const StatusFilters = {
    All: 'all',
    Active: 'active',
    Completed: 'completed'
}

const filtersAdapter = createEntityAdapter()

const initialState = filtersAdapter.getInitialState({
    fetchStatus: 'idle',
    filterStatus: StatusFilters.All,
    colors: [],
    message: ''
})

export const fetchColors = createAsyncThunk(
    'colors/fetchColors',
    async (a, {rejectWithValue, fulfillWithValue}) => {
        const url = 'http://localhost:8000/api/colors'
        try {
            const response = await fetch(url, {headers: headers})
            const data = await response.json()
            if (!response.ok) {
                return rejectWithValue(data)
            }
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const addColor = createAsyncThunk(
    'colors/addColor',
    async (name, {rejectWithValue, fulfillWithValue}) => {
        const formBody = encode({name: name})
        const url = `http://localhost:8000/api/colors`
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: formBody
            })
            const data = await response.json()
            if (!response.ok) {
                return rejectWithValue(data)
            }
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        statusFilterChanged(state, action) {
            state.filterStatus = action.payload
        },
        colorFilterChanged(state, action) {
            let {color, changeType} = action.payload
            const {colors} = state
            switch (changeType) {
                case 'added': {
                    if (!colors.includes(color)) {
                        state.colors.push(color)
                    }
                }
                break
                case 'removed': {
                    state.colors = state.colors.filter(existingClolor => existingClolor !== color)
                }
                break
                default: 
                    return state
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchColors.pending, (state) => {
                state.fetchStatus = 'loading'
            })
            .addCase(fetchColors.fulfilled, (state, action) => {
                state.fetchStatus = 'idle'
                state.message = 'fetch colors succeed!'
                filtersAdapter.setAll(state, action.payload.data)
            })
            .addCase(fetchColors.rejected, (state, action) => {
                state.fetchStatus = 'failed'
                filtersAdapter.removeAll(state)
                state.message = action.payload.message
            })

            .addCase(addColor.fulfilled, (state, action) => {
                state.message = action.payload.message
                filtersAdapter.addOne(state, action.payload.data)
            })
            .addCase(addColor.rejected, (state, action) => {
                state.message = action.payload.message
            })
    }
})

export const {statusFilterChanged, colorFilterChanged} = filtersSlice.actions
export const {
    selectAll: selectAllColors,
    selectIds: selectColorIds,
    selectEntities
} = filtersAdapter.getSelectors(state => state.filters)
export default filtersSlice.reducer