import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit"

export const StatusFilters = {
    All: 'all',
    Active: 'active',
    Completed: 'completed'
}

const filtersAdapter = createEntityAdapter()

const initialState = filtersAdapter.getInitialState({
    fetchStatus: 'idle',
    status: StatusFilters.All,
    colors: []
})

export const fetchColors = createAsyncThunk(
    'colors/fetchColors',
    async () => {
        const url = 'http://localhost:8000/api/colors'
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Fetch colors failed!')
        }
        return response.json()
    }
)
export const addColor = createAsyncThunk(
    'colors/addColor',
    async ({name}) => {
        const url = `http://localhost:8000/api/colors?name=${name}`
        const response = await fetch(url, {method: 'POST'})
        if (!response.ok) {
            throw new Error('Add color failed!')
        }
        return response.json()
    }
)

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        statusFilterChanged(state, action) {
            state.status = action.payload
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
                filtersAdapter.setAll(state, action.payload.data)
            })
            .addCase(fetchColors.rejected, (state) => {
                state.fetchStatus = 'failed'
                filtersAdapter.removeAll(state)
            })

            .addCase(addColor.fulfilled, (state, action) => {
                filtersAdapter.addOne(state, action.payload.data)
            })
            .addCase(addColor.rejected, (state, action) => {

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