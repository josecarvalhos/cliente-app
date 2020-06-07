import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'
import UsuarioService from '../app/service/usuarioService'
import LocalStorageService from '../app/service/localstorageService'
import { mensagemErro } from '../components/toastr'

class login extends React.Component {

    state = {
        usuario: '',
        senha: ''
    }

    constructor(){
        super()
        this.service = new UsuarioService()
    }

    entrar = () => {
        this.service.autenticar({
            usuario: this.state.usuario,
            senha: this.state.senha
        }).then( response => {
            LocalStorageService.adicionarItem('_usuario_logado', response.data)
            this.props.history.push('/home')
        }).catch( erro => {
            mensagemErro(erro.response.data)
        })
    }

    render(){
        return (
            <div className="row">
                <div className="col-md-6" style={ {position : 'relative', left : '300px'} }>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Usuário: *" htmlFor="inputUsuario">
                                                <input type="text"
                                                    value={this.state.usuario}
                                                    onChange={e => this.setState({usuario: e.target.value})}
                                                    className="form-control" 
                                                    id="inputUsuario" 
                                                    aria-describedby="usuarioHelp" 
                                                    placeholder="Digite o Usuário" />
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="inputPassword">
                                                <input type="password" 
                                                    value={this.state.senha}
                                                    onChange={e => this.setState({senha: e.target.value})}
                                                    className="form-control" 
                                                    id="inputPassword" 
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
        )
    }
}

export default login;
