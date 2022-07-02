import {useState} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { addColor, deleteColor, selectAllColors } from '../filters/filtersSlice'
import { ReactComponent as TimesSolid } from '../todos/times-solid.svg'
import styles from './Colors.module.css'
import { lowerCase } from '../filters/colors'

const AvailableColors = ({onDelete}) => {
    const colorsObj = useSelector(selectAllColors)

    const renderedColors = colorsObj.map(color => {
        const handleDelete = () => onDelete(color.id)
        return (
                <tr key={color.id}>
                    <td className={styles.id}>{color.id}</td>
                    <td className={styles.name}>
                        <span style={{background: lowerCase(color.name)}}></span>
                        {color.name}
                    </td>
                    <td className={styles.edit}>
                        <Link to={`/colors/${color.id}`}>Edit</Link>
                    </td>
                    <td className={styles.delete}>
                        <button className="destroy" onClick={handleDelete}>
                            <TimesSolid />
                        </button>
                    </td>
                </tr>
        )
    })
    return (
        <div className={styles.availableColors}>
            <h5>Available Colors</h5>
            <table>
                <thead>
                    <tr>
                        <th className={styles.id}>Id</th>
                        <th className={styles.name}>Color Name</th>
                        <th className={styles.edit}>Edit Name</th>
                        <th className={styles.delete}>Delete</th>
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
        if (e.which === 13 && text) {
            dispatch(addColor(text))
            setText('')
        }
    }

    const onDeleteColor = (id) => {
        dispatch(deleteColor(id))
    }

    return (
        <div className={styles.colors}>
            <div className={styles.view}>
                <div>
                    <input
                        className={styles.addColor}
                        placeholder="Enter color name"
                        value={text}
                        autoFocus={true}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <AvailableColors onDelete={onDeleteColor}/>
            </div>
        </div>
    )
}

export default ModifyColors