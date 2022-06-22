import { useSelector, useDispatch } from "react-redux"
import { selectLinks, selectMetaLinks, pagination } from "./todosSlice"
import { capitalize } from "../filters/colors"

const Pagination = () => {
    const dispatch = useDispatch()

    const metaLinks = useSelector(selectMetaLinks)
    console.log('meta: ', metaLinks);
    const links = metaLinks.filter(link => link.url !== null)
    console.log(links)

    const renderedPag = links.map((link, index) => {
        const className = link.active ? 'selected pag-button' : 'pag-button'
        let label = link.label
        if (link.label === 'Next &raquo;') {
            label = 'Next >>'
        } else if (link.label === '&laquo; Previous') {
            label = '<< Prev'
        }
        
        return (
            <button
                key={index}
                className={className}
                onClick={() => dispatch(pagination(link.url))}
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