import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import {
  selectTodos,
  fetchTodos,
  selectTodoIds,
  markOrClear,
  selectTodoCompletedIds,
} from '../todos/todosSlice'
import { availableColors, lowerCase } from '../filters/colors'
import { StatusFilters, colorFilterChanged, statusFilterChanged } from '../filters/filtersSlice'

const RemainingTodos = ({ count }) => {
  const suffix = count < 2 ? '' : 's'
  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{count}</strong> item{suffix} left
    </div>
  )
}

const StatusFilter = ({value: status, onChange}) => {
  const renderedFilters = Object.keys(StatusFilters).map(key => {
    const value = StatusFilters[key]
    const className = value === status ? 'selected' : ''

    const handleClick = () => onChange(value)

    return (
      <li key={value}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    )
  })
  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  )
}

const ColorFilters = ({value: colors, onChange}) => {
  const renderedColors = availableColors.map(color => {
    const checked = colors.includes(color)
    const handleChange = () => {
      const changeType = checked ? 'removed' : 'added'
      onChange(color, changeType)
    }
    return (
      <label key={color}>
        <input
          type='checkbox'
          name={color}
          checked={checked}
          onChange={handleChange}
        />
        <span
          className="color-block"
          style={{
            backgroundColor: lowerCase(color),
          }}
        ></span>
        {color}
      </label>
    )
  })
  return (
    <div className="filters colorFilters">
      <h5>Filter by Color</h5>
      <form className="colorSelection">{renderedColors}</form>
    </div>
  )
}

const Footer = () => {
  const dispatch = useDispatch()

  const todos = useSelector(selectTodos, shallowEqual)

  const todoIds = useSelector(selectTodoIds)

  const todoCompletedIds = useSelector(selectTodoCompletedIds)

  const todosRemaining = todos.filter(todo => !todo.completed).length
  const {status, colors} = useSelector(state => state.filters, shallowEqual)

  const onStatusChange = (status) => {
    dispatch(statusFilterChanged(status))
  }

  const onColorChange = (color, changeType) => {
    dispatch(colorFilterChanged(color, changeType))
  }

  const handleMarkAllComplete = () => {
    dispatch(markOrClear(todoIds, 'mark'))
  }

  const handleClearComplete = () => {
    dispatch(markOrClear(todoCompletedIds))
  }

  useEffect(() => {
    dispatch(fetchTodos({status, colors}))
  }, [status, colors])

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button" onClick={handleMarkAllComplete}>
          Mark All Completed
        </button>
        <button className="button" onClick={handleClearComplete}>
          Clear Completed
        </button>
      </div>

      <RemainingTodos count={todosRemaining}/>
      <StatusFilter value={status} onChange={onStatusChange}/>
      <ColorFilters value={colors} onChange={onColorChange}/>
    </footer>
  )
}

export default Footer
