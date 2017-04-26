var tiendas = [];
var ciudades = [];


$.getJSON('json/tiendas.json', cargaTiendas).done(function() {
    $.getJSON('json/ciudades.json', cargaCiudades).done(initMap);
});


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

console.log(ciudades.length);

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

    ciudades.forEach(function(ciudad) {
        if (ciudad["codProv"] == codProv) {
            position = ciudad["position"];
            zoom = ciudad["zoom"];
        }
    });

    var mapOptions =  {
        center: position,
        zoom: zoom,
        mapTypeId: mapTypeId
    };
    
    return mapOptions;
}

function initMap() {
    if (tiendas.length == 0 || ciudades.length == 0) {
        console.log("Ciudades o tiendas es nulo");
        return; 
    }

    var mapOptions = getInitialMapOptions();
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
};

function changeZoom(newZoomLevel) {
    var zoom = map.getZoom();
    var incr = (zoom < newZoomLevel) ? 1 : -1;
    map.setZoom(zoom + incr);
    if (zoom + incr == newZoomLevel) {
        clearInterval(this.timer);
    }
}

this.timer = setInterval(function () {
    changeZoom(14);
}, 300);