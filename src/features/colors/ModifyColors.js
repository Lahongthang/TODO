import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addColor, deleteColor, selectAllColors } from '../filters/filtersSlice'
import { ReactComponent as TimesSolid } from '../todos/times-solid.svg'

const AvailableColors = ({onDelete}) => {
    const colorsObj = useSelector(selectAllColors)

    const renderedColors = colorsObj.map(color => {
        const handleDelete = () => onDelete(color.id)
        return (
                <tr key={color.id} className='color-item'>
                    <td>{color.id}</td>
                    <td>{color.name}</td>
                    <td>
                        <button className="destroy" onClick={handleDelete}>
                            <TimesSolid />
                        </button>
                    </td>
                </tr>
        )
    })
    return (
        <div className='available-colors'>
            <h5>Available Colors</h5>
            <table>
                <thead>
                    <tr>
                        <th style={{width: '20%'}}>Color Id</th>
                        <th style={{width: '60%'}}>Color Name</th>
                        <th style={{width: '20%'}}>Delete Color</th>
                    </tr>
                </thead>
                <tbody>
                    {renderedColors}
                </tbody>
            </table>
        </div>
    )
}

const ModifyColors = () => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')

    const handleChange = e => {
        setText(e.target.value)
    }

    const handleKeyDown = e => {
        if (e.which === 13) handleColorAdded()
    }

    const handleColorAdded = () => {
        if (text) {
            dispatch(addColor(text))
            setText('')
        }
    }

    const onDeleteColor = (id) => {
        dispatch(deleteColor(id))
    }

    return (
        <div className='modify-colors'>
            <div className='add-color'>
                <input
                    placeholder="Enter color name"
                    value={text}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleColorAdded}>Add</button>
            </div>
            <AvailableColors onDelete={onDeleteColor}/>
        </div>
    )
}

export default ModifyColors