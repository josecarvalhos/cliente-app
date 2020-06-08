import React from 'react'

import NavbarItem from './navbarItem'

function Navbar(){
    return(
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >
            <div className="container">
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavbarItem href="#/home" label="Home" />
                        <NavbarItem href="#/consulta-clientes" label="Clientes" />
                        <NavbarItem href="#/login" label="Login" />
                    </ul>
                </div>
            </div>
        </div> 
    )
}

export default Navbar