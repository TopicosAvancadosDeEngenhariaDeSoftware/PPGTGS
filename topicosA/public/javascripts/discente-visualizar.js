
$(function () {
    var lista_ocupacoes = [];
    $('[data-mask]').inputmask();
    $('.select2').select2();
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    var idUser = urlParams.get('idUser');
    $.ajax({ 
        type: "GET",
        data: {},
        url: "../json/discentes/"+id,
        success: function(result){
           //alert(JSON.stringify(result.resultado.tipo_discente[0].id_tipo_discente));
           $("#discente_nome").val( result.resultado.nome);
           $("#discente_sobrenome").val(result.resultado.sobrenome);
           var data_nascimento = new Date(result.resultado.data_nascimento);
           if (!isNaN(data_nascimento.getTime())) {
                let month = String(data_nascimento.getMonth() + 1);
                let day = String(data_nascimento.getDate());
                const year = String(data_nascimento.getFullYear());
                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;
                $("#discente_datanascimento").val(`${day}/${month}/${year}`);
           }
           $("#discente_rg").val(result.resultado.rg);
           $("#discente_cpf").val(result.resultado.cpf);
           $("#discente_passaporte").val(result.resultado.passaporte);
           $("#discente_telefone").val(result.resultado.telefone);
           $("#discente_username").val(result.resultado.username);
           $("#discente_linkperfillattes").val(result.resultado.link_lattes);
           $("#discente_email").val(result.resultado.email);
           $("#list_docentes").val(result.resultado.id_docente).change();
           $("#discente_senha").val(result.resultado.senha);
           $("#list_nacionalidade").val(result.resultado.id_nacionalidade).change();
           $("#list_sexo").val(result.resultado.sexo).change();
           $("#list_titulos").val(result.resultado.id_titulo).change();
           $("#list_tipos_discente").val(result.resultado.tipo_discente[0].id_tipo_discente).change();
           $("#situacao_discentes").val(result.resultado.situacao).change();
           for(var j=0;j<result.resultado.lista_ocupacoes.length;j++){
            var ocupacao = new Object();
            ocupacao.cargo = result.resultado.lista_ocupacoes[j].cargo.nome_cargo
            ocupacao.id_instituicao = result.resultado.lista_ocupacoes[j].cargo.instituicao.id_instituicao;
            if(ocupacao.id_instituicao == 0){
            var instituicao = new Object();
            instituicao.nome = result.resultado.lista_ocupacoes[j].cargo.instituicao.nome_instituicao;
            instituicao.sigla =result.resultado.lista_ocupacoes[j].cargo.instituicao.sigla_intituicao;
            instituicao.id_tipo_instituicao = result.resultado.lista_ocupacoes[j].cargo.instituicao.tipo_instituicao;
            
            for(var i = 0;i < lista_tipo_instituicao.length; i++){
                if(lista_tipo_instituicao[i].id == instituicao.id_tipo_instituicao){
                    instituicao.tipo_instituicao = lista_tipo_instituicao[i];
                }
            }
            ocupacao.instituicao = instituicao;
            }else{
                for(var i = 0;i < lista_instituicao.length; i++){
                    if(lista_instituicao[i]._id_instituicao == ocupacao.id_instituicao){
                        var obj = new Object();
                        obj.id_instituicao = lista_instituicao[i]._id_instituicao;
                        obj.nome = lista_instituicao[i]._nome;
                        obj.sigla = lista_instituicao[i]._sigla;
                        obj.tipo_instituicao = lista_instituicao[i]._tipo_instituicao;
                        ocupacao.instituicao = obj;
                }
            }
        }
        lista_ocupacoes.push(ocupacao);
    }
        var isOkay = true;
        if(ocupacao.cargo == null || ocupacao.cargo == undefined || ocupacao.cargo.length < 2){
            $('#div_add_ocupacao_cargo').addClass('has-error');
            $('#erro_add_ocupacao_cargo').html("Cargo é obrigatório.");
            isOkay = false;
        }
        if(ocupacao.id_instituicao == 0){
            if(ocupacao.instituicao.nome == null || ocupacao.instituicao.nome== undefined || ocupacao.instituicao.nome.length < 2){
                $('#div_add_instituicao_nome').addClass('has-error');
                $('#erro_add_instituicao_nome').html("Nome da instituição é obrigatório.");
                isOkay = false;
            }
        }

        if(isOkay == false) return;
        atualizarListaOcupacoes();
           
        },
        beforeSend: function(){
            //$('#loading').css({display:"block"});
        },
        complete: function(msg){
            //$('#loading').css({display:"none"});
        },
        error: function(msg){
            //alert(JSON.stringify(msg));
        }
    });
    function verificarNacionalidade(){
        if ($('#list_nacionalidade').val() == 1) {
            $('#card_discente_cpf').removeClass('remover');
            $('#card_discente_rg').removeClass('remover');
            $('#card_discente_passaporte').addClass('remover');
            $('#card_discente_passaporte').val("");
        }else{
            $('#card_discente_rg').addClass('remover');
            $('#card_discente_rg').val("");
            $('#card_discente_cpf').addClass('remover');
            $('#card_discente_cpf').val("");
            $('#card_discente_passaporte').removeClass('remover');
        }
    }  
    $('#list_nacionalidade').change(function() {
        verificarNacionalidade();
    });

  
    $('#list_instituicoes').change(function() {
        //alert($('#list_instituicoes').val());
        if($('#list_instituicoes').val() == 0){
            $('#nova_instituicao').removeClass('remover');
        }else{
            $('#nova_instituicao').addClass('remover');
        }
    });
    verificarNacionalidade();

    $('#button_add_ocupacao').click(function(){
        $(this).addClass('remover');
        $('#div_add_ocupacao').removeClass('remover');
    });
    $('#button_add_ocupacao_lista_fechar').click(function(){
        $('#add_ocupacao_cargo').val("");
        
        $('#add_instituicao_nome').val("");
        $('#add_instituicao_sigla').val("");

        $('#button_add_ocupacao').removeClass('remover');
        $('#div_add_ocupacao').addClass('remover');
    });

    function removerListaOcupacoes(id_ocupacao_remover){
        //alert(id_ocupacao_remover);
        var nova_lista_ocupacoes = [];
        for(var i = 0; i < lista_ocupacoes.length;i++){
            
            if(lista_ocupacoes[i].id != id_ocupacao_remover){
                nova_lista_ocupacoes.push(lista_ocupacoes[i]);
            }
        }
        //alert(JSON.stringify(nova_lista_ocupacoes));
        lista_ocupacoes = null;
        lista_ocupacoes = nova_lista_ocupacoes;
        atualizarListaOcupacoes();
    }

    function atualizarListaOcupacoes(){
        //alert("oi");
        $("#tabela_ocupacoes").html("");
        
        
        if(lista_ocupacoes.length > 0){
            var html = "<tbody><tr><th>Nº</th><th>Cargo</th><th>Instituição</th><th>Tipo</th></tr>";
            $("#tabela_ocupacoes").append(html);
            for(var i = 0; i < lista_ocupacoes.length; i++){
                lista_ocupacoes[i].id = i + 1;
                html = "<tr><td>"+lista_ocupacoes[i].id+"</td><td>"+lista_ocupacoes[i].cargo+"</td><td>["+lista_ocupacoes[i].instituicao.sigla +"] "+lista_ocupacoes[i].instituicao.nome+"</td><td> "+lista_ocupacoes[i].instituicao.tipo_instituicao.nome+" </td></tr>";
                $("#tabela_ocupacoes").append(html);

                $('#ocupacao_trash_'+lista_ocupacoes[i].id).click(function(){
                    var id = $(this).attr('id');
                    removerListaOcupacoes(id.substring(15));
                });
            }
            html= "</tbody>";
            $("#tabela_ocupacoes").append(html);

        }else{
            //var html = "<tr><th> Não há ocupações registradas.</th></tr>";
            $("#tabela_ocupacoes").append(html);
        }
        $('#tabela_ocupacoes').removeClass('table');
        $('#tabela_ocupacoes').removeClass('table-hover');
        
        $('#tabela_ocupacoes').addClass('table');
        $('#tabela_ocupacoes').addClass('table-hover');
    }

    $('#button_add_ocupacao_lista_salvar').click(function(){

        $('#div_add_ocupacao_cargo').removeClass('has-error');
        $('#erro_add_ocupacao_cargo').html("");

        $('#div_add_instituicao_nome').removeClass('has-error');
        $('#erro_add_instituicao_nome').html("");

        var ocupacao = new Object();
        ocupacao.cargo = $('#add_ocupacao_cargo').val();
        ocupacao.id_instituicao = $('#list_instituicoes').val();
        if(ocupacao.id_instituicao == 0){
            var instituicao = new Object();
            instituicao.nome = $('#add_instituicao_nome').val();
            instituicao.sigla = $('#add_instituicao_sigla').val();
            instituicao.id_tipo_instituicao = $('#list_tipo_instituicoes').val();
            for(var i = 0;i < lista_tipo_instituicao.length; i++){
                if(lista_tipo_instituicao[i].id == instituicao.id_tipo_instituicao){
                    instituicao.tipo_instituicao = lista_tipo_instituicao[i];
                }
            }
            ocupacao.instituicao = instituicao;
        }else{
            
            for(var i = 0;i < lista_instituicao.length; i++){
                if(lista_instituicao[i]._id_instituicao == ocupacao.id_instituicao){
                    var obj = new Object();
                    obj.id_instituicao = lista_instituicao[i]._id_instituicao;
                    obj.nome = lista_instituicao[i]._nome;
                    obj.sigla = lista_instituicao[i]._sigla;
                    obj.tipo_instituicao = lista_instituicao[i]._tipo_instituicao;
                    ocupacao.instituicao = obj;
                }
            }
        }

        var isOkay = true;
        if(ocupacao.cargo == null || ocupacao.cargo == undefined || ocupacao.cargo.length < 2){
            $('#div_add_ocupacao_cargo').addClass('has-error');
            $('#erro_add_ocupacao_cargo').html("Cargo é obrigatório.");
            isOkay = false;
        }
        if(ocupacao.id_instituicao == 0){
            if(ocupacao.instituicao.nome == null || ocupacao.instituicao.nome== undefined || ocupacao.instituicao.nome.length < 2){
                $('#div_add_instituicao_nome').addClass('has-error');
                $('#erro_add_instituicao_nome').html("Nome da instituição é obrigatório.");
                isOkay = false;
            }
        }

        if(isOkay == false) return;
        lista_ocupacoes.push(ocupacao);
        //console.log(JSON.stringify(lista_ocupacoes));
        atualizarListaOcupacoes();
        $('#add_ocupacao_cargo').val("");
        
        $('#add_instituicao_nome').val("");
        $('#add_instituicao_sigla').val("");

        $('#button_add_ocupacao').removeClass('remover');
        $('#div_add_ocupacao').addClass('remover');
    });

    atualizarListaOcupacoes();
    
    $('#button_cadastrar').click(function(){
        if(idUser == 2 || idUser==5) 
                    window.location.replace("/discentes/filtro");
        else if(idUser==3) 
                    window.location.replace("/discentes/visualizar?id='"+id+"'");
    
    });
});

     

