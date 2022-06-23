import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from '../todos/todosSlice'

const Header = () => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  const handleChanged = (e) => {
    setText(e.target.value)
  }

  const handleKeyDown = e => {
    if (e.which === 13 && text) {
      const trimedText = text.trim()
      setText('')
      dispatch(addTodo(trimedText))
    }
  }

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder='What needs to be done?'
        autoFocus={true}
        value={text}
        onChange={handleChanged}
        onKeyDown={handleKeyDown}
      />
    </header>
  )
}

export default Header
