
let autocomplete;
let nomeDoLugar;
let input = document.getElementById('autocomplete')
let dadosDoLugarClicado
let jsonDaCidadeURL
let nomeDaCidade

function handler(){
    var elementoAutoComplete = document.getElementById("autocomplete");
    elementoAutoComplete.classList.add("d-none")
    var elementoSeta = document.getElementById("seta");
    
    elementoSeta.classList.toggle("d-none")
    dadosDoLugarClicado = autocomplete.getPlace()
    nomeDaCidade = dadosDoLugarClicado.address_components[0].long_name
    
    jsonDaCidadeURL = (`https://api.openweathermap.org/data/2.5/weather?q=${nomeDaCidade}&appid=6f0938ac962003085f29f2dd5cefc18d`)
    
    $.getJSON(jsonDaCidadeURL, function(jsonDaCidade){

        console.log(jsonDaCidade)
    })
    

}

function Seta(){
    var elementoAutoComplete = document.getElementById("autocomplete");
    var elementoSeta = document.getElementById("seta");
    elementoSeta.classList.toggle("d-none")
    elementoAutoComplete.classList.toggle("d-none");  

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