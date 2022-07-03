import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { resetMessage } from '../todos/todosSlice'

const Notification = ({message}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(resetMessage())
        }, 3000)
    }, [])

    return (
        <div className='action-message'>
            {message}
        </div>
    )
}

export default Notification