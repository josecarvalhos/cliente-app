import ApiService from '../apiservice'

class ClienteService extends ApiService{

    constructor(){
        super('/api/clientes')
    }

    obterUfs(){
        return [
            { label: 'Selecione...', value: ''},
            { label: 'AC', value: 'AC'},
            { label: 'AL', value: 'AL'},
            { label: 'AM', value: 'AM'},
            { label: 'AP', value: 'AP'},
            { label: 'BA', value: 'BA'},
            { label: 'CE', value: 'CE'},
            { label: 'DF', value: 'DF'},
            { label: 'ES', value: 'ES'},
            { label: 'GO', value: 'GO'},
            { label: 'MA', value: 'MA'},
            { label: 'MG', value: 'MG'},
            { label: 'MT', value: 'MT'},
            { label: 'MS', value: 'MS'},
            { label: 'PA', value: 'PA'},
            { label: 'PB', value: 'PB'},
            { label: 'PE', value: 'PE'},
            { label: 'PI', value: 'PI'},
            { label: 'PR', value: 'PR'},
            { label: 'RJ', value: 'RJ'},
            { label: 'RN', value: 'RN'},
            { label: 'RO', value: 'RO'},
            { label: 'RR', value: 'RR'},
            { label: 'RS', value: 'RS'},
            { label: 'SC', value: 'SC'},
            { label: 'SP', value: 'SP'},
            { label: 'TO', value: 'TO'},
            { label: 'SE', value: 'SE'}
        ]
    }

    obterPorId(id){
        return this.get(`/${id}`)
    }

    salvar(cliente){
        return this.post('/', cliente)
    }

    consultar(clienteFiltro){
        let params = ``
        if(clienteFiltro.cpf){
            params = `${params}/comParametro?cpf=${clienteFiltro.cpf}`
        }

        return this.get(params)
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

    atualizar(cliente){
        return this.put(`/${cliente.id}`, cliente)
    }
    
}

export default ClienteService