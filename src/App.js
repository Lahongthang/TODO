import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Main from './features/todos/Main'
import Notification from './features/notifications/Notification'
import ModifyColors from './features/colors/ModifyColors'

function App() {

  return (
      <div className="App">
        <nav>
          <section>
            <h1>Redux Fundamentals Example</h1>
          </section>
        </nav>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Notification/>
                <Main/>
              </>
            }
          />
          <Route path='/modifyColors' element={<ModifyColors/>}/>
        </Routes>
      </div>
  )
}

export default App
