import React from 'react'

import { withRouter } from 'react-router-dom'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { mensagemSucesso, mensagemErro } from '../components/toastr'
import ClienteService from '../app/service/clienteService'
import SelectMenu from '../components/selectMenu'
import {cpfMask} from '../components/mask'

class CadastroCliente extends React.Component {

    state = {
        nome: '',
        cpf: '',
        cep: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        uf: '',
        complemento: ''

    }

    /* componentDidMount(){
        const usuarioLogadoString = localStorage.getItem('_usuario_logado')
        const usuarioLogado = JSON.parse(usuarioLogadoString)
    } */

    constructor(){
        super()
        this.service = new ClienteService()
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
                    this.setState({...response.data})
                }).catch(erros => {
                    mensagemErro(erros.response.data)
                })
        }
    }

    cadastrar = () => {
        const msgs = this.validar()

        if(msgs && msgs.length > 0){
            msgs.forEach( (msg, index) => {
                mensagemErro(msg)
            })
            return false
        }

        const cliente = {
            nome: this.state.nome,
            cpf: this.state.cpf,
            cep: this.state.cep,
            logradouro: this.state.logradouro,
            bairro: this.state.bairro,
            cidade: this.state.cidade,
            uf: this.state.uf,
            complemento: this.state.complemento
        }

        this.service.salvar(cliente)
            .then( response => {
                mensagemSucesso('Cliente cadastrado com sucesso!')
                this.props.history.push('/consulta-clientes')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    cancelar = () => {
        this.props.history.push('/consulta-clientes')
    }

    render(){
        const ufs = this.service.obterUfs()
        return (
            <Card title="Cadastro de Cliente">
                 <div className="row">
                    <div className="col-md-4">
                        <FormGroup label="CPF: *" htmlFor="inputCpf">
                            <input type="text"
                                id="inputCpf"
                                className="form-control"
                                maxLength='14'
                                name="cpf"
                                value={this.state.cpf}
                                onChange={e => this.setState({cpf: cpfMask(e.target.value)})} />
                        </FormGroup>
                    </div>
                    <div className="col-md-8">
                        <FormGroup label="Nome: *" htmlFor="inputNome">
                            <input type="text"
                                id="inputNome"
                                className="form-control" 
                                name="nome"
                                onChange={e => this.setState({nome: e.target.value})} />
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
                                onChange={e => this.setState({cep: e.target.value})} />
                        </FormGroup>
                    </div>
                    <div className="col-md-8">
                        <FormGroup label="Logradouro: *" htmlFor="inputLogradouro">
                            <input type="text"
                                id="inputLogradouro"
                                className="form-control" 
                                name="logradouro"
                                onChange={e => this.setState({logradouro: e.target.value})} />
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
                                onChange={e => this.setState({bairro: e.target.value})} />
                        </FormGroup>
                    </div>

                    <div className="col-md-8">
                        <FormGroup label="Cidade: *" htmlFor="inputCidade">
                            <input type="text"
                                id="inputCidade"
                                className="form-control" 
                                name="cidade"
                                onChange={e => this.setState({cidade: e.target.value})} />
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputUf" label="UF: *">
                            <SelectMenu id="inputUf"
                                value={this.state.uf}
                                onChange={e => this.setState({ uf: e.target.value })}
                                className="form-control" 
                                lista={ufs} />
                        </FormGroup>

                    </div>
                    <div className="col-md-8">
                        <FormGroup label="Complemento: " htmlFor="inputComplemento">
                            <input type="text"
                                id="inputComplemento"
                                className="form-control" 
                                name="complemento"
                                onChange={e => this.setState({complemento: e.target.value})} />
                        </FormGroup>
                    </div>
                </div>
                <button onClick={this.cadastrar} className="btn btn-success">Salvar</button>
                <button onClick={this.cancelar} className="btn btn-danger">Cancelar</button>
            </Card>
        )
    }
  }
  
  export default withRouter(CadastroCliente)