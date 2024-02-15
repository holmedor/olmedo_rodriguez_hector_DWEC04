"use strict";

var datos, total, idcomarca;
var desde = 0;
const intervalo = 10;
var urlgraf = "https://api.euskadi.eus/udalmap/indicators/158?lang=SPANISH";
var urldatos = "https://api.euskadi.eus/udalmap/indicators/158/regions";

////////////////////////////////////////////////////// configuración del gráfico
var optionsChart = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};
class dataset {
    constructor(label, data) {
        this.label = label;
        this.data = data;
        this.backgroundColor = "rgba(75, 192, 192, 0.2)";
        this.borderColor = "rgba(75, 192, 192, 1)";
        this.borderWidth = 1;
    }
}
class dataChart {
    constructor(labels, datasets) {
        this.labels = labels;
        this.datasets = datasets;
    }
}
////////////////////////////////////////////////////// pedirDatosGraficos
function pedirDatosGraficos(miurl) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            //JQUERY
            url: miurl,
            success: function (data) {
                console.log("Pedir datos"); //resuelve la promesa y va al then() de la función
                resolve(data);
            },
            error: function (error) {
                //rechaza la promesa y va al catch() de la función
                reject(error);
            },
        });
    });
}
////////////////////////////////////////////////////// pintarGrafico
function pintarGrafico(data) {
    data.entities.forEach((item) => {
        var mylabels = [];
        var myvalues = [];
        let valores = item.years[0];
        for (var property in valores) {
            console.log("property: ", property);
            console.log(`${property}: ${valores[property]}`);
            mylabels.push(`${property}`);
            myvalues.push(`${valores[property]}`);
        }
        var myDataset = new dataset(item.name, myvalues);
        var myDataSets = [];
        myDataSets.push(myDataset);
        var myDataChart = new dataChart(mylabels, myDataSets);
        const ctx = document.getElementById(item.id).getContext("2d");
        new Chart(ctx, {
            type: "line",
            data: myDataChart,
            options: optionsChart,
        });
    });
}
////////////////////////////////////////////////////// pedirDatos
function pedirDatos(miurl) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            //JQUERY
            url: miurl,
            success: function (data) {
                console.log("Pedir datos");
                //resuelve la promesa y va al then() de la función
                resolve(data);
            },
            error: function (error) {
                //rechaza la promesa y va al catch() de la función
                reject(error);
            },
        });
    });
}
////////////////////////////////////////////////////// pintarDatos
function pintarDatos() {
    console.log("datos: ", datos);
    total = datos.regions.length;
    console.log("total: ", total);
    $("#total").empty();
    $("#total").append(total);
    datos = datos.regions;
    datos.forEach((element) => {
//        console.log("element.id: ", element.id);
//        console.log("element.name: ", element.name);
//        console.log("element.years: ", element.years);
        var mylabels = [];
        var myvalues = [];
        let valores = element.years[0];
        for (var property in valores) {
//            console.log("property: ", property);
//            console.log(`${property}: ${valores[property]}`);
            mylabels.push("<th>" + `${property}` + "</th>");
            myvalues.push("<td>" + `${valores[property]}` + "</td>");
        }
        idcomarca = element.id;
        $("#turismos").append('<div id="titulo">'+element.name+
        '<button onclick="handleButtonClick('+idcomarca+')">'+idcomarca+'</button></div>'+
        '<div id="datos"><table><tr><th></th></tr>'+
            '<tr><td>'+mylabels+'</td></tr>'+
            '<tr><td>'+myvalues +'</td></tr></table></div>'
        );
    });
}
////////////////////////////////////////////////////// handleButtonClick
    function handleButtonClick(buttonName) {
    urldatos = "https://api.euskadi.eus/udalmap/indicators/158/regions/" + buttonName;
    pedirDatos(urldatos)
        .then(function (data) {
            //JS
            //cuando resuelve la promesa ejecuta este codigo
            datos = data;
            console.log(datos);
            pintarGraficoComarcaTurismos(data);
        })
        .catch(function (err) {
            //JS
            //cuando la promesa es rechazada ejecuta este código
            console.log(err);
        });
}
////////////////////////////////////////////////////// pintarGraficoComarcaTurismos
function pintarGraficoComarcaTurismos(data) {
        var newWindowTurismos = window.open('', 'Gráfico comarca', 'width=400, height=300');
        newWindowTurismos.document.write('<html><head><title>Gráfico comarca</title></head><body><h1 id="titulo"></h1><div id="aqui"></div></body></html>');
    var mylabels = [];
    var myvalues = [];
    let valores = data.regions[0].years[0];
    console.log("valores: ",valores);
    for (var property in valores) {
        console.log("property: ", property);
        console.log(`${property}: ${valores[property]}`);
        mylabels.push(`${property}`);
        myvalues.push(`${valores[property]}`);
    }
    let idcomarca=data.regions[0].id;
    console.log("idcomarca: ",idcomarca);
    newWindowTurismos.document.getElementById("titulo").innerHTML = 'Total de turismos entre el total de habitantes de la comarca';
    newWindowTurismos.document.getElementById("aqui").innerHTML = '';
    var ctx = document.createElement('canvas');
    ctx.width = 200;
    ctx.height = 100;
    newWindowTurismos.document.getElementById("aqui").appendChild(ctx);
    var myDataset = new dataset(data.regions[0].name, myvalues);
    var myDataSets = [];
    myDataSets.push(myDataset);
    var myDataChart = new dataChart(mylabels, myDataSets);
    console.log("mylabels: ",mylabels);
    console.log("myvalues: ",myvalues);
    var chart = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: myDataChart,
        options: optionsChart,
    });
}
////////////////////////////////////////////////////// MAIN
console.log("Peticiones AJAX: gráfico vehículos por territorios");
pedirDatosGraficos(urlgraf)
    .then(function (data) {
        //JS
        //cuando resuelve la promesa ejecuta este codigo
        let datosgraf = data;
        console.log(datosgraf);
        pintarGrafico(datosgraf);
    })
    .catch(function (err) {
        //JS
        //cuando la promesa es rechazada ejecuta este código
        console.log(err);
    });
console.log("Peticiones AJAX: datos vehículos por municipios");
pedirDatos(urldatos)
    .then(function (data) {
        //JS
        //cuando resuelve la promesa ejecuta este codigo
        datos = data;
        console.log(datos);
        pintarDatos();
    })
    .catch(function (err) {
        //JS
        //cuando la promesa es rechazada ejecuta este código
        console.log(err);
    });
