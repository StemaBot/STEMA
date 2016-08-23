/* Dev Bot
For use in development branch.
*/

var steam = require("steam");
var Config = require("./config.js");
var User = require("./lib/User");
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
    
    steamFriends.setPersonaState(steam.EPersonaState.Online);

    steamFriends.on('message', function(source, message, type, chatter){

        if(message == 'test'){
            steamFriends.sendMessage(source, 'reply', steam.EChatEntryType.ChatMsg);
        }

        console.log(Config.username + ": recieved message from " + source + ": " + message);
    });
});

