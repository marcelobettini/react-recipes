import { NavLink } from 'react-router'
const navStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? 'pink' : '',
})
import './Nav.css'

export default function Nav() {
    return (
        <nav className='nav'>
            <ul>
                <li>
                    <NavLink
                        style={navStyle}
                        to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink style={navStyle} to="/recipes">Recipes</NavLink>
                </li>
                <li>
                    <NavLink style={navStyle} to="/about">About</NavLink>
                </li>
            </ul>
        </nav>
    )
}
