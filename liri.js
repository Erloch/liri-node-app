var fs = require("fs");
var Spotify = require("node-spotify-api");
require("dotenv").config();
var keys = require("./keys.js");
var moment = require("moment");
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
// var divider = "\n------------------------------------------------------------\n\n";

// console.log(response.data[0]);
//  liri needs to take these in
//=================================
switch (action) {
    case "concert-this":
        var bands = process.argv.slice(3).join(" ");
       concertThis();
       break;
// write();
    case "spotify-this-song":
        var song = process.argv.slice(3).join(" ");
        // console.log(song)
        spotifyThisSong()
// write();
        // axios.get(search).then(
        //     function (response) {
        //         console.log(response.data);
        //     });
        //      * The album that the song is from

        //    * If no song is provided then your program will default to "The Sign" by Ace of Base.
        break;

    case "movie-this":
        //    var type = process.argv[3];
        var movieName = process.argv.slice(3).join("+");
        movieThis();
        // write();
        break;

    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", function (error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }
            // We will then print the contents of data
            // console.log(data);

            // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");
            if (dataArr[0] === "spotify-this-song") {

                action = dataArr[0];
                song = dataArr[1];
                spotifyThisSong();
            }
            if (dataArr[2] === "movie-this") {

                action = dataArr[2];
                movieName = dataArr[3];
                movieThis();
            }
            if (dataArr[4] === "concert-this") {

                action = dataArr[4];
                bands = dataArr[5];
                movieThis();
            }
            

            // We will then re-display the content as an array for later use.
            // console.log(dataArr);

        });

      break;
    default: "its here";
};
function spotifyThisSong() {

    if (song) {
        spotify
            .search({ type: 'track', query: song, limit: 1 })
            .then(function (response) {
                // console.log(response)
                //      * The song's name
                console.log("\n\n\n\nSong Name: " + response.tracks.items[0].name + "\n\nArtist: " + response.tracks.items[0].artists[0].name + "\n\nAlbum: " + response.tracks.items[0].album.name + "\n\nSpotify Link: " + response.tracks.items[0].external_urls.spotify + "\n\n\n\n");
                //      * Artist(s)
                // console.log("\nArtist: " + response.tracks.items[0].artists[0].name + "\n");
                // //      * The album that the song is from
                // console.log("\nAlbum: " + response.tracks.items[0].album.name + "\n");
                // //      * A preview link of the song from Spotify
                // console.log("\nSpotify Link: " + response.tracks.items[0].external_urls.spotify + "\n\n\n\n");
            }).catch(function (err) {
                console.log(err);
            });
    } else {
        spotify
            .search({ type: 'track', query: "The Sign", limit: 7 })
            .then(function (response) {
                // console.log(response.tracks.items[5])
                //      * The song's name
                console.log("\n\n\n\nSong Name: " + response.tracks.items[5].name + "\n\nArtist: " + response.tracks.items[5].artists[0].name + "\n\nAlbum: " + response.tracks.items[5].album.name + "\n\nSpotify Link: " + response.tracks.items[5].external_urls.spotify + "\n\n\n\n");
                // //      * Artist(s)
                // console.log();
                // //      * The album that the song is from
                // console.log("\nAlbum: " + response.tracks.items[5].album.name + "\n");
                // //      * A preview link of the song from Spotify
                // console.log(");
                fs.appendFile("log.txt", "\n\n\n\nSong Name: " + response.tracks.items[5].name + "\n\nArtist: " + response.tracks.items[5].artists[0].name + "\n\nAlbum: " + response.tracks.items[5].album.name + "\n\nSpotify Link: " + response.tracks.items[5].external_urls.spotify + "\n\n\n\n", function(err) {

                    // If an error was experienced we will log it.
                    if (err) {
                      console.log(err);
                    }
                  
                    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                    else {
                      console.log("Content Added!");
                    }
                  
                  });


            }).catch(function (err) {
                console.log(err);
            });
    }
};

function movieThis() {
    if (movieName) {

        var query = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

        axios.get(query).then(
            function (response) {
                // console.log(response.data)
                //    * Title of the movie.
                console.log("\n\n\nMovie Info:\n\nTitle: " + response.data.Title + "\n\nDate Released: " + response.data.Released + "\n\nIMDB Rating: " + response.data.Ratings[0].Value + "\n\nRoten Tomato Rating: " + response.data.Ratings[1].Value + "\n\nCountry of production: " + response.data.Country + "\n\nLanguage of movie: " + response.data.Language + "\n\nPolt: " + response.data.Plot + "\n\nActors: " + response.data.Actors + "\n\n\n\n\n");

                fs.appendFile("log.txt", "\n\nMovie Info:\n\nTitle: " + response.data.Title + "\n\nDate Released: " + response.data.Released + "\n\nIMDB Rating: " + response.data.Ratings[0].Value + "\n\nRoten Tomato Rating: " + response.data.Ratings[1].Value + "\n\nCountry of production: " + response.data.Country + "\n\nLanguage of movie: " + response.data.Language + "\n\nPolt: " + response.data.Plot + "\n\nActors: " + response.data.Actors + "\n\n\n\n\n", function(err) {

                    // If an error was experienced we will log it.
                    if (err) {
                      console.log(err);
                    }
                  
                    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                    else {
                      console.log("Content Added!");
                    }
                  
                  });
            });
    } else {
        var query = "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy";

        axios.get(query).then(
            function (response) {
                // console.log(response.data)
                //    * Title of the movie.
                console.log("\n\n\nMovie Info:\n\nTitle: " + response.data.Title + "\n\nDate Released: " + response.data.Released + "\n\nIMDB Rating: " + response.data.Ratings[0].Value + "\n\nRoten Tomato Rating: " + response.data.Ratings[1].Value + "\n\nCountry of production: " + response.data.Country + "\n\nLanguage of movie: " + response.data.Language + "\n\nPolt: " + response.data.Plot + "\n\nActors: " + response.data.Actors + "\n\n\n\n\n");

                fs.appendFile("log.txt", "\n\n\nMovie Info:\n\nTitle: " + response.data.Title + "\n\nDate Released: " + response.data.Released + "\n\nIMDB Rating: " + response.data.Ratings[0].Value + "\n\nRoten Tomato Rating: " + response.data.Ratings[1].Value + "\n\nCountry of production: " + response.data.Country + "\n\nLanguage of movie: " + response.data.Language + "\n\nPolt: " + response.data.Plot + "\n\nActors: " + response.data.Actors + "\n\n\n\n\n", function(err) {

                    // If an error was experienced we will log it.
                    if (err) {
                      console.log(err);
                    }
                  
                    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                    else {
                      console.log("Content Added!");
                    }
                  
                  });
            });
    }
};
function concertThis(){
    var search = "https://rest.bandsintown.com/artists/" + bands + "/events?app_id=codingbootcamp";
    axios.get(search).then(
        function (response) {
            console.log("\n\n\nConcert Info:\n\nVenue: " + response.data[0].venue.name + "\n\nLocation: " + response.data[0].venue.city + ", " + response.data[0].venue.country + "\n\nDate: " + moment(response.data[0].datetime).format('MM DD YYYY') + "\n\n\n\n\n");

            fs.appendFile("log.txt", "Concert Info:\n\nVenue: " + response.data[0].venue.name + "\n\nLocation: " + response.data[0].venue.city + ", " + response.data[0].venue.country + "\n\nDate: " + moment(response.data[0].datetime).format('MM DD YYYY') + "\n\n\n\n\n", function(err) {

                // If an error was experienced we will log it.
                if (err) {
                  console.log(err);
                }
              
                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                  console.log("Content Added!");
                }
              
              });
        });

}
// function write(){
//     fs.appendFile("log.txt", devider + , function(err) {

//         // If an error was experienced we will log it.
//         if (err) {
//           console.log(err);
//         }
      
//         // If no error is experienced, we'll log the phrase "Content Added" to our node console.
//         else {
//           console.log("Content Added!");
//         }
      
//       });
// }
    //=========================