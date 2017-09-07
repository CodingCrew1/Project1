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


    var price = details.price
    var pOne = $("<p>").text(price);
    $("#eventDetails").after(pOne);

    var venue = details.venue_name
    var pTwo = $("<H4>").text(venue);
    $("#eventDetails").after(pTwo);


}