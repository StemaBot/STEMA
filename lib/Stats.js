/* Stats Module
used for querying steam api for info and whatnot,

pretty much just a wrapper for node-steam-api but
does some other cool things aswell.
*/

var SteamApi = require('../node_modules/steam-api');
var _ = require('../node_modules/underscore');
var Config = require('../config.js');
var steamUser = new SteamApi.User(Config.apiKey);
var steamUserStats = new SteamApi.UserStats(Config.apiKey);

module.exports = {    

    // Retrieve the steamID64 from the vanity
    // URL of a steam account.
    getId: function(name, callback) {
        steamUser.ResolveVanityUrl(name).done(function(result){
            callback(result);
        });
    },

    // gameID will span a multitude of api supported steam apps
    // and this will return an array specifically catered to
    // obtainign threat level, stats will be added overtime to the threat array.
    getThreatStats: function(game, id, callback) {
        steamUserStats.GetUserStatsForGame(game, id).done(function(result){
            var threatArray;
            const stats = result.stats;

            if(game == '730') { // CSGO
                var threatArray = {
                    kills: _.where(stats,        { "name": "total_kills" })[0].value,
                    deaths: _.where(stats,       { "name": "total_deaths" })[0].value,
                    shotsFired: _.where(stats,   { "name": "total_shots_fired" })[0].value,
                    totalHits: _.where(stats,    { "name": "total_shots_hit" })[0].value,
                    matchesWon: _.where(stats,   { "name": "total_matches_won" })[0].value,
                    totalMatches: _.where(stats, { "name": "total_matches_played" })[0].value,
                    timePlayed: _.where(stats,   { "name": "total_time_played" })[0].value,
                };
            }
            else if(game == '440') { // TF2
                var threatArray = {
                    scoutDmg: _.where(stats,     { "name": "Scout.accum.iDamageDealt" })[0].value,
                };
            }
            else if(game == '...') { // ...
                var threatArray = {
                    /* ...  */
                };
            }
            callback(threatArray);
        });
    },

    // Nearly identical to the above function but this instead
    // returns the raw array of stats, incase it's needed.
    getGameStats: function(game, id, callback) {
        steamUserStats.GetUserStatsForGame(game, id).done(function(result){
            const stats = result.stats;
            callback(stats);
        });
    }
}
