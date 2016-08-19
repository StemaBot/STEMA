/* IO Module
the IO module contains useful functions for
dealing with input and output.

Usage:
require the module
then call any function from the array below, e.g:
IO.configureMessage(message);
*/

module.exports = {
	
    // Used for getting multi argument input from user.
    // retuns an array of parameters.
    configureMessage: function(message){
        params = message.split(' ');
        return params;
    }
}
