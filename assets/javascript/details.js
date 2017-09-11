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
    if (details.images.image != null) {
        console.log(details.images.image);
        var imgUrl = details.images.image.medium.url;
        $("#imageEvent").attr("src", imgUrl);
    } else {
        details.images.image == null;
        eventDiv.append('<img id="imageEvent" src="assets/image/nophotoavailable.png"/>');

    }




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