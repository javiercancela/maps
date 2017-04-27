var bounds = [];

$.getJSON('json/bounds.json', cargaBounds).done(initMap);

function cargaBounds(json) {
    json.forEach(function (bound) {
        bounds.push(bound);
    });
};


function initMap() {
    const northEastLat = 43.362174;
    const northEastLng = -8.414679;
    const southWestLat = 36.264384;
    const southWestLng = 0.753471;

    ne = new google.maps.LatLng({
        lat: northEastLat,
        lng: northEastLng
    });
    sw = new google.maps.LatLng({
        lat: southWestLat,
        lng: southWestLng
    });

    map = new google.maps.Map(document.getElementById('map'), {
        disableDefaultUI: true,        
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    initialBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(36.264384,0.753471),
        new google.maps.LatLng(43.362174, -8.414679)
    );


    map.fitBounds({ initialBounds });
};

function changeBounds(bounds) {
/*map.fitBounds({
      east: bounds.northEastLng,
      north: bounds.northEastLat,
      south: bounds.southWestLat,
      west: bounds.southWestLng
    });    */
};

