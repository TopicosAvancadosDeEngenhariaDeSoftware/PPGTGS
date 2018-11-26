$(function () { 

    /*$('#filtro_situacao').change(function() {
        $('#carregando_filtro').removeClass('remover');
        buscarIndicadorSituacao();
    });*/

    consultarPendentes();


    $("body").on("click","#aprovar", function(){
        var id = $(this).data("id");
        aprovarDiscente(id);
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
                "<td> <div style='float: right;'>  <a class='btn btn-default' href='/discentes/visualizar?id="+result.resultado[i].id_discente+"' >Visualizar </a><button id='aprovar' style='margin-left:20px;margin-right:20px;' class='btn btn-primary' data-id='"+result.resultado[i].id_discente+"' >Aprovar</button> </div>  </td>"+
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



/*
function buscarIndicadorSituacao(){

    
    $('#tabela_discentes').html("<tr>"+
        "<th>Nome</th>"+
        "<th>Email</th>"+
        "<th>Lattes</th>"+
        "<th></th>"+
        "</tr>");

    $.ajax({ 
        type: "GET",
        data: {},
        url: "../../json/discentes/situacoes_discente/1",
        success: function(result){
            //alert(JSON.stringify(result));

            var dadosGrafico = new Object();
            dadosGrafico.categorias = [];
            dadosGrafico.dados = [];
            for(var i = 0; i < result.resultado.length; i++){
                var html = "<tr>"+
                "<td>" +result.resultado[i].nome + " " + result.resultado[i].sobrenome + "</td>"+
                "<td>" + result.resultado[i].email + "</td>"+
                "<td> <a href='"+result.resultado[i].link_lattes+"'>"+result.resultado[i].link_lattes+"</td>"+
                "<td> <div style='float: right;'>  <a class='btn btn-default' href='/discentes' >Visualizar </a><button id='aprovar' style='margin-left:20px;margin-right:20px;' class='btn btn-primary' data-id='"+result.resultado[i].id_discente+"' >Aprovar</button> </div>  </td>"+
                "</tr>";
                $('#tabela_discentes').append(html);
            }
            

            $('#carregando_filtro').addClass('remover');
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
*/