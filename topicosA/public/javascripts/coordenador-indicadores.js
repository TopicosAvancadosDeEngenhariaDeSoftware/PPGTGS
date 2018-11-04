$(function () { 

    buscarIndicadorNumeroAlunosPorInstituicao();
        buscarIndicadorNumeroAlunosPorCargo();
        buscarIndicadorNumeroAlunosPorTipoInstituicao();
        buscarIndicadorNumeroAlunosNascionalidade();
        buscarIndicadorNumeroAlunosPorTitulo();
        buscarIndicadorNumeroAlunosPorTipoDiscente();

    $('#filtro_situacao').change(function() {
        $('#carregando_filtro').removeClass('remover');

        

        buscarIndicadorNumeroAlunosPorInstituicao();
        buscarIndicadorNumeroAlunosPorCargo();
        buscarIndicadorNumeroAlunosPorTipoInstituicao();
        buscarIndicadorNumeroAlunosNascionalidade();
        buscarIndicadorNumeroAlunosPorTitulo();
        buscarIndicadorNumeroAlunosPorTipoDiscente();

    });


});

function buscarIndicadorNumeroAlunosPorTipoInstituicao(){

    var filtro_idSituacao = $('#filtro_situacao').val();
    

    $.ajax({ 
        type: "GET",
        data: {},
        url: "../../json/discentes/situacoes_discente/"+filtro_idSituacao+"/tipos_instituicoes_discente/total",
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

            var count_privada = (obj_privada.count / soma * 100);
            if(soma == 0) count_privada = 0;
            $('#privada_indicador_por').text((""+ count_privada));
            $('#privada_indicador_text').text(""+ obj_privada.count+" de instituições privadas");

            var count_publica = (obj_publica.count / soma * 100);
            if(soma == 0) count_publica = 0;
            $('#publica_indicador_por').text((""+ count_publica));
            $('#publica_indicador_text').text(""+ obj_publica.count+" de instituições publicas");

           
            $('#total_indicador_por').text((""+soma));
            //grafico_indicador_instituicao_aluno(dadosGrafico);
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

    var filtro_idSituacao = $('#filtro_situacao').val();

    $.ajax({ 
        type: "GET",
        data: {},
        url: "../../json/discentes/situacoes_discente/"+filtro_idSituacao+"/instituicoes/total",
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
    var filtro_idSituacao = $('#filtro_situacao').val();

    $.ajax({ 
        type: "GET",
        data: {},
        url: "../../json/discentes/situacoes_discente/"+filtro_idSituacao+"/cargos/total",
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


function buscarIndicadorNumeroAlunosNascionalidade(){
    var filtro_idSituacao = $('#filtro_situacao').val();

    $.ajax({ 
        type: "GET",
        data: {},
        url: "../../json/discentes/situacoes_discente/"+filtro_idSituacao+"/paises/total",
        success: function(result){
            //alert(JSON.stringify(result));

            var dadosGrafico = new Object();
            dadosGrafico.categorias = [];
            dadosGrafico.dados = [];
            for(var i = 0; i < result.resultado.length; i++){
                dadosGrafico.categorias.push(result.resultado[i].total_pais_discente.pais_discente.nacionalidade);
                dadosGrafico.dados.push(result.resultado[i].total_pais_discente.total);
            }

            grafico_indicador_nascionalidade(dadosGrafico);
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

function buscarIndicadorNumeroAlunosPorTitulo(){
    var filtro_idSituacao = $('#filtro_situacao').val();
  $.ajax({ 
      type: "GET",
      data: {},
      url: "../../json/discentes/situacoes_discente/"+filtro_idSituacao+"/titulos/total",
      success: function(result){
          //alert(JSON.stringify(result));

          var dadosGrafico = new Object();
          dadosGrafico.dados = [];
          for(var i = 0; i < result.resultado.length; i++){
              dadosGrafico.dados.push({name: result.resultado[i].total_titulo_discente.titulo_discente.nome, y: result.resultado[i].total_titulo_discente.total});
          }
          //alert("oi");
          grafico_indicador_titulos(dadosGrafico);
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

function buscarIndicadorNumeroAlunosPorTipoDiscente(){
    var filtro_idSituacao = $('#filtro_situacao').val();
    $.ajax({ 
        type: "GET",
        data: {},
        url: "../../json/discentes/situacoes_discente/"+filtro_idSituacao+"/tipos_discente/total",
        success: function(result){
            //alert(JSON.stringify(result));
  
            var dadosGrafico = new Object();
            dadosGrafico.dados = [];
            for(var i = 0; i < result.resultado.length; i++){
                dadosGrafico.dados.push({name: result.resultado[i].total_tipo_discente.tipo_discente.nome, y: result.resultado[i].total_tipo_discente.total});
            }
            //alert("oi");
            grafico_indicador_tipodiscente(dadosGrafico);
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

function grafico_indicador_nascionalidade(dadosGrafico){


    Highcharts.chart('container_nascionalidade', {
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

function grafico_indicador_titulos(dadosGrafico){
    
    Highcharts.chart('container_titulos', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: ''
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true
          }
        },
        series: [{
          name: 'Discentes',
          colorByPoint: true,
          data: dadosGrafico.dados
        }]
      });

  }

  function grafico_indicador_tipodiscente(dadosGrafico){
    //console.log(dadosGrafico);
    Highcharts.chart('container_tipodiscente', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: ''
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true
          }
        },
        series: [{
          name: 'Discentes',
          colorByPoint: true,
          data: dadosGrafico.dados
        }]
      });

  }