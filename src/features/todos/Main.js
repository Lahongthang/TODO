import {useSelector} from 'react-redux'
import Notification from "../notifications/Notification"
import Header from "../header/Header"
import TodoList from "./TodoList"
import Pagination from "./Pagination"
import Footer from "../footer/Footer"

const Main = () => {
    const message = useSelector(state => state.todos.message)

    return (
        <div>
            <div className='notification'>
                {message && <Notification message={message}/>}
            </div>
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

export default Main