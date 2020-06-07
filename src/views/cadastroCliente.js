import React from 'react'

import { withRouter } from 'react-router-dom'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { mensagemSucesso, mensagemErro } from '../components/toastr'
import ClienteService from '../app/service/clienteService'

class CadastroCliente extends React.Component {

    state = {
        nome: '',
        cpf: '',
        cep: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        uf: ''

    }

    /* componentDidMount(){
        const usuarioLogadoString = localStorage.getItem('_usuario_logado')
        const usuarioLogado = JSON.parse(usuarioLogadoString)
    } */

    constructor(){
        super()
        this.service = new ClienteService()
    }

    cadastrar = () => {
        const cliente = {
            nome: this.state.nome,
            cpf: this.state.cpf,
            cep: this.state.cep,
            logradouro: this.state.logradouro,
            bairro: this.state.bairro,
            cidade: this.state.cidade,
            uf: this.state.uf
        }

        this.service.salvar(cliente)
            .then( response => {
                mensagemSucesso('Cliente cadastrado com sucesso!')
                this.props.history.push('/home')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    cancelar = () => {
        this.props.history.push('/home')
    }

    render(){
      return (
        <Card title="Cadastro de Cliente">
            <div className="row">
                <div className="col-lg-12">
                    <div className="bs-component">
                        <FormGroup label="Nome: *" htmlFor="inputNome">
                            <input type="text"
                                id="inputNome"
                                className="form-control" 
                                name="nome"
                                onChange={e => this.setState({nome: e.target.value})} />
                        </FormGroup>

                        <FormGroup label="CPF: *" htmlFor="inputCpf">
                            <input type="text"
                                id="inputCpf"
                                className="form-control" 
                                name="cpf"
                                onChange={e => this.setState({cpf: e.target.value})} />
                        </FormGroup>

                        <FormGroup label="CEP: *" htmlFor="inputCep">
                            <input type="text"
                                id="inputCep"
                                className="form-control" 
                                name="cep"
                                onChange={e => this.setState({cep: e.target.value})} />
                        </FormGroup>

                        <FormGroup label="Logradouro: *" htmlFor="inputLogradouro">
                            <input type="text"
                                id="inputLogradouro"
                                className="form-control" 
                                name="logradouro"
                                onChange={e => this.setState({logradouro: e.target.value})} />
                        </FormGroup>

                        <FormGroup label="Bairro: *" htmlFor="inputBairro">
                            <input type="text"
                                id="inputBairro"
                                className="form-control" 
                                name="bairro"
                                onChange={e => this.setState({bairro: e.target.value})} />
                        </FormGroup>

                        <FormGroup label="Cidade: *" htmlFor="inputCidade">
                            <input type="text"
                                id="inputCidade"
                                className="form-control" 
                                name="cidade"
                                onChange={e => this.setState({cidade: e.target.value})} />
                        </FormGroup>

                        <FormGroup label="UF: *" htmlFor="inputUf">
                            <input type="text"
                                id="inputUf"
                                className="form-control" 
                                name="uf"
                                onChange={e => this.setState({uf: e.target.value})} />
                        </FormGroup>

                        <FormGroup label="Complemento: *" htmlFor="inputComplemento">
                            <input type="text"
                                id="inputComplemento"
                                className="form-control" 
                                name="complemento"
                                onChange={e => this.setState({complemento: e.target.value})} />
                        </FormGroup>
                        <button onClick={this.cadastrar} className="btn btn-success">Salvar</button>
                        <button onClick={this.cancelar} className="btn btn-danger">Cancelar</button>
                    </div>
                </div>
            </div>
        </Card>
      )
    }
  }
  
  export default withRouter(CadastroCliente)