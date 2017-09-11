loadEventDetails("E0-001-106248383-8")

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
    $("#titleRow").text(details.title);
    $("#eventDescription").after(details.description);

    var startTime = details.start_time;
    var formattedTime = moment(startTime).format('MMMM Do YYYY, h:mm a');
    var dateTime = $("<h3>").text(formattedTime)
    $("#startTime").after(dateTime);

    var region = details.region;
    var city = details.city;
    var pFive = $("<h4>").text(city + ", " + region);
    $("#eventDetails").after(pFive);

    var address = details.address;
    var pThree = $("<h4>").text(address);
    $("#eventDetails").after(pThree);

    var price = details.price;
    var pOne = $("<h4>").text(price);
    $("#eventDetails").after(pOne);

    var venue = details.venue_name;
    var pTwo = $("<H3>").text(venue);
    $("#eventDetails").after(pTwo);

    var imgUrl = details.images.image[0].medium.url;
    $("#imageEvent").attr("src", imgUrl);


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