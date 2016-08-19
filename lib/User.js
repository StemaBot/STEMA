/* User Module
use this for whenever you need to get stats
and store them for later use in other places
around your code.

Usage:
var user = new User(VanityUrl, userId, stats);
*/

var user = function(vanityUrl, userId, stats){
    this.vanityUrl = vanityUrl;
    this.userId = userId;
    this.stats = stats;
}

// Returns the Vanity URL name of the user
user.prototype.getVanityUrl = function(){
    return this.vanityUrl;
}

// Returns the Id of the user (useful for steam api)
user.prototype.getUserId = function(){
    return this.userId;
}

// Returns the stats variable of the user
user.prototype.getStats(){
    return this.stats;
}

// Sets the users stats variable to equal the 
// argument, useful if you don't have any stats to pass
// at the time of the constructor.
user.prototype.setStats(stats){
    this.stats = stats;
}

module.exports = function(vanityUrl, userId, stats){
    return new user(vanityUrl, userId, stats);
}
