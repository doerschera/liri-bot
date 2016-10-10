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
  }
}

commands[command](title);
