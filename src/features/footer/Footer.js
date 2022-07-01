import { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectTodos,
  fetchTodos,
  selectTodoIds,
  markOrClear,
  markAllCompleted,
  selectCompletedTodoIds,
  clearAllCompleted
} from '../todos/todosSlice'
import { lowerCase } from '../filters/colors'
import { StatusFilters, colorFilterChanged, statusFilterChanged, selectAllColors } from '../filters/filtersSlice'

const RemainingTodos = ({ count }) => {
  const suffix = count < 2 ? '' : 's'
  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{count}</strong> item{suffix} left
    </div>
  )
}

const StatusFilter = ({value: filterStatus, onChange}) => {
  const renderedFilters = Object.keys(StatusFilters).map(key => {
    const value = StatusFilters[key]
    const className = value === filterStatus ? 'selected' : ''

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
  const colorsObj = useSelector(selectAllColors)
  const apiColors = colorsObj.map(color => color.name)

  const renderedColors = apiColors.map(color => {
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
      <Link to='/modifyColors'>Modify Colors</Link>
    </div>
  )
}

const Footer = () => {
  const dispatch = useDispatch()
  const todos = useSelector(selectTodos)
  const todoIds = useSelector(selectTodoIds)

  const completesTodoIds = useSelector(selectCompletedTodoIds)
  const disableClear = completesTodoIds.length === 0 ? true : false
  const disableMark = completesTodoIds.length === todoIds.length ? true : false

  const todosRemaining = todos.filter(todo => !todo.completed).length
  const {filterStatus, colors} = useSelector(state => state.filters)

  const onStatusChange = (status) => {
    dispatch(statusFilterChanged(status))
  }

  const onColorChange = (color, changeType) => {
    dispatch(colorFilterChanged({color, changeType}))
  }

  const handleMarkAllCompleted = async () => {
    await dispatch(markOrClear({todoIds, action: 'mark-completed'}))
    dispatch(markAllCompleted())
  }

  const handleClearCompleted = async () => {
    await dispatch(markOrClear({todoIds: completesTodoIds, action: 'clear-completed'}))
    dispatch(clearAllCompleted())
    dispatch(fetchTodos({filterStatus, colors}))
  }

  useEffect(() => {
    dispatch(fetchTodos({filterStatus, colors}))
  }, [filterStatus, colors])

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button
          className="button"
          onClick={handleMarkAllCompleted}
          disabled={disableMark}
        >
          Mark All Completed
        </button>
        <button
          className="button"
          onClick={handleClearCompleted}
          disabled={disableClear}
        >
          Clear Completed
        </button>
      </div>

      <RemainingTodos count={todosRemaining}/>
      <StatusFilter value={filterStatus} onChange={onStatusChange}/>
      <ColorFilters value={colors} onChange={onColorChange}/>
    </footer>
  )
}

export default Footer
