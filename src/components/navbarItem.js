import React from 'react'

function NavbarItem(props){
    return(
        <div className="nav-item">
            <li className="nav-item">
                <a className="nav-link" href={props.href}>{props.label}</a>
            </li>
        </div>
    )
}

export default NavbarItem