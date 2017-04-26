    function changeMap() {
      if (!ne || !sw) {
        var bounds = map.getBounds();
        ne = bounds.getNorthEast();
        sw = bounds.getSouthWest();
      }

      var ne_marker = new google.maps.Marker({
        position: {
          lat: ne.lat(),
          lng: ne.lng()
        },
        map: map,
        title: 'Norh East'
      });
      var sw_marker = new google.maps.Marker({
        position: {
          lat: sw.lat(),
          lng: sw.lng()
        },
        map: map,
        title: 'South West'
      });

      var newLat = sw.lat() - 0.3;
      var newLong = ne.lng() + 0.45;

      ne = new google.maps.LatLng({
        lat: ne.lat(),
        lng: newLong
      });
      sw = new google.maps.LatLng({
        lat: newLat,
        lng: sw.lng()
      });
      var newBounds = new google.maps.LatLngBounds(sw, ne);

      var ne_newMarker = new google.maps.Marker({
        position: {
          lat: ne.lat(),
          lng: ne.lng()
        },
        map: map,
        title: 'New Norh East'
      });
      var sw_newMarker = new google.maps.Marker({
        position: {
          lat: sw.lat(),
          lng: sw.lng()
        },
        map: map,
        title: 'New South West'
      });

      map.fitBounds(newBounds);

      step = step + 1;

      if (step == 10) {
        clearInterval(this.timer);
      }
    }
    this.timer = setInterval(function () {
      changeMap()
    }, 300);