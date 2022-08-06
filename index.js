let autocomplete;

function initMap(){
    alert('sim')
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        {
            
            types: ['locality'],
            componentRestrictions: {'country': ['BR']}
         
        });
        }

    

console.log("batata");
