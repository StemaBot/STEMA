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
    // obtainign threat level
    getThreatStats: function(game, id, callback) {
        steamUserStats.GetUserStatsForGame(game, id).done(function(result){
            const stats = result.stats;
            
            var threatArray = {
                kills: _.where(stats, { "name": "total_kills" })[0].value,
            };

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
