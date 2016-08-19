/* Basic Bot Setup Example
use this file as a reference for setting up
the bot in a basic matter.

Most functions should be run inside the logonresponse
event.
*/

var steam = require("steam");
var Config = require("./config.js");
var steamClient = new steam.SteamClient();
var steamUser = new steam.SteamUser(steamClient);

    steamClient.connect();
    steamClient.on('connected', function() {
        steamUser.logOn({
            account_name: Config.username,
            password: Config.password
        });
    });

steamClient.on('logOnResponse', function() {/* Main Bot Loop */});

