exports.isValidoListaOcupacoes = function(value) {
    //console.log(value);
    try{
        value = JSON.parse(value);
    }catch(e){return false}
    if(value == null || value == undefined) return true;
    if(value.length > 0){
        for(var i = 0; i < value.length; i++){
            if(value[i].cargo == undefined || value[i].cargo == null || value[i].cargo.length < 2){
                //console.log("A");
                return false;
            } 
            if(value[i].id_instituicao == undefined || value[i].id_instituicao == null){
                //console.log("B");
                return false;
            } 
            if(parseInt(value[i].id_instituicao) == 0){
                if(value[i].instituicao == undefined || value[i].instituicao == null){
                    //console.log("C");
                    return false;
                } 
                if(value[i].instituicao.nome == undefined || value[i].instituicao.nome  == null || value[i].instituicao.nome.length < 2) {
                    //console.log("D");
                    return false;
                } 
                if(value[i].instituicao.id_tipo_instituicao == undefined || value[i].instituicao.id_tipo_instituicao  == null) {
                    //console.log("E");
                    return false;
                } 
            } 
        }
    }
    return true;
}