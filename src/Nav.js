import React from 'react'
import{Link} from 'react-router-dom';
const Nav = () => {
    return (
        <nav className='Nav'>
            <ul className="Nav-list">
                <li>
                    <Link to="/Cakes">Cakes</Link>
                </li>
                <li>
                    <Link to="/Bouquets">Bouquets</Link>
                </li>
                <li>
                    <Link to="/Plants">Plants</Link>
                </li>
                <li>
                    <Link to="/Chocolates">Chocolates</Link>
                </li>
                <li>
                    <Link to="/Combos">Combos</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav
