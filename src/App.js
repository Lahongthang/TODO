import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Navigation from './features/navigation/Navigation'
import Main from './features/todos/Main'
import Colors from './features/colors/Colors'
import EditColor from './features/colors/EditColor'

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
          <Route path='/' element={<Main/>}/>
          <Route path='/colors' element={<Colors/>}/>
          <Route path='/colors/:colorId' element={<EditColor/>}/>
        </Routes>
      </div>
  )
}

export default App
