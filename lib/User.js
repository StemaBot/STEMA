/* User Module
use this for whenever you need to get stats
and store them for later use in other places
around your code.

Usage:
var user = new User(VanityUrl, userId, stats);
*/

var user = function(userId, stats){
    this.userId = userId;
    this.stats = stats;
}

// Returns the Id of the user (useful for steam api)
user.prototype.getUserId = function(){
    return this.userId;
}

user.prototype.setUserId = function(userId){
    this.userId = userId;
}

// Returns the stats variable of the user
user.prototype.getStats = function(){
    return this.stats;
}

// Sets the users stats variable to equal the 
// argument, useful if you don't have any stats to pass
// at the time of the constructor.
user.prototype.setStats = function(stats){
    this.stats = stats;
}

module.exports = function(userId, stats){
    return new user(userId, stats);
}
