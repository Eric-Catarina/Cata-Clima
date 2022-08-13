
let autocomplete;
let nomeDoLugar;
let input = document.getElementById('autocomplete')
let dadosDoLugarClicado
let jsonDaCidadeURL
let nomeDaCidade
let tipoDaTemperatura = "metric"
let tipoDaTemperaturaCont = 0
let jsonDaCidadeGlobal
let jsonDaCidade

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

    
    console.log(iconeID)
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