import LocalStorageService from './localstorageService'

    export const USUARIO_LOGADO = '_usuario_logado'

    export default class AuthService{

        static isUsuarioAutenticado(){
            const usurio = LocalStorageService.obterItem(USUARIO_LOGADO)
            return usurio && usurio.id
        }
    
        static removerUsuarioAutenticado(){
            LocalStorageService.removerItem(USUARIO_LOGADO)
        }

        static logar(usuario){
            LocalStorageService.adicionarItem(USUARIO_LOGADO, usuario)
        }

        static obterUsuarioAutenticado(){
            return LocalStorageService.obterItem(USUARIO_LOGADO)
        }

    }

