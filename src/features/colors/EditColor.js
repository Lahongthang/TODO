import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams, Link, useNavigate} from 'react-router-dom'
import { selectColorById, updateColor } from '../filters/filtersSlice'
import styles from './EditColor.module.css'

const EditColorForm = () => {
    const dispatch = useDispatch()
    const {colorId} = useParams()
    const navigate = useNavigate()
    const color = useSelector(state => selectColorById(state, colorId))

    const [text, setText] = useState(color.name)

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSave = () => {
        dispatch(updateColor({colorId, newName: text}))
        navigate('/colors')
    }

    return (
        <div className={styles.edit}>
            <div className={styles.view}>
                <input
                    className={styles.editForm}
                    value={text}
                    autoFocus={true}
                    onChange={handleChange}
                />
                <div className={styles.save}>
                    <button
                        className='button'
                        to='/colors'
                        onClick={handleSave}
                    >Save</button>
                    <Link className='button' to='/colors'>Cancel</Link>
                </div>
            </div>
        </div>
    )
}

export default EditColorForm