// require npm modules
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var inquirer = require('inquirer');
var keys = require('./keys.js');
var fs = require('fs');

// twitter init
var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.access_token_secret
});

var command = process.argv[2];
var term = process.argv.slice(3).toString().replace(/,/g, " ");

var commands = {
  "my-tweets": function() {
    // inquirer.prompt([
    //   {
    //     type: 'input',
    //     message: 'Enter the screen name of the user whose tweets you want to read:',
    //     name: 'userName'
    //   }
    // ]).then(function(input) {
    // var screenName = input.userName;
    // console.log(screenName);
    client.get('favorites/list', {q: 'anything'}, function(error, tweets, response) {
      console.log(tweets);
    })
  // })
  },
  'spotify-this-song': function(song) {
    if(!song) {
      spotify.lookup({type: 'track', id: '5cqOT57zWW0omoS2znfZz8'}, function(err, data) {
        if(err) {
          return console.log(err);
        }

        console.log('\n\n--------------------------------------------');
        console.log("Nothing");
        console.log('--------------------------------------------');
        console.log('Artist: '+data.artists[0].name);
        console.log('Album: '+data.album.name);
        console.log('Preview: '+data.preview_url);
        console.log('Listen: '+data.external_urls.spotify+'\n\n')
      })
    } else {
      spotify.search({type: 'track', query: song}, function(err, data) {
          if(err) {
            return console.log(err);
          }

          console.log('\n\n--------------------------------------------');
          console.log(song.toUpperCase());
          console.log('--------------------------------------------');
          console.log('Artist: '+data.tracks.items[0].artists[0].name);
          console.log('Album: '+data.tracks.items[0].album.name);
          console.log('Preview: '+data.tracks.items[0].preview_url);
          console.log('Hear it: '+data.tracks.items[0].external_urls.spotify+'\n\n');
      })
    }
  },
  "movie-this": function(title) {
    if(!title) {
      title = "Mr. Nobody";
    }
    var url = "http://www.omdbapi.com/?t="+title+"&plot=short";

    request(url, function(error, response, body) {
      if(error) {
        return console.log(error);
      }

      var body = JSON.parse(response.body);

      console.log('\n\n--------------------------------------------');
      console.log(title.toUpperCase());
      console.log('--------------------------------------------');
      console.log('Year: '+body.Year);
      console.log('Rated: '+body.Rated);
      console.log('Country: '+body.Country);
      console.log('Language: '+body.Language);
      console.log('Plot: '+body.Plot);
      console.log('Actors: '+body.Actors);
      console.log('IMDB Rating: '+body.imdbRating+'\n\n');
    })
  },
  "do-what-it-says": function() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
      var random = data.split(',');
      var toDo = random[0];
      var term = random[1].trim();

      commands[toDo](term);
    })
  }
}

commands[command](term);
