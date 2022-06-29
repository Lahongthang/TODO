import React from 'react'
import Header from './features/header/Header'
import TodoList from './features/todos/TodoList'
import Pagination from './features/todos/Pagination'
import Footer from './features/footer/Footer'
import Notification from './features/notifications/Notification'
import Test1 from './features/test/Test1'

function App() {

  return (
    <div className="App">
      <nav>
        <section>
          <h1>Redux Fundamentals Example</h1>
        </section>
      </nav>
      <Notification/>
      <main>
        <section className="medium-container">
          <h2>Todos</h2>
          <div className="todoapp">
            <Header />
            <TodoList />
            <Pagination/>
            <Footer />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
