import {useSelector} from 'react-redux'

const Notification = () => {
    const message = useSelector(state => state.todos.message)
    return (
        <div className='notification'>
            {message}
        </div>
    )
}

export default Notification