$(function () { 

    buscarIndicadorNumeroAlunosPorInstituicao();



});


function buscarIndicadorNumeroAlunosPorInstituicao(){

    $.ajax({ 
        type: "GET",
        data: {},
        url: "../../json/discentes/instituicoes/total",
        success: function(result){
            //alert(JSON.stringify(result));

            var dadosGrafico = new Object();
            dadosGrafico.categorias = [];
            dadosGrafico.dados = [];
            for(var i = 0; i < result.resultado.length; i++){
                dadosGrafico.categorias.push(result.resultado[i].total_instituicao.instituicao.sigla);
                dadosGrafico.dados.push(result.resultado[i].total_instituicao.total);
            }

            grafico_indicador_instituicao_aluno(dadosGrafico);
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

function grafico_indicador_instituicao_aluno(dadosGrafico){


  Highcharts.chart('container', {
  chart: {
    type: 'column'
  },
  title: {
    text: "Número de discentes por Instituição"
  },
  xAxis: {
    categories: dadosGrafico.categorias
  },
  subtitle: {
    text: ""
  },
  yAxis: {
    title: {
      text: "Alunos"
    }
  },
  tooltip: {
        enabled: false
    },
  legends: {
    enabled: false
  },
  series: [{
    data: dadosGrafico.dados,
    showInLegend: false,
    colorByPoint: true
  }]
})


}