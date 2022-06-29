import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit'

const colorsAdapter = createEntityAdapter()

const initialState = colorsAdapter.getInitialState({
    status: 'idle'
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

const colorsSlice = createSlice({
    name: 'colors',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(fetchColors.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchColors.fulfilled, (state, action) => {
                console.log('colors action: ', action)
                state.status = 'idle'
                colorsAdapter.setAll(state, action.payload.data)
            })
            .addCase(fetchColors.rejected, (state) => {
                state.status = 'failed'
                colorsAdapter.removeAll(state)
            })

            .addCase(addColor.fulfilled, (state, action) => {
                colorsAdapter.addOne(state, action.payload.data)
            })
            .addCase(addColor.rejected, (state) => {
                
            })
    }
})

export const {
    selectAll: selectAllColors,
    selectIds: selectColorIds,
    selectEntities
} = colorsAdapter.getSelectors(state => state.colors)
export default colorsSlice.reducer