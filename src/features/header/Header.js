import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../todos/todosSlice'

const Header = () => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const [status, setStatus] = useState('idle')

  const handleChanged = (e) => {
    setText(e.target.value)
  }

  const handleKeyDown = async e => {
    if (e.which === 13 && text) {
      setStatus('loading')
      const trimedText = text.trim()
      setText('')
      await dispatch(addTodo(trimedText))
      setStatus('idle')
    }
  }

  let isLoading = status === 'loading'
  let loader = isLoading ? <div className='loader'></div> : null

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
      {loader}
    </header>
  )
}

export default Header
