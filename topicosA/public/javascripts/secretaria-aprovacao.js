$(function () { 

    /*$('#filtro_situacao').change(function() {
        $('#carregando_filtro').removeClass('remover');
        buscarIndicadorSituacao();
    });*/

    consultarPendentes();


    $("body").on("click","#aprovar", function(){
        var id = $(this).parent().data("id");
        aprovarDiscente(id);
    });

    $("body").on("click","#excluir", function(){
        var id = $(this).parent().data("id");
        var nome = $(this).parent().data("nome");
        if(confirm("Tem certeza que deseja EXCLUIR: "+nome)){
            excluirDiscente(id);
        }
    });

});

function aprovarDiscente(id){
    
    $.ajax({ 
        type: "PUT",
        url: "../json/secretaria/aprovar/"+id,
        success: function(result){
            console.log(result);
            alert("Aprovado!");
            consultarPendentes();
        },
        beforeSend: function(){
        },
        complete: function(msg){
        },
        error: function(msg){
            console.log(msg);
            alert("Erro :/ \n Contatar o suporte.");
        }
    });
}


function excluirDiscente(id){
    
    $.ajax({ 
        type: "DELETE",
        url: "../json/discentes/excluir/"+id,
        success: function(result){
            console.log(result);
            alert("Excluido!");
            consultarPendentes();
        },
        beforeSend: function(){
        },
        complete: function(msg){
        },
        error: function(msg){
            console.log(msg);
            alert("Erro :/ \n Contatar o suporte.");
        }
    });
}

function consultarPendentes(){

    //pendentes (ainda não aprovados)
    status = 0;

    $('#tabela_discentes').html("<tr>"+
        "<th>Nome</th>"+
        "<th>Email</th>"+
        "<th>Lattes</th>"+
        "<th></th>"+
        "</tr>");

    $.ajax({ 
        type: "GET",
        data: {},
        url: "../../json/secretaria/consultar/status/"+status,
        success: function(result){

            for(var i = 0; i < result.resultado.length; i++){
                var html = "<tr>"+
                "<td>" +result.resultado[i].nome + " " + result.resultado[i].sobrenome + "</td>"+
                "<td>" + result.resultado[i].email + "</td>"+
                "<td> <a href='"+result.resultado[i].link_lattes+"'>"+result.resultado[i].link_lattes+"</td>"+
                "<td data-id='"+result.resultado[i].id_discente+"' data-nome='"+result.resultado[i].nome+"'> <a class='btn btn-default' href='/discentes/visualizar?id="+result.resultado[i].id_discente+"' >Visualizar </a><a id='aprovar' style='margin-left:20px;margin-right:20px;' class='btn btn-primary' >Aprovar</a> <a id='excluir' style='margin-left:20px;margin-right:20px;' class='btn btn-danger'>Excluir</a>  </td>"+
                "</tr>";
                $('#tabela_discentes').append(html);
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