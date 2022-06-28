import { createSlice } from "@reduxjs/toolkit"

export const StatusFilters = {
    All: 'all',
    Active: 'active',
    Completed: 'completed'
}

const initialState = {
    status: StatusFilters.All,
    colors: []
}

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
                        state.colors.concat(color)
                    }
                }
                break
                case 'removed': {
                    state.colors.filter(existingClolor => existingClolor !== color)
                }
                break
                default: 
                    return state
            }
        }
    }
})

export const {statusFilterChanged, colorFilterChanged} = filtersSlice.actions
export default filtersSlice.reducer