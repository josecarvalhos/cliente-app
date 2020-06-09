import React from 'react'

import Login from '../views/login'
import CadastroCliente from '../views/cadastroCliente'
import Home from '../views/home'
import ConsultaClientes from '../views/consultaClientes'
import { AuthConsumer } from '../main/provedorAutenticacao'

import {Route, Switch, HashRouter, Redirect} from 'react-router-dom'


function RotaAutenticada({ component: Component, isUsuarioAutenticado, ...props}){
    return(
        <Route {...props} render={ (componentProps) => {
            if (isUsuarioAutenticado) {
              return(
                  <Component {...componentProps} />
              )  
            } else {
                return(
                    <Redirect to={ {pathname: '/login', state: { from: componentProps.location}} } />
                )   
            }
        }} />
    )
}

function Rotas(props){
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-clientes" component={ConsultaClientes} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-cliente/:id?" component={CadastroCliente} />
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (<Rotas isUsuarioAutenticado={context.isAutenticado}/>)}
    </AuthConsumer>
)