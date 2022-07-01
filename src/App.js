import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Navigation from './features/navigation/Navigation'
import Main from './features/todos/Main'
import Notification from './features/notifications/Notification'
import ModifyColors from './features/colors/ModifyColors'

function App() {

  return (
      <div className="App">
        <div className='nav'>
          <section>
            <h1>Redux Fundamentals Example</h1>
          </section>
        </div>
        <Navigation/>
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
