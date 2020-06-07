import ApiService from '../apiservice'

class ClienteService extends ApiService{

    constructor(){
        super('/api/clientes')
    }

    salvar(cliente){
        return this.post('/', cliente)
    }
}

export default ClienteService