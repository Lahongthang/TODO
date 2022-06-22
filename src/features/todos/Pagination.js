import { useSelector, useDispatch } from "react-redux"
import { selectLinks, fetchTodos } from "./todosSlice"

const Pagination = () => {
    const dispatch = useDispatch()

    const links = useSelector(selectLinks)
    console.log('links: ', links);

    const handleClick = () => {
        
    }

    const renderedPag = Object.keys(links).map(key => {
        return (
            <button
                key={key}
                className="pag-button"
                onClick={handleClick}
            >
                {key}
            </button>
        )    
    })

    return (
        <center>{renderedPag}</center>
    )
}

export default Pagination