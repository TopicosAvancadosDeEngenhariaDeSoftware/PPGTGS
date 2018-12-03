$(function () { 
    $('#filtro_situacao').change(function() {
        $('#carregando_filtro').removeClass('remover');
        buscarIndicadorSituacao();
    });
    buscarIndicadorSituacao();

    $('#discente_nome').keyup(function() {
        buscarIndicadorSituacao();
    });

    $("body").on("click","#excluir", function(){
        var id = $(this).parent().data("id");
        var nome = $(this).parent().data("nome");
        if(confirm("Tem certeza que deseja EXCLUIR/Desativar : "+nome)){
            excluirDiscenteLogicamente(id);
        }
    });

});


function excluirDiscenteLogicamente(id){
    
    $.ajax({ 
        type: "DELETE",
        url: "../json/discentes/"+id,
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

function buscarIndicadorSituacao(){

    var filtro_idSituacao = $('#filtro_situacao').val();
    $('#tabela_discentes').html("<tr><th>PROCURANDO</th></tr>");

    $.ajax({ 
        type: "GET",
        data: {},
        url: "../../json/discentes/situacoes_discente/"+filtro_idSituacao+"/nomes?nome="+$('#discente_nome').val(),
        success: function(result){
            var data1 = document.getElementsByName('yourdata')[0].content;

            //alert(JSON.stringify(result.resultado[0].id_discente));

            $('#tabela_discentes').html("<tr>"+
            "<th>Nome</th>"+
            "<th>Lattes</th>"+
            "<th>Opções</th>"+
            "</tr>");

            var dadosGrafico = new Object();
            dadosGrafico.categorias = [];
            dadosGrafico.dados = [];
            for(var i = 0; i < result.resultado.length; i++){
                var html = "<tr>"+
                "<td>" +result.resultado[i].nome + " " + result.resultado[i].sobrenome + "</td>"+
                "<td> <a href='"+result.resultado[i].link_lattes+"'>"+result.resultado[i].link_lattes+"</td>"+
                "<td data-id='"+result.resultado[i].id_discente+"' data-nome='"+result.resultado[i].nome+"'><a class='btn btn-default' href='/discentes/visualizar?id="+result.resultado[i].id_discente+"&idUser="+data1+"' >Visualizar </a> <a id='alterar' class='btn btn-primary' href='/discentes/alterar?id="+result.resultado[i].id_discente+"&idUser="+data1+"' >Alterar</a> <a class='btn btn-danger' id='excluir' style='margin-left:20px;margin-right:20px;' class='btn btn-danger'>Excluir</a></td>"+
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