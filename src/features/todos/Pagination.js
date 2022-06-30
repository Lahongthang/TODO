import { useSelector, useDispatch } from "react-redux"
import { pagination, fetchTodos } from "./todosSlice"

const Pagination = () => {
    const dispatch = useDispatch()

    const {status, colors} = useSelector(state => state.filters)

    const metaLinks = useSelector(state => state.todos.meta.links)
    const links = metaLinks?.filter(link => link.url !== null)

    if (links?.length < 2) {
        return
    }

    const renderedPag = links?.map((link, index) => {
        const className = link.active ? 'selected pag-button' : 'pag-button'
        let label = link.label
        if (label === 'Next &raquo;') {
            label = 'Next >>'
        } else if (link.label === '&laquo; Previous') {
            label = '<< Prev'
        }
        
        return (
            <button
                key={index}
                className={className}
                onClick={() => dispatch(fetchTodos({link: link.url, status, colors}))}
            >
                {label}
            </button>
        )    
    })

    return (
        <center>{renderedPag}</center>
    )
}

export default Pagination