import Header from "../header/Header"
import TodoList from "./TodoList"
import Pagination from "./Pagination"
import Footer from "../footer/Footer"

const Main = () => {
    return (
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
    )
}

export default Main