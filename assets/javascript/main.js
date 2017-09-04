$("#submitInfo").on("click", function(event) {
    event.preventDefault();

    var eventLocation = $("#eventLocation").val().trim();
    var eventKeywords = $("#eventKeywords").val().trim();
    eventSearch(eventLocation, eventKeywords);
    var event = {
        location: eventLocation,
        keywords: eventKeywords
    };
});
//for search querys
function eventSearch(location, keywords) {
    $("#searchLocation").text(location);
    var searchQueryParams = {
        location: location,
        keywords: keywords,
        app_key: "3wKwrHtr35ZbcRWR"
    }
    EVDB.API.call("/events/search", searchQueryParams, function(data) {
        updateSearchResults(data.events.event);
    });
}

function updateSearchResults(events) {
    $("#searchResultsRow").empty();
    console.log(events);
    var loopCount = 4;
    if (events.length < loopCount) {
        loopCount = events.length;
    }
    for (i = 0; i < loopCount; i++) {
        var eventDiv = $("<div class='event col-lg-3 col-md-4 col-sm-6 portfolio-item'>" + "<br />");
        console.log(events[i]);
        if (events[i].image != null) {
            var imgUrl = events[i].image.medium.url;
            var image = $("<img>").attr("src", imgUrl);
            eventDiv.append(image);
        }
         if (events[i].title != null) {
            var venue = events[i].title;
            var pHeader = $("<H2>").text(venue);
            eventDiv.append(pHeader);
        }
        if (events[i].venue_name != null) {
            var venue = events[i].venue_name;
            var pOne = $("<p>").text(venue);
            eventDiv.append(pOne);
        }
        if (events[i].venue_address != null) {
            var address = events[i].venue_address;
            var pTwo = $("<p>").text(address);
            eventDiv.append(pTwo);
        }
        if (events[i].city_name != null) {
            var city = events[i].city_name;
            var pThree = $("<p>").text(city);
            eventDiv.append(pThree);
        }
        if (events[i].region_name != null) {
            var region = events[i].region_name;
            var pFour = $("<p>").text(region);
            eventDiv.append(pFour);
        }

        $("#searchResultsRow").append(eventDiv);

    }
}








//for featured events
/*var eventQueryParams = {
     id: "E0-001-106248383-8",
     app_key: "3wKwrHtr35ZbcRWR"
 }


EVDB.API.call("/events/get", eventQueryParams, function(data) {
     console.log(data); 
 });*/