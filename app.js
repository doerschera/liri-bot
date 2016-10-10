// require npm modules
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

// twitter init
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var command = process.argv[2];
var title = process.argv.slice(3).toString();

var commands = {
  my-tweets: function() {
    
  }
}
