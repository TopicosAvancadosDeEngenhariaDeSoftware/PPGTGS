$(function () {
    var lista_ocupacoes = [];
    

    $('[data-mask]').inputmask();
    $('.select2').select2();

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

    function verificarPais(){
        atualizarListaEstado();
        if ($('#list_pais').val() == 1) {
            $('#endereco_brasil').removeClass('remover');
            
        }else{
            $('#endereco_brasil').addClass('remover');
            $('#discente_endereco_cep').val("");
            $('#discente_endereco_bairro').val("");
            $('#discente_endereco_logradouro').val("");
            $('#discente_endereco_numresidencia').val("");
        }
    }


    function atualizarListaEstado(){
        var id_pais = $('#list_pais').val();
        $("#list_estado").html("");
        var html = "<option value='-1'>Atualizando...</option>";
        $("#list_estado").append(html);
        $.ajax({ 
            type: "GET",
            data: {},
            url: "../json/paises/"+id_pais+"/estados",
            success: function(result){
                //alert(result);
                $("#list_estado").html("");
                for(var i = 0; i < result.resultado.length; i++){
                    var html = "<option value='"+result.resultado[i].id_estado+"'>"+result.resultado[i].nome+"</option>";
                    $("#list_estado").append(html);
                }
                atualizarListaCidade();
            },
            beforeSend: function(){
                //$('#loading').css({display:"block"});
            },
            complete: function(msg){
                //$('#loading').css({display:"none"});
            },
            error: function(msg){
                alert(JSON.stringify(msg));
            }
        });
    }

    function atualizarListaCidade(){
        var id_estado = $('#list_estado').val();
        //alert(id_estado+"dd");
        if(id_estado == null || undefined) return;
        $("#list_cidade").html("");
        var html = "<option value='-1'>Atualizando...</option>";
        $("#list_cidade").append(html);
        $.ajax({ 
            type: "GET",
            data: {},
            url: "../json/estados/"+id_estado+"/cidades",
            success: function(result){
                //alert(result);
                $("#list_cidade").html("");
                for(var i = 0; i < result.resultado.length; i++){
                    var html = "<option value='"+result.resultado[i].id_cidade+"'>"+result.resultado[i].nome+"</option>";
                    $("#list_cidade").append(html);
                }
                
            },
            beforeSend: function(){
                //$('#loading').css({display:"block"});
            },
            complete: function(msg){
                //$('#loading').css({display:"none"});
            },
            error: function(msg){
                alert(JSON.stringify(msg));
            }
        });
    }

    $('#list_nacionalidade').change(function() {
        verificarNacionalidade();
    });

    $('#list_pais').change(function() {
        verificarPais();
    });

    $('#list_estado').change(function() {
        atualizarListaCidade();
    });
    
    $('#list_instituicoes').change(function() {
        //alert($('#list_instituicoes').val());
        if($('#list_instituicoes').val() == 0){
            $('#nova_instituicao').removeClass('remover');
        }else{
            $('#nova_instituicao').addClass('remover');
        }
    });
    verificarPais();
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
                html = "<tr><td>"+lista_ocupacoes[i].id+"</td><td>"+lista_ocupacoes[i].cargo+"</td><td>["+lista_ocupacoes[i].instituicao.sigla +"] "+lista_ocupacoes[i].instituicao.nome+"</td><td> "+lista_ocupacoes[i].instituicao.tipo_instituicao.nome+" </td> <td><i id='ocupacao_trash_"+lista_ocupacoes[i].id+"' class='fa fa-fw fa-trash pull-right'></i> </td></tr>";
                $("#tabela_ocupacoes").append(html);

                $('#ocupacao_trash_'+lista_ocupacoes[i].id).click(function(){
                    var id = $(this).attr('id');
                    removerListaOcupacoes(id.substring(15));
                });
            }
            html= "</tbody>";
            $("#tabela_ocupacoes").append(html);

        }else{
            var html = "<tr><th> Não há ocupações registradas.</th></tr>";
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

        $('#div_discente_nome').removeClass('has-error');
        $('#err_discente_nome').html("");

        $('#div_discente_sobrenome').removeClass('has-error');
        $('#err_discente_sobrenome').html("");

        $('#div_discente_nascionalidade').removeClass('has-error');
        $('#err_discente_nascionalidade').html("");

        $('#div_discente_sexo').removeClass('has-error');
        $('#err_discente_sexo').html("");

        $('#div_discente_id_pais').removeClass('has-error');
        $('#err_discente_id_pais').html("");

        $('#div_discente_id_cidade').removeClass('has-error');
        $('#err_discente_id_cidade').html("");

        $('#div_discente_cep').removeClass('has-error');
        $('#err_discente_cep').html("");

        $('#div_discente_bairro').removeClass('has-error');
        $('#err_discente_bairro').html("");

        $('#div_discente_logradouro').removeClass('has-error');
        $('#err_discente_logradouro').html("");

        $('#div_discente_num_residencia').removeClass('has-error');
        $('#err_discente_num_residencia').html("");

        $('#div_discente_username').removeClass('has-error');
        $('#err_discente_username').html("");

        $('#div_discente_id_titulo').removeClass('has-error');
        $('#err_discente_id_titulo').html("");

        $('#div_discente_id_orientador').removeClass('has-error');
        $('#err_discente_id_orientador').html("");

        $('#div_discente_email').removeClass('has-error');
        $('#err_discente_email').html("");

        $('#div_discente_senha').removeClass('has-error');
        $('#err_discente_senha').html("");

        $('#div_discente_senha_conf').removeClass('has-error');
        $('#err_discente_senha_conf').html("");

        var obj = new Object();
        obj.nome =  $('#discente_nome').val();
        obj.sobrenome = $('#discente_sobrenome').val();
        obj.data_nascimento = $('#discente_datanascimento').val();
        obj.id_nacionalidade = $('#list_nacionalidade').val();
        obj.telefone = $('#discente_telefone').val();
        if(parseInt(obj.id_nacionalidade) == 1){
            obj.rg = $('#discente_rg').val();
            obj.cpf = $('#discente_cpf').val();
        }else{
            obj.passaporte = $('#discente_passaporte').val();
        }
        obj.id_sexo = $('#list_sexo').val();
        obj.endereco_id_pais = $('#list_pais').val();
        if(obj.endereco_id_pais == 1){
            obj.endereco_id_estado = $('#list_estado').val();
            obj.endereco_id_cidade = $('#list_cidade').val();
            obj.endereco_cep = $('#discente_endereco_cep').val();
            obj.endereco_bairro = $('#discente_endereco_bairro').val();
            obj.endereco_logradouro = $('#discente_endereco_logradouro').val();
            obj.endereco_num_residencia = $('#discente_endereco_numresidencia').val();
            obj.endereco_complemento = $('#discente_endereco_complemento').val();
        }
        obj.username = $('#discente_username').val();
        obj.link_perfil_lattes = $('#discente_linkperfillattes').val();
        obj.id_titulo = $('#list_titulos').val();
        obj.id_orientador = $('#list_docentes').val();
        obj.email = $('#discente_email').val();
        obj.senha = $('#discente_senha').val();
        obj.senha_conf = $('#discente_senha_conf').val();

        var lista_ocup = lista_ocupacoes;
        for(var i = 0; i < lista_ocup.length; i++){
            lista_ocup[i].id = undefined;
            if(lista_ocup[i].id_instituicao != 0){
                lista_ocup[i].instituicao = undefined;
            }else{
                lista_ocup[i].instituicao.tipo_instituicao = undefined;
            }
        }
        obj.ocupacoes = JSON.stringify(lista_ocup);


        $.ajax({ 
            type: "POST",
            data: obj,
            url: "./teste",
            success: function(result){
                //alert(JSON.stringify(result));
                $('#resultado').html(JSON.stringify(result));
            },
            beforeSend: function(){
                //$('#loading').css({display:"block"});
            },
            complete: function(msg){
                //$('#loading').css({display:"none"});
            },
            error: function(msg){
                $('#resultado').html(JSON.stringify(msg.responseJSON.erro));
                if(msg.responseJSON.erro != null && msg.responseJSON.erro != undefined && msg.responseJSON.erro.length > 0 ){

                    for(var i = 0; 0 < msg.responseJSON.erro.length ; i++){
                        if(msg.responseJSON.erro[i].param != undefined && msg.responseJSON.erro[i].param !=  null)
                        switch(msg.responseJSON.erro[i].param){
                            case "nome":
                                $('#div_discente_nome').addClass('has-error');
                                $('#err_discente_nome').html(msg.responseJSON.erro[i].msg);
                                break;
                            case "sobrenome":
                                $('#div_discente_sobrenome').addClass('has-error');
                                $('#err_discente_sobrenome').html(msg.responseJSON.erro[i].msg);
                                break;
                            case "data_nascimento":
                                $('#div_discente_datanascimento').addClass('has-error');
                                $('#err_discente_datanascimento').html(msg.responseJSON.erro[i].msg);
                                break;
                            case "id_nacionalidade":
                                $('#div_discente_nascionalidade').addClass('has-error');
                                $('#err_discente_nascionalidade').html(msg.responseJSON.erro[i].msg);
                                break;
                            case "id_sexo":
                                $('#div_discente_sexo').addClass('has-error');
                                $('#err_discente_sexo').html(msg.responseJSON.erro[i].msg);
                                break;
                            case "endereco_id_pais":
                                $('#div_discente_id_pais').addClass('has-error');
                                $('#err_discente_id_pais').html(msg.responseJSON.erro[i].msg);
                                break;
                            case "endereco_id_cidade":
                                $('#div_discente_id_cidade').addClass('has-error');
                                $('#err_discente_id_cidade').html(msg.responseJSON.erro[i].msg);
                                break;
                            case "endereco_cep":
                                $('#div_discente_cep').addClass('has-error');
                                $('#err_discente_cep').html(msg.responseJSON.erro[i].msg);
                                break;
                            case "endereco_bairro":
                                $('#div_discente_bairro').addClass('has-error');
                                $('#err_discente_bairro').html(msg.responseJSON.erro[i].msg);
                                break;
                            case "endereco_logradouro":
                                $('#div_discente_logradouro').addClass('has-error');
                                $('#err_discente_logradouro').html(msg.responseJSON.erro[i].msg);
                                break;
                            case "endereco_num_residencia":
                                $('#div_discente_num_residencia').addClass('has-error');
                                $('#err_discente_num_residencia').html(msg.responseJSON.erro[i].msg);
                                break;
                            case "username":
                                $('#div_discente_username').addClass('has-error');
                                $('#err_discente_username').html(msg.responseJSON.erro[i].msg);
                                break;
                            case "id_titulo":
                                $('#div_discente_id_titulo').addClass('has-error');
                                $('#err_discente_id_titulo').html(msg.responseJSON.erro[i].msg);
                                break;
                            case "id_orientador":
                                $('#div_discente_id_orientador').addClass('has-error');
                                $('#err_discente_id_orientador').html(msg.responseJSON.erro[i].msg);
                                break;
                            case "email":
                                $('#div_discente_email').addClass('has-error');
                                $('#err_discente_email').html(msg.responseJSON.erro[i].msg);
                                break;
                            case "senha":
                                $('#div_discente_senha').addClass('has-error');
                                $('#err_discente_senha').html(msg.responseJSON.erro[i].msg);
                                break;
                            case "senha_conf":
                                $('#div_discente_senha_conf').addClass('has-error');
                                $('#err_discente_senha_conf').html(msg.responseJSON.erro[i].msg);
                                break;
                        } 
                    }


                }
            }
        });
        
    });
});