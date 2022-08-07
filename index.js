let autocomplete;
let geocoder
function initMap(){
    geocoder = new google.maps.Geocoder()
    options = {
            
        types: ['(cities)'],
        componentRestrictions: {country: 'br'}
     
    };

   

    autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'),options)
    
    }
    let trem = new AutocompleteService
    
        

    

console.log(trem.getPlacePredictions());
