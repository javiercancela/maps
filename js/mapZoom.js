    var map;
    var step = 0;
    var incr = 1;
    var ne;
    var sw;

    function initMap() {
      var coruna = {
        lat: 43.362174,
        lng: -8.414679
      };
      var zoom_coruna = 7;

      map = new google.maps.Map(document.getElementById('map'), {
        center: coruna,
        zoom: zoom_coruna,
        mapTypeId: google.maps.MapTypeId.SATELLITE
      });

      //map.addListener('zoom_changed', zoomChanged);

      //window.setTimeout(map.setZoom(8), 3000);

      /*
              var zara_superco = new google.maps.Marker({
                position:  {lat: 43.354540, lng: -8.402557 },
                map: map,
                title: 'Zara Superco'
              });
              var zara_marineda = new google.maps.Marker({
                position:  {lat:  43.345035, lng: -8.426509 },
                map: map,
                title: 'Zara Marineda'
              });
              var zara_compostela = new google.maps.Marker({
                position:  {lat: 43.366143, lng: -8.405260 },
                map: map,
                title: 'Zara Compostela'
              });
      */
    }

    /*
          function zoomChanged() {
            var zoom = map.getZoom();
            zoom = zoom + incr;
            if (step < 27) {
              map.setZoom(zoom);
            }
            step = step + 1;

            if (step == 6) {
              incr = -incr;
            } else if (step == 13) {
              incr = -incr;
            } else if (step == 20) {
              incr = -incr;
            } 
          }
          */
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