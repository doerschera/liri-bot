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
    var songInfo =[];

    if(!song) {
      spotify.lookup({type: 'track', id: '5cqOT57zWW0omoS2znfZz8'}, function(err, data) {
        if(err) {
          return console.log(err);
        }
        songInfo.push('NOTHING');
        songInfo.push(data.artists[0].name);
        songInfo.push(data.album.name);
        songInfo.push(data.preview_url);
        songInfo.push(data.external_urls.spotify);

        writeSong();
        writeToLog(songInfo);
      })
    } else {
      spotify.search({type: 'track', query: song}, function(err, data) {
          if(err) {
            return console.log(err);
          }

          var dataPath = data.tracks.items[0];
          songInfo.push(song.toUpperCase());
          songInfo.push(dataPath.artists[0].name);
          songInfo.push(dataPath.album.name);
          songInfo.push(dataPath.preview_url);
          songInfo.push(dataPath.external_urls.spotify);

          writeSong();
          writeToLog(songInfo);
      })
    }

    function writeSong() {
      console.log('\n\n--------------------------------------------');
      console.log(songInfo[0]);
      console.log('--------------------------------------------');
      console.log('Artist: '+songInfo[1]);
      console.log('Album: '+songInfo[2]);
      console.log('Preview: '+songInfo[3]);
      console.log('Hear it: '+songInfo[4]+'\n\n');
    }
  },
  "movie-this": function(title) {
    var movieInfo = [];
    if(!title) {
      title = "Mr. Nobody";
    }
    var url = "http://www.omdbapi.com/?t="+title+"&plot=short";

    request(url, function(error, response, body) {
      if(error) {
        return console.log(error);
      }

      var body = JSON.parse(response.body);
      movieInfo.push(title.toUpperCase());
      movieInfo.push(body.Year);
      movieInfo.push(body.Rated);
      movieInfo.push(body.Country);
      movieInfo.push(body.Language);
      movieInfo.push(body.Plot);
      movieInfo.push(body.Actors);
      movieInfo.push(body.imdbRating);

      console.log('\n\n--------------------------------------------');
      console.log(movieInfo[0]);
      console.log('--------------------------------------------');
      console.log('Year: '+movieInfo[1]);
      console.log('Rated: '+movieInfo[2]);
      console.log('Country: '+movieInfo[3]);
      console.log('Language: '+movieInfo[4]);
      console.log('Plot: '+movieInfo[5]);
      console.log('Actors: '+movieInfo[6]);
      console.log('IMDB Rating: '+movieInfo[7]+'\n\n');

      writeToLog(movieInfo);
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

function writeToLog(array) {
  fs.appendFile('log.txt', array+'\n\n', function(err) {
    if(err) {
      console.log(err);
    }
  })
}
