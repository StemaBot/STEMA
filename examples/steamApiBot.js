/* Steam Api Bot Setup Example
use this file as a reference for setting up the
bot for use in checking steam Api for stats.

visit https://steamcommunity.com/dev for more info
on steam api, and also visit https://github.com/DPr00f/steam-api-node for
info on node-steam-api library.
*/

var steam = require('steam');
var Config = require('./config.js');
var IO = require('./lib/IO.js');
var Stats = require('./lib/Stats.js');
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

    steamFriends.on('message', function(source, message, type, chatter) {
        
        // this function prepares the raw input into something
        // more usable, for more info look in the IO library
        query = IO.configureMessage(message);
        command = query[0];
    
        // Check for the command and also make sure query[1] isn't null
        // to avoid errors
        if(command == '!csgo' && query[1] != null) {
            Stats.getThreatStats('730', query[1], function(result){
                steamFriends.sendMessage(source, query[1] + ' has ' + result.kills + ' total kills, ' + ' in CS:GO.');
            });
        }
        if(command == '!tf2' && query[1] != null) {
            Stats.getThreatStats('440', query[1], function(result){
                steamFriends.sendMessage(source, query[1] + ' has ' + result.scoutDmg + ' total damage dealt as scout in TF2');
            });
        }
        if(command == '!getId' && query[1] != null) {
            Stats.getId(query[1], function(result){
                steamFriends.sendMessage(source, query[1] + ': ' + result);
            });
        }
    });
});
