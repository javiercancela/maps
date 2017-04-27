var bounds = [];
var step = 1;
const totalSteps = 5;

$.getJSON('json/bounds.json', cargaBounds).done(initMap);

function cargaBounds(json) {
    json.forEach(function (bound) {
        bounds.push(bound);
    });
};


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        disableDefaultUI: true,        
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });


    map.fitBounds({
      east: 121.803980,
      north: 70.293986,
      south: -47.088287,
      west: -167.795973
    });
};

function calculateStepBounds(coor1, coor0) {
    return coor1 + (coor0 - coor1) * step /totalSteps;
}

function calculateBounds() {
    var stepBound =     {
      "northEast":  {
          "lat": calculateStepBounds(bounds[1].northEast.lat, bounds[0].northEast.lat),
          "lng": calculateStepBounds(bounds[1].northEast.lng, bounds[0].northEast.lng)
        },
      "southWest":  {
          "lat": calculateStepBounds(bounds[1].southWest.lat, bounds[0].southWest.lat),
          "lng": calculateStepBounds(bounds[1].southWest.lng, bounds[0].southWest.lng)
        }
    };

    return stepBound;
}

function changeBounds() {

/*    if (step == totalSteps) {
        clearInterval(this.timer);
        return;
    }

    var stepBound = calculateBounds();*/
    step++;
    const idx = (step % 12);
    bound = bounds[idx];

    map.fitBounds({
      east: bound.northEast.lng,
      north: bound.northEast.lat,
      south: bound.southWest.lat,
      west: bound.southWest.lng
    });    
/*
    var ne = new google.maps.LatLng({
        lat: stepBound.northEast.lat,
        lng: stepBound.northEast.lng
    });
    var sw = new google.maps.LatLng({
        lat: stepBound.southWest.lat,
        lng: stepBound.southWest.lng
    });

    var marker1 = new google.maps.Marker({
          position: ne,
          map: map
        });
    var marker2 = new google.maps.Marker({
          position: sw,
          map: map
        });*/
};

this.timer = setInterval(function () {
    changeBounds()
}, 4000);

