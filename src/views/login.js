import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'


class login extends React.Component {

    state = {
        usuario: '',
        senha: ''
    }

    entrar = () => {
        console.log('Email: ', this.state.usuario)
        console.log('Senha: ', this.state.senha)
    }

    render(){
        return (
        <div className="container">
            <div className="row">
                <div className="col-md-6" style={ {position : 'relative', left : '300px'} }>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Usuário: *" htmlFor="inputUsuario1">
                                                <input type="usuario"
                                                    value={this.state.usuario}
                                                    onChange={e => this.setState({usuario: e.target.value})}
                                                    className="form-control" 
                                                    id="inputUsuario1" 
                                                    aria-describedby="usuarioHelp" 
                                                    placeholder="Digite o Usuário" />
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="inputPassword1">
                                                <input type="password" 
                                                    value={this.state.senha}
                                                    onChange={e => this.setState({senha: e.target.value})}
                                                    className="form-control" 
                                                    id="inputPassword1" 
                                                    placeholder="Password" />
                                            </FormGroup>
                                            <button onClick={this.entrar} className="btn btn-success">Entrar</button>
                                        </fieldset>
                                    </div> 
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default login;
