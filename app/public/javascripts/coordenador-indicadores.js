$(function () { 

    buscarIndicadorNumeroAlunosPorInstituicao();
    buscarIndicadorNumeroAlunosPorCargo();
    buscarIndicadorNumeroAlunosPorTipoInstituicao();



});

function buscarIndicadorNumeroAlunosPorTipoInstituicao(){

    $.ajax({ 
        type: "GET",
        data: {},
        url: "../../json/discentes/tipos_instituicoes_discente/total",
        success: function(result){
            //alert(JSON.stringify(result));

            var obj_privada = new Object();
            var obj_publica = new Object();

            for(var i = 0; i < result.resultado.length; i++){
                if(result.resultado[i].total_tipo_instituicao_discente.tipo_instituicao_discente.idTipoInstituicao == 2){
                    obj_privada.count = result.resultado[i].total_tipo_instituicao_discente.total;
                }else{
                    obj_publica.count = result.resultado[i].total_tipo_instituicao_discente.total;
                }
            }

            var soma = obj_privada.count + obj_publica.count;
            $('#privada_indicador_por').text((""+ (obj_privada.count / soma * 100)));
            $('#privada_indicador_text').text(""+ obj_privada.count+" discentes de instituições privadas");

            $('#publica_indicador_por').text((""+ (obj_publica.count / soma * 100)));
            $('#publica_indicador_text').text(""+ obj_publica.count+" discentes de instituições publicas");

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


function buscarIndicadorNumeroAlunosPorCargo(){

    $.ajax({ 
        type: "GET",
        data: {},
        url: "../../json/discentes/cargos/total",
        success: function(result){
            //alert(JSON.stringify(result));

            var dadosGrafico = new Object();
            dadosGrafico.categorias = [];
            dadosGrafico.dados = [];
            for(var i = 0; i < result.resultado.length; i++){
                dadosGrafico.categorias.push(result.resultado[i].total_cargo_discente.cargo_discente.nome);
                dadosGrafico.dados.push(result.resultado[i].total_cargo_discente.total);
            }

            grafico_indicador_cargo_aluno(dadosGrafico);
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


/*function buscarIndicador(){

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


}*/

function grafico_indicador_cargo_aluno(dadosGrafico){


    Highcharts.chart('container_cargoAtual', {
    chart: {
      type: 'column'
    },
    title: {
      text: ""
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

function grafico_indicador_instituicao_aluno(dadosGrafico){


  Highcharts.chart('container', {
  chart: {
    type: 'column'
  },
  title: {
    text: ""
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