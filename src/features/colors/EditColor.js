import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams, Link} from 'react-router-dom'
import { selectColorById, updateColor } from '../filters/filtersSlice'
import styles from './EditColor.module.css'

const EditColorForm = () => {
    const dispatch = useDispatch()
    const {colorId} = useParams()
    const color = useSelector(state => selectColorById(state, colorId))

    const [text, setText] = useState(color.name)

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSave = () => {
        dispatch(updateColor({colorId, newName: text}))
    }

    return (
        <div className={styles.view}>
            <input
                className={styles.edit}
                value={text}
                autoFocus={true}
                onChange={handleChange}
            />
            <div className={styles.save}>
                <Link
                    className='button'
                    to='/colors'
                    onClick={handleSave}
                >Save</Link>
            </div>
        </div>
    )
}

export default EditColorForm