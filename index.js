let autocomplete;
let nomeDoLugar;
let input = document.getElementById('autocomplete')

function handler(){
    console.log(autocomplete.getPlace())
}

function RecebeStringDoInputAutocomplete(){
    nomeDoLugar = input.value
    return nomeDoLugar
}
function initMap(){
  
    options = {
            
        types: ['(cities)'],
        componentRestrictions: {country: 'br'}
     
    };

    autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'),options)

    autocomplete.addListener('place_changed', handler)
   

    }




//console.log(RecebeStringDoInputAutocomplete())