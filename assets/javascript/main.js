// Initialize Firebase 
var config = {
    apiKey: "AIzaSyDx7w0AdjWIHAawYuRdcOfOCSi3KM6evXo",
    authDomain: "cwrucbproject.firebaseapp.com",
    databaseURL: "https://cwrucbproject.firebaseio.com",
    projectId: "cwrucbproject",
    storageBucket: "",
    messagingSenderId: "1056549983679"
};
firebase.initializeApp(config);
var database = firebase.database()
// return false; 

//  Created a firebase event listner for adding user data to database 
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    var email = childSnapshot.val().email;
    $("#emailSubmit").on("click", function(event) {
        event.preventDefault();
        var emailSubmit = $("#emailSubmit").val().trim();
        // uploads user inputed data to the database
        database.ref().push(email.submitInfo);
        console.log(email.submitInfo);
    });
});

var randomCities = ["Cleveland", "Pittsburgh", "Chicago", "Detroit", "San Antonio", "Los Angeles"];
var randomKeywords = ["comedy", "concerts", "conferences", "festivals", "food", "family", "nightlife", "sports"];

var generateRandomCity = function() {
    return randomCities[Math.floor(Math.random() * randomCities.length)];
};
var randomCity = generateRandomCity();

var generateRandomKeyword = function() {
    return randomKeywords[Math.floor(Math.random() * randomKeywords.length)];
};
var randomKeyword = generateRandomKeyword();

eventSearch(randomCity, randomKeyword);

$("#submitInfo").on("click", function(event) {
    event.preventDefault();

    var eventLocation = $("#eventLocation").val().trim();
    var eventKeywords = $("#categoriesDropDown :selected").text();
    var eventDate = $("#dateDropDown :selected").text();

    console.log(eventDate);
    eventSearch(eventLocation, eventKeywords, eventDate);
    var event = {
        location: eventLocation,
        keywords: eventKeywords,
        date: eventDate
    };
});
//for search querys
function eventSearch(location, keywords, date) {
    $("#searchLocation").text(location);
    var searchQueryParams = {
        location: location,
        keywords: keywords,
        date: date,
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
        } else {
            events[i].image == null;
            eventDiv.append('<img id="theImage" src="assets/image/nophotoavailable.png"/>');
        }
        if (events[i].title != null) {
            var title = events[i].title;
            var pHeader = $("<H2>").text(title);
            eventDiv.append(pHeader);
        }
        if (events[i].start_time != null) {
            var startTime = events[i].start_time;
            var formattedTime = moment(startTime).format('MMMM Do YYYY, h:mm a');
            var pFive = $("<H4>").text(formattedTime);
            eventDiv.append(pFive);
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
        if (events[i].city_name != null && events[i].region_name != null) {
            var city = events[i].city_name;
            var region = events[i].region_name;
            var pThree = $("<p>").text(city + ", " + region);
            eventDiv.append(pThree);
        }

        //  var button = $("<input type='button'>").addClass("choose-button").text("more details");
        //  eventDiv.append(button);

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