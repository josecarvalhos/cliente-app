import React from 'react'

import Login from '../views/login'
import CadastroCliente from '../views/cadastroCliente'
import Home from '../views/home'
import ConsultaClientes from '../views/consultaClientes'

import {Route, Switch, HashRouter} from 'react-router-dom'

function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-cliente" component={CadastroCliente} />
                <Route path="/consulta-clientes" component={ConsultaClientes} />
                <Route path="/cadastro-cliente/:id" component={CadastroCliente} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas