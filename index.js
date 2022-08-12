
let autocomplete;
let nomeDoLugar;
let input = document.getElementById('autocomplete')
let dadosDoLugarClicado
let jsonDaCidadeURL
let nomeDaCidade

function ToggleSeta(){
    var elementoSeta = document.getElementById("seta");
    elementoSeta.classList.toggle("d-none")
}
function ToggleAutoComplete(){
    var elementoAutoComplete = document.getElementById("autocomplete");
    elementoAutoComplete.classList.toggle("d-none");  
}
function ToggleContainerCentralClima(){
    var elementosAlternaveis = document.getElementsByClassName("alternavel")
    
    for (const elementoAtual of elementosAlternaveis){
        elementoAtual.classList.toggle("d-none")
    }

}
function AlternaPaginas(){
    ToggleAutoComplete()
    ToggleSeta()
    ToggleContainerCentralClima()

}

function handler(){
    AlternaPaginas()

    dadosDoLugarClicado = autocomplete.getPlace()
    nomeDaCidade = dadosDoLugarClicado.address_components[0].long_name
    
    jsonDaCidadeURL = (`https://api.openweathermap.org/data/2.5/weather?q=${nomeDaCidade}&appid=6f0938ac962003085f29f2dd5cefc18d`)
    
    $.getJSON(jsonDaCidadeURL, function(jsonDaCidade){

        console.log(jsonDaCidade)
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