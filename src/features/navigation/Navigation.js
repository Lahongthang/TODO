import {useState} from 'react'
import {Link, NavLink} from 'react-router-dom'

const Navigation = () => {
    return (
        <nav>
            <div className="navContent">
                <div className="navLinks">
                    <NavLink className='nav-link' to='/'>Home</NavLink>
                    <NavLink className='nav-link' to='/colors'>Colors</NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navigation