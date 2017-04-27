var tiendas = [];
var ciudades = [];
var bounds = [];

/*
$.getJSON('json/tiendas.json', cargaTiendas).done(function() {
    $.getJSON('json/ciudades.json', cargaCiudades).done(initMap);
});
*/

$.getJSON('json/bounds.json', cargaBounds).done(initMap);


function cargaTiendas(json) {
    json.forEach(function (tienda) {
        tiendas.push(tienda);
    });
};

function cargaCiudades(json) {
    json.forEach(function (ciudad) {
        ciudades.push(ciudad);
    });
};

function cargaBounds(json) {
    json.forEach(function (bound) {
        bounds.push(bound);
    });
};

function getInitialMapOptions() {
    // Initial position and zoom
    var position = { lat: 43.362174, lng: -8.414679 };
    var zoom = 7;
    var mapOptions =  {
        center: position,
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    
    return mapOptions;
}

function getMapOptions(listaCiudades, codProv = 15, mapTypeId = google.maps.MapTypeId.SATELLITE) {
    // Initial position and zoom
    var position = { lat: 43.362174, lng: -8.414679 };
    var zoom = 7;

/*    ciudades.forEach(function(ciudad) {
        if (ciudad["codProv"] == codProv) {
            position = ciudad["position"];
            zoom = ciudad["zoom"];
        }
    });*/

    var mapOptions =  {
        center: position,
        zoom: zoom,
        mapTypeId: mapTypeId
    };
    
    return mapOptions;
}

function initMap() {
/*    if (tiendas.length == 0 || ciudades.length == 0) {
        console.log("Ciudades o tiendas es nulo");
        return; 
    }*/

    var mapOptions = getInitialMapOptions();
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
};

function changeBounds(bounds) {
map.fitBounds({
      east: bounds.northEastLng,
      north: bounds.northEastLat,
      south: bounds.southWestLat,
      west: bounds.southWestLng
    });    
}

function changeZoom(newZoomLevel) {
    var zoom = map.getZoom();
    var incr = (zoom < newZoomLevel) ? 1 : -1;
    map.setZoom(zoom + incr);
    if (zoom + incr == newZoomLevel) {
        clearInterval(this.timer);
    }
};

function zoomMap(zoom) {
    this.timer = setInterval(function () {
        changeZoom(zoom);
    }, 300);
};

//window.setTimeout(zoomMap, 3000, 14);
//window.setTimeout(zoomMap, 3000, 7);