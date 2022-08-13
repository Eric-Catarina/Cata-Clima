
let autocomplete;
let nomeDoLugar;
let input = document.getElementById('autocomplete')
let dadosDoLugarClicado
let jsonDaCidadeURL
let nomeDaCidade = sessionStorage.getItem("sessionNomeDaCidade");
let tipoDaTemperatura = "metric"
let tipoDaTemperaturaCont = 0
let jsonDaCidade
let idPaginaAtual = 1

var watchID = navigator.geolocation.watchPosition(function(position) {
    do_something(position.coords.latitude, position.coords.longitude);
  }
  );
  
jsonDaCidadeForecastURL = (`https://api.openweathermap.org/data/2.5/forecast?q=${nomeDaCidade}&units=${tipoDaTemperatura}&appid=6f0938ac962003085f29f2dd5cefc18d&lang=pt_br`)
$.getJSON(jsonDaCidadeForecastURL, function (jsonDaCidade) {

    InsereIconeCincoDias(jsonDaCidade)
    InsereNuvensCincoDias(jsonDaCidade)
    InsereMaxEMinCincoDias(jsonDaCidade)


})
InsereNomeDaCidade()

function InsereDataCincoDias() {
    var dataAtual = new Date();
    var weekdays = new Array(7);
    weekdays[0] = "Dom";
    weekdays[1] = "Seg";
    weekdays[2] = "Ter";
    weekdays[3] = "Qua";
    weekdays[4] = "Qui";
    weekdays[5] = "Sex";
    weekdays[6] = "Sab";
    weekdays[7] = "Dom";
    weekdays[8] = "Seg";
    weekdays[9] = "Ter";
    weekdays[10] = "Qua";
    weekdays[11] = "Qui";
    weekdays[12] = "Sex";

    let months = new Array(12);
    months[0] = "Jan";
    months[1] = "Fev";
    months[2] = "Mar";
    months[3] = "Abr";
    months[4] = "Mai";
    months[5] = "Jun";
    months[6] = "Jul";
    months[7] = "Ago";
    months[8] = "Set";
    months[9] = "Out";
    months[10] = "Nov";
    months[11] = "Dez";

    let diaDoMesAtual = dataAtual.getDate()
    let numeroMesAtual = dataAtual.getMonth()


    let diaDaSemanaAtualNumero = dataAtual.getDay()

    let mesAtual = months[numeroMesAtual]

    for (let indiceDosProximosDias = 1; indiceDosProximosDias < 6; indiceDosProximosDias++) {

        document.getElementById(`dia${indiceDosProximosDias}`).innerHTML = weekdays[(diaDaSemanaAtualNumero + indiceDosProximosDias)] + "," + " " + (diaDoMesAtual + indiceDosProximosDias) + " " + mesAtual

    }
}
InsereDataCincoDias()

function InsereIconeCincoDias(jsonDaCidade) {
    for (let indiceDosProximosDias = 1; indiceDosProximosDias < 6; indiceDosProximosDias++) {
        idIconeAtual = jsonDaCidade.list[indiceDosProximosDias * 7].weather[0].icon
        document.getElementById(`icone${indiceDosProximosDias}`).src = `http://openweathermap.org/img/wn/${idIconeAtual}@2x.png`
    }
}

function InsereNuvensCincoDias(jsonDaCidade) {

    for (let indiceDosProximosDias = 1; indiceDosProximosDias < 6; indiceDosProximosDias++) {
        estadoNuvensAtual = (idIconeAtual = jsonDaCidade.list[indiceDosProximosDias * 7].weather[0].description)
        document.getElementById(`estadoNuvens${indiceDosProximosDias}`).innerHTML = estadoNuvensAtual
    }

}
function InsereMaxEMinCincoDias(jsonDaCidade){
    for (let indiceDosProximosDias = 1; indiceDosProximosDias < 6; indiceDosProximosDias++) {
        tempMinAtual = (jsonDaCidade.list[indiceDosProximosDias*7].main.temp_min)
        tempMaxAtual = (jsonDaCidade.list[indiceDosProximosDias*7].main.temp_max)

        tempMinAtualArrendondada = Math.round(tempMinAtual)
        tempMaxAtualArrendondada = Math.round(tempMaxAtual)

        document.getElementById(`tempMin${indiceDosProximosDias}`).innerHTML = tempMinAtualArrendondada + "°"
        document.getElementById(`tempMax${indiceDosProximosDias}`).innerHTML = tempMaxAtualArrendondada + "°"

    }
}

function InserePrevisaoCincoDias() {

    sessionStorage.setItem("sessionNomeDaCidade", nomeDaCidade);
    window.location = ("./previsao5dias.html")

}

function ToggleSeta() {

    var elementoSeta = document.getElementById("seta");
    elementoSeta.classList.toggle("d-none")
}
function ToggleAutoComplete() {
    var elementoAutoComplete = document.getElementById("autocomplete");
    elementoAutoComplete.classList.toggle("d-none");
}

function AlternaPaginas() {

    var elementosAlternaveis = document.getElementsByClassName("alternavel")

    for (const elementoAtual of elementosAlternaveis) {
        elementoAtual.classList.toggle("d-none")
    }

    idPaginaAtual++
}
function InsereNomeDaCidade() {
    document.getElementById("nomeCidade").innerHTML = nomeDaCidade
}
function InsereTemperaturas(jsonDaCidade) {
    iconeID = jsonDaCidade.weather[0].icon

    let estadoDasNuvens = document.getElementById("estadoNuvens")
    estadoDasNuvens.innerHTML = jsonDaCidade.weather[0].description

    jsonDaCidade = jsonDaCidade.main
    let temperatura = jsonDaCidade.temp
    let temperaturaArredondada = Math.round(temperatura)

    document.getElementById("imagemIcone").src = `http://openweathermap.org/img/wn/${iconeID}@2x.png`
    elementoDoIcone = document.getElementById("imagemIcone")
    document.getElementById("temperatura").innerHTML = temperaturaArredondada + "°"
    document.getElementById("temperatura").appendChild(elementoDoIcone)


    let temperaturaMinima = (jsonDaCidade.temp_min) - 1
    let temperaturaMinimaArredondada = Math.round(temperaturaMinima)
    document.getElementById("min").innerHTML = temperaturaMinimaArredondada + "°"

    let temperaturaMaxima = (jsonDaCidade.temp_max) + 1
    let temperaturaMaximaArredondada = Math.round(temperaturaMaxima)
    document.getElementById("max").innerHTML = temperaturaMaximaArredondada + "°"
}

function TrocaTipoTemperatura() {

    tipoDaTemperaturaCont += 1
    if (tipoDaTemperaturaCont % 2 == 0) {
        tipoDaTemperatura = "metric"
    }
    else {
        tipoDaTemperatura = "imperial"
    }
    jsonDaCidadeURL = (`https://api.openweathermap.org/data/2.5/weather?q=${nomeDaCidade}&units=${tipoDaTemperatura}&appid=6f0938ac962003085f29f2dd5cefc18d&lang=pt_br`)

    $.getJSON(jsonDaCidadeURL, function (jsonDaCidade) {
        InsereTemperaturas(jsonDaCidade)
    })

}

function handler() {
    AlternaPaginas()

    dadosDoLugarClicado = autocomplete.getPlace()
    nomeDaCidade = dadosDoLugarClicado.address_components[0].long_name
    InsereNomeDaCidade()

    jsonDaCidadeURL = (`https://api.openweathermap.org/data/2.5/weather?q=${nomeDaCidade}&units=${tipoDaTemperatura}&appid=6f0938ac962003085f29f2dd5cefc18d&lang=pt_br`)

    $.getJSON(jsonDaCidadeURL, function (jsonDaCidade) {
        console.log(jsonDaCidade)
        InsereTemperaturas(jsonDaCidade)
    })

}

function RecebeStringDoInputAutocomplete() {
    nomeDoLugar = input.value
    return nomeDoLugar
}
function initMap() {

    options = {

        types: ["locality", "political"],
        componentRestrictions: { country: 'br' }

    };

    autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), options)
    autocomplete.addListener('place_changed', handler)
}


