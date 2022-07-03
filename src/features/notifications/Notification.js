import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { resetMessage } from '../todos/todosSlice'

const Notification = ({message}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const reset = setTimeout(() => {
            dispatch(resetMessage())
        }, 3000)

        //clean up function
        return () => {
            console.log('clean');
            clearTimeout(reset)
        }
    }, [])

    return (
        <div className='action-message'>
            {message}
        </div>
    )
}

export default Notification