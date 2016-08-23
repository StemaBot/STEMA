/* ChatBot Setup Example
use this file as a reference for setting up
the bot for a chat bot environment.
*/

var steam = require('steam');
var Config = require('./config.js');
var steamClient = new steam.SteamClient();
var steamUser = new steam.SteamUser(steamClient);
var steamFriends = new steam.SteamFriends(steamClient);

steamClient.connect();
steamClient.on('connected', function() {
    steamUser.logOn({
        account_name: Config.username,
        password: Config.password
    });
});

steamClient.on('logOnResponse', function() {
    
    // Set the bots state to Online
    steamFriends.setPersonaState(steam.EPersonaState.Online);

    // Checks for any messages
    steamFriends.on('message', function(source, message, type, chatter) {
        console.log(Config.username + ': recieved message: ' + message);

        // If bot recieves the message 'ping' respond to the sender with
        // 'pong'
        if(message == 'ping'){
            steamFriends.sendMessage(source, 'pong', steam.EChatEntryType.ChatMsg);
        }
    });
});

