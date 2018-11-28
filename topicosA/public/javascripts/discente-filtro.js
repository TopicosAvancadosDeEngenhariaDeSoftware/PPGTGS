$(function () { 

    $('#filtro_situacao').change(function() {
        $('#carregando_filtro').removeClass('remover');
        buscarIndicadorSituacao();
    });
    buscarIndicadorSituacao();

    $('#discente_nome').keyup(function() {
        buscarIndicadorSituacao();
    });

});

function buscarIndicadorSituacao(){

    var filtro_idSituacao = $('#filtro_situacao').val();
    $('#tabela_discentes').html("<tr><th>PROCURANDO</th></tr>");

    $.ajax({ 
        type: "GET",
        data: {},
        url: "../../json/discentes/situacoes_discente/"+filtro_idSituacao+"/nomes?nome="+$('#discente_nome').val(),
        success: function(result){
            //alert(JSON.stringify(result.resultado[0].id_discente));

            $('#tabela_discentes').html("<tr>"+
            "<th>Nome</th>"+
            "<th>Lattes</th>"+
            "<th>Visualizar/Editar</th>"+
            "</tr>");

            var dadosGrafico = new Object();
            dadosGrafico.categorias = [];
            dadosGrafico.dados = [];
            for(var i = 0; i < result.resultado.length; i++){
                var html = "<tr>"+
                "<td>" +result.resultado[i].nome + " " + result.resultado[i].sobrenome + "</td>"+
                "<td> <a href='"+result.resultado[i].link_lattes+"'>"+result.resultado[i].link_lattes+"</td>"+
                "<td>&nbsp&nbsp<a href='/discentes/visualizar?id="+result.resultado[i].id_discente+"' class='glyphicon glyphicon-eye-open ' TITLE='Visualizar dados do discente'></a>&nbsp&nbsp&nbsp&nbsp<a href= ../discentes/alterar?id="+result.resultado[i].id_discente+" class='glyphicon glyphicon-pencil' TITLE='Alterar dados do discente'></a></td>"+
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