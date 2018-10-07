$(function () {
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
    
    verificarPais();
    verificarNacionalidade();
    
});