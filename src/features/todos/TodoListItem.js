import {unwrapResult} from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { selectTodoById, updateTodo, deleteTodo } from './todosSlice'
import { ReactComponent as TimesSolid } from './times-solid.svg'
import { availableColors, lowerCase } from '../filters/colors'

const TodoListItem = ({ id }) => {
  const dispatch = useDispatch()
  const todo = useSelector(state => selectTodoById(state, id))

  const {text, completed, color} = todo

  let colorName = color ? color.name : ''
  let colorNameLowerCase = colorName ? lowerCase(colorName) : ''

  const colorOptions = availableColors.map(color => (
    <option key={color} value={lowerCase(color)} style={{color: lowerCase(color)}}>
      {color}
    </option>
  ))

  const handleChanged = () => {
      dispatch(updateTodo({id, completed}))
  }

  const handleColorChanged = (e) => {
    const color = e.target.value
    dispatch(updateTodo({id, color}))
  }

  const onDelete = async () => {
    await dispatch(deleteTodo(id))
  }

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleChanged}
          />
          <div className="todo-text">{text}</div>
        </div>

        <div className="segment buttons">
          <select
            className="colorPicker"
            value={colorNameLowerCase}
            style={{color: colorNameLowerCase}}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={onDelete}>
            <TimesSolid />
          </button>
        </div>

      </div>
    </li>
  )
}

export default TodoListItem
