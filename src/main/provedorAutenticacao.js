import React from 'react'

import AuthService from '../app/service/authService'

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer
const AuthProvider = AuthContext.Provider

class ProvedorAutenticacao extends React.Component{
    
    state = {
        usurioAutenticado: null,
        isAutenticado: false
    }

    inciarSessao = (usuario) => {
        AuthService.logar(usuario)
        this.setState({isAutenticado: true, usurioAutenticado: usuario})
    }

    encerrarSessao = () => {
        AuthService.removerUsuarioAutenticado()
        this.setState({isAutenticado: false, usurioAutenticado: null})
    }
    
    render(){
        const contexto = {
            usurioAutenticado: this.state.usurioAutenticado,
            isAutenticado: this.state.isAutenticado,
            inciarSessao: this.inciarSessao,
            encerrarSessao: this.encerrarSessao

        }

        return(
            <AuthProvider value={contexto}>
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default ProvedorAutenticacao