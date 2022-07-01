import {useState} from 'react'
import {Link} from 'react-router-dom'

const Navigation = () => {
    return (
        <nav>
            <div className="navContent">
                <div className="navLinks">
                    <Link to='/'>Home</Link>
                    <Link to='/modifyColors'>Modify Colors</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navigation