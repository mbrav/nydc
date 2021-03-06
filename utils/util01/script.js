console.log("Lenght: " + farmerMarkets.length);
for (var i = 0; i < farmerMarkets.length; i++) {
  var address = farmerMarkets[i][10];
  var address = farmerMarkets[i][10] + ", " + farmerMarkets[i][8] + ", " + "NY";
  // console.log(address);
}

var geocoder;
var map;

function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(40.88, -73.82);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function codeAddress() {
  var address = document.getElementById('address').value;
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
