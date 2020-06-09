import React from 'react'

import { withRouter } from 'react-router-dom'
import Card from '../components/card'
import ClientesTable from '../views/clientesTable'
import ClienteService from '../app/service/clienteService'
import FormGroup from '../components/form-group'
import {Dialog} from 'primereact/dialog'
import {Button} from 'primereact/button'
import * as messages from '../components/toastr'
import LocalStorageService from '../app/service/localstorageService'

class ConsultaClientes extends React.Component{

    state = {
        usurioLogado: LocalStorageService.obterItem('_usuario_logado'),
        cpf: '',
        showConfirmDialog: false,
        clienteDeletar: {},
        clientes: []

    }

    constructor(){
        super()
        this.service = new ClienteService()
    }

    componentDidMount(){
        this.buscar()
    }

    buscar = () => {
        const clienteFiltro = {
            cpf: this.state.cpf
        }

        this.service
            .consultar(clienteFiltro)
            .then( resposta => {
                this.setState({ clientes: resposta.data })
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    prepararFormularioCadastra = () => {
        this.props.history.push('/cadastro-cliente')
    }

    abriConfirmacao = (cliente) => {
        this.setState({ showConfirmDialog: true, clienteDeletar: cliente })
    }

    cancelarDelecao = (cliente) => {
        this.setState({ showConfirmDialog: false, clienteDeletar: {} })
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-cliente/${id}`)
    }

    deletar = () => {
        this.service
            .deletar(this.state.clienteDeletar.id)
            .then(response => {
                const clientes = this.state.clientes
                const index = clientes.indexOf(this.state.clienteDeletar)
                clientes.splice(index, 1)
                this.setState( {clientes: clientes, showConfirmDialog: false} )
                messages.mensagemSucesso('Cliente deletado com sucesso!')
            }).catch(error => {
                messages.mensagemErro('Ocorreu um erro ao deletar o cliente.')
            })
    }

    render(){

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon ="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon ="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        )

        return(
            <Card title="Consulta Clientes">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputCpf" label="CPF: ">
                                <input type="text"
                                    id="inputCpf"
                                    className="form-control"
                                    value={this.state.cpf}
                                    onChange={e => this.setState({cpf: e.target.value})}
                                    placeholder="Digite o CPF" />
                            </FormGroup>
                            <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                            { this.state.usurioLogado.perfil == 'comum' ? 
                                (
                                    ''
                                ) : (
                                    <button onClick={this.prepararFormularioCadastra} type="button" className="btn btn-danger">Cadastrar</button>   
                                )

                            }
                        </div>
                    </div>
                </div>
                
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <ClientesTable clientes={this.state.clientes}
                                           deleteAction={this.abriConfirmacao}
                                           editAction={this.editar} />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Confirmação"
                            visible={this.state.showConfirmDialog}
                            style={{width: '50vw'}}
                            footer={confirmDialogFooter}
                            modal={true}
                            onHide={() => this.setState({showConfirmDialog: false})}>
                        Confirma a deleção deste cliente.
                    </Dialog>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaClientes)