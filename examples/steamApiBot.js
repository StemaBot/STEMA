/* Steam Api Bot Setup Example
use this file as a reference for setting up the
bot for use in checking steam Api for stats.

visit https://steamcommunity.com/dev for more info
on steam api, and also visit https://github.com/DPr00f/steam-api-node for
info on node-steam-api library.
*/

var steam = require('steam');
var steamApi = require('steam-api')
var Config = require('./config.js');
var IO = require('./lib/IO.js');
var _ = require('underscore');

var userStats = new steamApi.UserStats(Config.apiKey);
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
        if(command == '!csgo' && query[1] != null){
            userStats.GetUserStatsForGame('730', query[1]).done(function(result){
                const stats =  result.stats;
                
                const kills = _.where(stats, { "name": "total_kills" })[0].value;
                const deaths = _.where(stats, { "name": "total_deaths" })[0].value;
                const matchesWon = _.where(stats, { "name": "total_matches_won" })[0].value;

                steamFriends.sendMessage(source, query[1] + " has " + kills + " total kills, " + deaths + " total deaths, and a total of " + matchesWon + " matches won in CS:GO.");
            });
        }else if(command == '!tf2' && query[1] != null){
            userStats.GetUserStatsForGame('440', query[1]).done(function(result){
                const stats = result.stats;

                const scoutDmg = _.where(stats, { "name": "Scout.accum.iDamageDealt" })[0].value;
                const heavyDmg = _.where(stats, { "name": "Heavy.accum.iDamageDealt" })[0].value;
                const medicDmg = _.where(stats, { "name": "Medic.accum.iDamageDealt" })[0].value;

                steamFriends.sendMessage(source, query[1] + " has " + scoutDmg + " total damage dealt as scout, " + heavyDmg + ", as heavy, and " + medicDmg + " as Medic in TF2");
            });
        }
    });
});
