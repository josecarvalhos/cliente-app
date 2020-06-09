import React from 'react'

import { withRouter } from 'react-router-dom'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import ClienteService from '../app/service/clienteService'
import SelectMenu from '../components/selectMenu'
import * as messages from '../components/toastr'
/*import {cpfMask} from '../components/mask'*/


class CadastroCliente extends React.Component {

    state = {
        nome: '',
        cpf: '',
        cep: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        uf: '',
        complemento: '',
        atualizado: false

    }

    /* componentDidMount(){
        const usuarioLogadoString = localStorage.getItem('_usuario_logado')
        const usuarioLogado = JSON.parse(usuarioLogadoString)
    } */

    constructor(){
        super()
        this.service = new ClienteService()
    }

    handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name

        this.setState({ [name]: value })
    }

    validar(){
        const msgs = []

        if(!this.state.nome){
            msgs.push('O campo Nome é obrigatório.')
        }

        if(!this.state.cpf){
            msgs.push('O campo CPF é obrigatório.')
        }

        if(!this.state.cep){
            msgs.push('O campo CEP é obrigatório.')
        }

        if(!this.state.logradouro){
            msgs.push('O campo Logradouro é obrigatório.')
        }

        if(!this.state.bairro){
            msgs.push('O campo Bairro é obrigatório.')
        }

        if(!this.state.cidade){
            msgs.push('O campo Cidade é obrigatório.')
        }

        if(!this.state.uf){
            msgs.push('O campo UF é obrigatório.')
        }

        /*if(!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            msgs.push('Informa um Email válido.')
        }*/

        return msgs
    }

    componentDidMount(){
        const params = this.props.match.params
        if(params.id){
            this.service.obterPorId(params.id)
                .then(response => {
                    this.setState({...response.data, atualizado: true})
                }).catch(erros => {
                    messages.mensagemErro(erros.response.data)
                })
        }
    }

    submit = () => {
        const msgs = this.validar()

        if(msgs && msgs.length > 0){
            msgs.forEach( (msg, index) => {
                messages.mensagemErro(msg)
            })
            return false
        }

        const { nome, cpf, cep, logradouro, bairro, cidade, uf, complemento } = this.state
        const cliente = { nome, cpf, cep, logradouro, bairro, cidade, uf, complemento }

        this.service.salvar(cliente)
            .then( response => {
                messages.mensagemSucesso('Cliente cadastrado com sucesso!')
                this.props.history.push('/consulta-clientes')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    atalizar = () => {
        const msgs = this.validar()

        if(msgs && msgs.length > 0){
            msgs.forEach( (msg, index) => {
                messages.mensagemErro(msg)
            })
            return false
        }

        const { id, nome, cpf, cep, logradouro, bairro, cidade, uf, complemento } = this.state
        const cliente = { id, nome, cpf, cep, logradouro, bairro, cidade, uf, complemento }

        this.service.atualizar(cliente)
            .then( response => {
                this.props.history.push('/consulta-clientes')
                messages.mensagemSucesso('Cliente atualizado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    render(){
        const ufs = this.service.obterUfs()
        return (
            <Card title={this.state.atualizado ? 'Atualização de Cliente' : 'Cadastro de Cliente'}>
                 <div className="row">
                    <div className="col-md-4">
                        <FormGroup label="CPF: *" htmlFor="inputCpf">
                            <input type="text"
                                id="inputCpf"
                                className="form-control"
                                maxLength='14'
                                name="cpf"
                                value={this.state.cpf}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-8">
                        <FormGroup label="Nome: *" htmlFor="inputNome">
                            <input type="text"
                                id="inputNome"
                                className="form-control" 
                                name="nome"
                                value={this.state.nome}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <FormGroup label="CEP: *" htmlFor="inputCep">
                            <input type="text"
                                id="inputCep"
                                className="form-control" 
                                name="cep"
                                value={this.state.cep}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-8">
                        <FormGroup label="Logradouro: *" htmlFor="inputLogradouro">
                            <input type="text"
                                id="inputLogradouro"
                                className="form-control" 
                                name="logradouro"
                                value={this.state.logradouro}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">

                        <FormGroup label="Bairro: *" htmlFor="inputBairro">
                            <input type="text"
                                id="inputBairro"
                                className="form-control" 
                                name="bairro"
                                value={this.state.bairro}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>

                    <div className="col-md-8">
                        <FormGroup label="Cidade: *" htmlFor="inputCidade">
                            <input type="text"
                                id="inputCidade"
                                className="form-control" 
                                name="cidade"
                                value={this.state.cidade}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputUf" label="UF: *">
                            <SelectMenu id="inputUf"
                                className="form-control" 
                                name="uf"
                                value={this.state.uf}
                                onChange={this.handleChange}
                                lista={ufs} />
                        </FormGroup>

                    </div>
                    <div className="col-md-8">
                        <FormGroup label="Complemento: " htmlFor="inputComplemento">
                            <input type="text"
                                id="inputComplemento"
                                className="form-control" 
                                name="complemento"
                                value={this.state.complemento}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        { this.state.atualizado ? 
                            (
                                <button onClick={this.atalizar} className="btn btn-success">Atualizar</button>
                            ) : (
                                <button onClick={this.submit} className="btn btn-success">Salvar</button>
                            )

                        }
                        <button onClick={e => this.props.history.push('/consulta-clientes')} className="btn btn-danger">Cancelar</button>
                    </div>
                </div>
            </Card>
        )
    }
  }
  
  export default withRouter(CadastroCliente)