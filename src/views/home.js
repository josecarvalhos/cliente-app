import React from 'react'

class Home extends React.Component{
    render(){
        return(
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de Clientes.</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botão abaixo para navegar pelo sistema.</p>
                <p className="lead">
                <a className="btn btn-primary btn-lg" 
                    href="#/cadastro-cliente" 
                    role="button"><i className="fa fa-users"></i>  
                    Cadastrar Clientes</a>
                </p>
            </div>
        )
    }
}

export default Home