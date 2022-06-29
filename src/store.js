import {configureStore} from '@reduxjs/toolkit'
import todosSlice from './features/todos/todosSlice'
import filtersSlice from './features/filters/filtersSlice'
import colorsSlice from './features/colors/colorsSlice'

const store = configureStore({
  reducer: {
    todos: todosSlice,
    filters: filtersSlice,
    colors: colorsSlice
  }
})

export default store