let autocomplete;

function initMap(){
    
    options = {
            
        types: ['(cities)'],
        componentRestrictions: {country: 'br'}
     
    };

   

    autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'),options)
    
    
    }
    
        

    

console.log("batata");
