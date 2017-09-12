loadEventDetails(getParameterByName("id"));

function loadEventDetails(eventId) {

    var eventQueryParams = {
        id: eventId,
        app_key: "3wKwrHtr35ZbcRWR"
    }
    EVDB.API.call("/events/get", eventQueryParams, function(data) {

        updateEventDetails(data);
    });

}

function updateEventDetails(details) {
    console.log(details);
    if (details.title != null) {
        $("#titleRow").text(details.title);
    }
    if (details.description != null) {
        $("#eventDescription").after(details.description);
    }
    if (details.start_time != null) {
        var startTime = details.start_time;
        var formattedTime = moment(startTime).format('MMMM Do YYYY, h:mm a');
        var dateTime = $("<h3>").text(formattedTime)
        $("#startTime").after(dateTime);
    }
    if (details.region != null && details.city != null) {
        var region = details.region;
        var city = details.city;
        var pFive = $("<h4>").text(city + ", " + region);
        $("#eventDetails").after(pFive);
    }
    if (details.address != null) {
        var address = details.address;
        var pThree = $("<h4>").text(address);
        $("#eventDetails").after(pThree);
    }
    if (details.price != null) {
        var price = details.price;
        var pOne = $("<h4>").text(price);
        $("#eventDetails").after(pOne);
    }
    if (details.venue_name != null) {
        var venue = details.venue_name;
        var pTwo = $("<H3>").text(venue);
        $("#eventDetails").after(pTwo);
    }
    if (details.images != null) {
        console.log(details.images.image);
        var imgUrl = details.images.image.medium.url;
        $("#imageEvent").attr("src", imgUrl);
    } else {
       $("#imageEvent").attr("src", "assets/image/nophotoavailable.png");

    }

    var latitude = Number(details.latitude);
    var longitude = Number(details.longitude);
};

//found this function on stackoverflow to get values from query string   
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//// begin map portion of page////

var map;
var markers = [];
var infowindow;

// map options
function initMap(){
            //var loc = {lat: position.coords.latitude,lng: position.coords.longitude};
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 39.828127, lng: -98.579404},
                //center:{lat: 41.4993, lng: -81.6944},
                zoom: 3
            });

// new map
function makeMarker(latitude, longitude) {
    var position = {lat: latitude,lng: longitude};
    var marker1 = new google.maps.Marker({position: position, map:map});
 
 markers.push(marker1);
}

            infowindow = new google.maps.InfoWindow();
     
}


// identify type of food to load upon user selection
$(document).ready(function(){
    $("#fast").click(function(){
        deleteMarkers();
        addMarkers("fast food");
    });

    $("#happy").click(function(){
        deleteMarkers();
        addMarkers("happy hour");
    });

    $("#asian").click(function(){
        deleteMarkers();
        addMarkers("asian food");
    });

    $("#italian").click(function(){
        deleteMarkers();
        addMarkers("italian food");
    });

    $("#mex").click(function(){
        deleteMarkers();
        addMarkers("mexican food");
    });

    $("#drunk").click(function(){
        deleteMarkers();
        addMarkers("late night diners");
    });
});

//function callback to Google places webservice for restuarants
function addMarkers(query){
    var service = new google.maps.places.PlacesService(map);
    service.textSearch({
        location: map.getCenter(),
        radius: 500,
        query: [query]
    }, function(results, status){
        if (status === google.maps.places.PlacesServiceStatus.OK){
        for (var i = 0; i < results.length; i++) {
            addMarker(results[i]);
        }
    }
    });
}

function deleteMarkers(){
    for (var i = 0; i < markers.length; i++){
        markers[i].setMap(null);
    }
    markers = [];
}

    //add marker to the map based on latitude & longitude (geometry)
function addMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

    //add info box upon click to markers on map
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent("<img src=\"" + place.icon + "\"> <br><h1>" + place.name + "</h1><p>" + place.formatted_address + "</p>" + "Google Rating: " + place.rating + "</p>");
    infowindow.open(map, this);
  });

  markers.push(marker);
}