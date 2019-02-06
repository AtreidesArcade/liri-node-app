var env = require("dotenv").config();
var moment = require("moment")
var axios = require("axios");
var keys = require("./keys.js");
var request = require('request');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var inquirer = require("inquirer");
var textFile = "log.txt";
var input = process.argv;
var action = input[2];
var inputs = input[3];



switch (action) {
	case "concert-this":
	axios(inputs);
	break;

    case "spotify-this-song":
    spotify(inputs);
	break;

	case "movie-this":
	movie(inputs);
	break;

	case "do-what-it-says":
	doit();
	break;
};
/*
function concertThis(inputs) {
  var artist = inputs;
  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&tracker_count=10";
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      body = JSON.parse(body);
      for (var event in body) {
        display("Venue: ", body[event].venue.name);
        display("Location: ", body[event].venue.city + ", " + body[event].venue.region + ", " + body[event].venue.country);
        var m = moment(body[event].datetime).format('MM/DD/YYYY, h:mm a').split(", ");
        display("Date: ", m[0]);
        display("Time: ", m[1]);
        contentAdded();
      }
    }
  });
}
*/
function spotify(inputs) {

	var spotify = new Spotify(keys.spotifyKeys);
		if (!inputs){
        	inputs = 'The Sign';
    	}
		spotify.search({ type: 'track', query: inputs }, function(err, data) {
			if (err){
	            console.log('Error occurred: ' + err);
	            return;
	        }

	        var songInfo = data.tracks.items;
	        console.log("Artist(s): " + songInfo[0].artists[0].name);
	        console.log("Song Name: " + songInfo[0].name);
	        console.log("Preview Link: " + songInfo[0].preview_url);
	        console.log("Album: " + songInfo[0].album.name);
	});
}


function movie(inputs) {

	var queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=f9ffc791";

	request(queryUrl, function(error, response, body) {
		if (!inputs){
        	inputs = 'Mr Nobody';
    	}
		if (!error && response.statusCode === 200) {

		    console.log("Title: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		    console.log("Country: " + JSON.parse(body).Country);
		    console.log("Language: " + JSON.parse(body).Language);
		    console.log("Plot: " + JSON.parse(body).Plot);
		    console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
};

function doit() {
	fs.readFile('random.txt', "utf8", function(error, data){

		if (error) {
    		return console.log(error);
  		}

		// Then split it by commas (to make it more readable)
		var dataArr = data.split(",");

		// Each command is represented. Because of the format in the txt file, remove the quotes to run these commands. 
		if (dataArr[0] === "spotify-this-song") {
			var songcheck = dataArr[1].slice(1, -1);
			spotify(songcheck);
        } 
         else if(dataArr[0] === "movie-this") {
			var movie_name = dataArr[1].slice(1, -1);
			movie(movie_name);
		} 
		
  	});

};

