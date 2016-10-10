// require npm modules
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var inquirer = require('inquirer');
var keys = require('./keys.js')

// twitter init
var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.access_token_secret
});

var command = process.argv[2];
var title = process.argv.slice(3).toString();

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
      song = "Nothing";
    }

    spotify.search({type: 'track', query: song}, function(err, data) {
        if(err) {
          return console.log(err);
        }

        console.log('\n\n--------------------------------------------');
        console.log(song);
        console.log('--------------------------------------------');
        console.log('Arist: '+data.tracks.items[0].artists[0].name);
        console.log('Album: '+data.tracks.items[0].album.name);
        console.log('Hear it: '+data.tracks.items[0].external_urls.spotify+'\n\n');
    })
  }
}

commands[command](title);
