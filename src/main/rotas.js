import React from 'react'

import Login from '../views/login'
import CadastroCliente from '../views/cadastroCliente'
import Home from '../views/home'

import {Route, Switch, HashRouter} from 'react-router-dom'

function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-cliente" component={CadastroCliente} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas