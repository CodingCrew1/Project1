loadEventDetails("E0-001-106248383-8")

function loadEventDetails(eventId) {

    var eventQueryParams = {
        id: eventId,
        app_key: "3wKwrHtr35ZbcRWR"
    }
    EVDB.API.call("/events/get", eventQueryParams, function(data) {
        console.log(data);
        updateEventDetails(data);
    });

}

function updateEventDetails(details) {
    $("#titleRow").text(details.title);
    $("#eventDescription").after(details.description);

    var startTime = details.start_time;
    var formattedTime = moment(startTime).format('MMMM Do YYYY, h:mm a');
    $("#startTime").after(formattedTime);

    var region = details.region;
    var pFive = $("<H4>").text(region);
    $("#eventDetails").after(pFive);

    var city = details.city;
    var pFour = $("<H4>").text(city);
    $("#eventDetails").after(pFour);

    var address = details.address;
    var pThree = $("<H4>").text(address);
    $("#eventDetails").after(pThree);

    var price = details.price;
    var pOne = $("<h4>").text(price);
    $("#eventDetails").after(pOne);

    var venue = details.venue_name;
    var pTwo = $("<H3>").text(venue);
    $("#eventDetails").after(pTwo);

    var imgUrl = details.images.medium.url;
    var image = $("<img>").attr("src", imgUrl);
    $("#img-event").after(image);
    









};