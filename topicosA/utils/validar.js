exports.isValidoListaOcupacoes = function(value) {
    if(value == null || value == undefined) return true;
    if(value.length > 0){
        for(var i = 0; i < value.length; i++){
            if(value[i].cargo == undefined || value[i].cargo == null || value[i].cargo.length < 2) return false;
            if(value[i].id_instituicao == undefined || value[i].id_instituicao == null) return false;
            if(parseInt(value[i].id_instituicao) == 0){
                if(value[i].instituicao == undefined || value[i].instituicao == null) return false;
                if(value[i].instituicao.nome == undefined || value[i].instituicao.nome  == null || value[i].instituicao.nome.length < 2) return false;
                if(value[i].instituicao.tipo_instituicao == undefined || value[i].instituicao.tipo_instituicao  == null) return false;
            } 
        }
    }
    return true;
}