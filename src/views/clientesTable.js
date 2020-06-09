import React from 'react'
import LocalStorageService from '../app/service/localstorageService'

export const usurioLogado = LocalStorageService.obterItem('_usuario_logado')

export default props => {

    const rows = props.clientes.map( cliente => {
        return(
            <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.cep}</td>
                <td>{cliente.logradouro}</td>
                <td>{cliente.bairro}</td>
                <td>{cliente.cidade}</td>
                <td>{cliente.uf}</td>
                <td>{cliente.complemento}</td>
                { usurioLogado.perfil === 'comum' ? 
                    (
                        <td></td>
                    ) : (
                        <td>
                            <button type="button"
                                className="btn btn-primary" 
                                onClick={e => props.editAction(cliente.id)}>Editar</button>
                            <button type="button" 
                            className="btn btn-danger"
                            onClick={e => props.deleteAction(cliente)}>Deletar</button>
                        </td> 
                    )

                }
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">CPF</th>
                    <th scope="col">CEP</th>
                    <th scope="col">Logradouro</th>
                    <th scope="col">Bairro</th>
                    <th scope="col">Cidade</th>
                    <th scope="col">UF</th>
                    <th scope="col">Complemento</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}