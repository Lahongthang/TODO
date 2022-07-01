import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addColor } from '../filters/filtersSlice'

const AvailableColors = () => {
    const renderedColors = <li>Red</li>
    return (
        <ul>
            {renderedColors}
        </ul>
    )
}

const ModifyColors = () => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')

    const handleChange = e => {
        setText(e.target.value)
    }

    const handleColorAdded = () => {
        console.log('text: ', text)
        dispatch(addColor(text))
    }

    return (
        <div>
            <div className='add-color'>
                <input
                    placeholder="Enter color's name"
                    value={text}
                    onChange={handleChange}
                />
                <button onClick={handleColorAdded}>Add</button>
            </div>
            <AvailableColors/>
        </div>
    )
}

export default ModifyColors