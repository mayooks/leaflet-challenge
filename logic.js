// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";



  d3.json(queryUrl).then(function (data) {
        var earthquakeData = data.features
            var earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function(feature,latlng){
          return L.circleMarker(latlng)
        },
        onEachFeature: onEachFeature,
        style: styleInfo,

      });

        // Create the base layers.
      var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

      // styleInfo
      function styleInfo(feature) {
        return {
          radius: getRadius(feature.properties.mag**2.5),
       color: getColor(feature.geometry.coordinates[2]),
        fillOpacity: 0.75,

        }
      }

      // Get color function
      function getColor(altitude) {
          switch (true){
              case altitude > 90:
                  return '#ffffb2';
              case altitude > 70:
                  return '#fed976';
              case altitude > 50:
                  return '#feb24c';
              case altitude > 30:
                  return '#fd8d3c';
              case altitude > 10:
                  return '#f03b20';
              case altitude <=10:
                  return "#bd0026"

          }

      };




      // Get Radius function
       function getRadius(magnitude) {return magnitude
         }

       // Run the onEachFeature function once for each piece of data in the array.
        var earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function(feature,latlng){
        return L.circleMarker(latlng)
         },
         onEachFeature: onEachFeature,
            style: styleInfo,

        });



        // Give each feature a popup that describes the place and time of the earthquake.
        function onEachFeature(feature, layer) {
        layer.bindPopup(`<h2>${feature.properties.place}</h2><h3>magnitude ${feature.properties.mag}</h3><h3>Depth ${feature.geometry.coordinates[2]}</h3><hr><p>${new Date(feature.properties.time)}</p>`);

        }

        // Send our earthquakes layer to the createMap function/
        var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      });

      // Create a baseMaps object.
      var baseMaps = {
        "Street Map": street,
        "Topographic Map": topo
      };


      // Create an overlay object to hold our overlay.
      var overlayMaps = {
        Earthquakes: earthquakes
      };


      // Create a layer control.
      // Pass it our baseMaps and overlayMaps.
      // Add the layer control to the map.
      L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);

        var legend = L.control({position:"bottom right"});

        console.log("map " + myMap)

        legend.onAdd = function () {
            var div = L.DomUtil.create("div", "info legend");

            var grades = [0, 10, 30, 50, 70, 90];
            var colors = [
              "#98ee00",
              "#d4ee00",
              "#eecc00",
              "#ee9c00",
              "#ea822c",
              "#ea2c2c"
            ];

            // Looping through our intervals to generate a label with a colored square for each interval.
            for (var i = 0; i < grades.length; i++) {
          div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
          + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }
        return div;
      };

        legend.addTo(myMap);
});