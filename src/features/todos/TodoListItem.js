import { useSelector, useDispatch } from 'react-redux'
import { selectTodoById, fetchTodos, updateTodo, deleteTodo } from './todosSlice'
import { ReactComponent as TimesSolid } from './times-solid.svg'
import { availableColors, lowerCase } from '../filters/colors'

const TodoListItem = ({ id }) => {
  const dispatch = useDispatch()
  const todo = useSelector(state => selectTodoById(state, id))

  const {text, completed, color} = todo

  // let colorName = ''
  // let colorNameLowerCase = ''
  // if (color !== null) {
  //   colorName = color.name
  //   colorNameLowerCase = lowerCase(colorName)
  // }

  let colorName = color ? color.name : ''
  let colorNameLowerCase = colorName ? lowerCase(colorName) : ''

  const colorOptions = availableColors.map(color => (
    <option key={color} value={lowerCase(color)}>
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
    await dispatch(fetchTodos({}))
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
