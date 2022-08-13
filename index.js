let autocomplete;
let nomeDoLugar;
let input = document.getElementById('autocomplete')
let dadosDoLugarClicado
let jsonDaCidadeURL
let nomeDaCidade = sessionStorage.getItem("sessionNomeDaCidade");
let tipoDaTemperatura = "metric"
let tipoDaTemperaturaCont = 0
let jsonDaCidadeGlobal
let jsonDaCidade
let idPaginaAtual = 1

jsonDaCidadeForecastURL = (`https://api.openweathermap.org/data/2.5/forecast?q=${nomeDaCidade}&units=${tipoDaTemperatura}&appid=6f0938ac962003085f29f2dd5cefc18d&lang=pt_br`)
$.getJSON(jsonDaCidadeForecastURL, function(jsonDaCidade){
       
    console.log(jsonDaCidade)
    
})
InsereNomeDaCidade()

function myDate() {
    var dataAtual = new Date();
    var weekdays = new Array(7);
    weekdays[0] = "Dom";
    weekdays[1] = "Seg";
    weekdays[2] = "Ter";
    weekdays[3] = "Qua";
    weekdays[4] = "Qui";
    weekdays[5] = "Sex";
    weekdays[6] = "Sab";

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
    
    parseInt(diaDoMesAtual,10)

    let diaDaSemanaAtualNumero = dataAtual.getDay()
    
    let mesAtual = months[numeroMesAtual]

    for (let indiceDosProximosDias = 1; indiceDosProximosDias < 6; indiceDosProximosDias++){
        document.getElementById(`dia${indiceDosProximosDias}`).innerHTML = weekdays[6] + "," + " " + (diaDoMesAtual + indiceDosProximosDias) + " " + mesAtual
        

    }
    
   

}
myDate()
function InserePrevisaoCincoDias(){
    
    sessionStorage.setItem("sessionNomeDaCidade",nomeDaCidade);
    window.location = ("./previsao5dias.html")

    

    
   



}


function ToggleSeta(){
   
    var elementoSeta = document.getElementById("seta");
    elementoSeta.classList.toggle("d-none")
}
function ToggleAutoComplete(){
    var elementoAutoComplete = document.getElementById("autocomplete");
    elementoAutoComplete.classList.toggle("d-none");  
}


function AlternaPaginas(){

    var elementosAlternaveis = document.getElementsByClassName("alternavel")

    for (const elementoAtual of elementosAlternaveis){
        elementoAtual.classList.toggle("d-none")
    }

    idPaginaAtual++
}
function InsereNomeDaCidade(){
    document.getElementById("nomeCidade").innerHTML = nomeDaCidade
}
function InsereTemperaturas(jsonDaCidade){
    iconeID = jsonDaCidade.weather[0].icon
    
    let estadoDasNuvens = document.getElementById("estadoNuvens")
    estadoDasNuvens.innerHTML = jsonDaCidade.weather[0].description

    jsonDaCidade = jsonDaCidade.main
    let temperatura =  jsonDaCidade.temp
    let temperaturaArredondada = Math.round(temperatura)

    document.getElementById("imagemIcone").src= `http://openweathermap.org/img/wn/${iconeID}@2x.png`
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


    

function TrocaTipoTemperatura(){
    

    tipoDaTemperaturaCont +=1
    if (tipoDaTemperaturaCont % 2 == 0){
        tipoDaTemperatura= "metric"
    }
    else{
        tipoDaTemperatura = "imperial"
    }
    jsonDaCidadeURL = (`https://api.openweathermap.org/data/2.5/weather?q=${nomeDaCidade}&units=${tipoDaTemperatura}&appid=6f0938ac962003085f29f2dd5cefc18d&lang=pt_br`)
    
    $.getJSON(jsonDaCidadeURL, function(jsonDaCidade){
        InsereTemperaturas(jsonDaCidade)
    })
    
}



function handler(){
    AlternaPaginas()

    dadosDoLugarClicado = autocomplete.getPlace()
    nomeDaCidade = dadosDoLugarClicado.address_components[0].long_name
    InsereNomeDaCidade()
    
    jsonDaCidadeURL = (`https://api.openweathermap.org/data/2.5/weather?q=${nomeDaCidade}&units=${tipoDaTemperatura}&appid=6f0938ac962003085f29f2dd5cefc18d&lang=pt_br`)
    
    $.getJSON(jsonDaCidadeURL, function(jsonDaCidade){
        jsonDaCidadeGlobal = jsonDaCidade.main
        console.log(jsonDaCidade)
        InsereTemperaturas(jsonDaCidade)
    })
    

}



function RecebeStringDoInputAutocomplete(){
    nomeDoLugar = input.value
    return nomeDoLugar
}
function initMap(){
  
    options = {
            
        types: [ "locality", "political" ],
        componentRestrictions: {country: 'br'}
     
    };

    autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'),options)

    autocomplete.addListener('place_changed', handler)
   

    }




//console.log(RecebeStringDoInputAutocomplete())