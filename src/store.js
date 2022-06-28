import {configureStore} from '@reduxjs/toolkit'
import todosSlice from './features/todos/todosSlice'
import filtersSlice from './features/filters/filtersSlice'

const store = configureStore({
  reducer: {
    todos: todosSlice,
    filters: filtersSlice
  }
})

export default store