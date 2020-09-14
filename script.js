function init() {
  const initialPosition = { lat: 59.325, lng: 18.069 };

  const map = new google.maps.Map(document.getElementById('map'), {
    center: initialPosition,
    zoom: 15
  });

  const marker = new google.maps.Marker({ map, position: initialPosition });

         // user's location
  if ('geolocation' in navigator) {
    const location = navigator.geolocation.getCurrentPosition(
      position => {
           
        // Set marker
        marker.setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });

        // Center map to user's position.
        map.panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
       
             marker.addListener("click", () => {
              $("#form")[0].reset();
              $('#myModal').modal('show');
              $('#lang').val(position.coords.longitude);
              $('#lat').val(position.coords.latitude);

              $('#form').submit((e)=>{
                e.preventDefault();
                let name = $('#name').val();
                $('#myModal').modal('hide'); 
                 $("#form")[0].reset();    
                console.log(`Hello ${name} your Longitude is : ${position.coords.longitude} and Latitude is : ${position.coords.latitude} `);
              })

            
            });
      
  



      },
      err => alert(`Error (${err.code}): ${getPositionErrorMessage(err.code)}`)
    );
  } else {
    alert('Geolocation is not supported by your browser.');
  }

  
}