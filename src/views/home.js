import React from 'react'

import { AuthContext } from '../main/provedorAutenticacao'

class Home extends React.Component{
    render(){
        return(
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de Clientes.</p>
            </div>
        )
    }
}

Home.contextType = AuthContext

export default Home