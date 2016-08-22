/* Helper Module
the helper module has a variety to make
bot usage simpler and easier.

Any functions that don't fit into any other
module can go here
*/

module.exports = {

    // Finding greatest commond denom of two nums
    // used mainly for simplifying fractions
    findGCD: function(num1, num2){
        if(num2 == 0){
            return num1;
        }
        return this.findGCD(num2, num1%num2);
    },

    // Simplifying fractions, function is pretty
    // obvious...
    simplifyFraction: function(num1, num2){
        GCD = this.findGCD(num1, num2);
        
        num1 = num1 / GCD;
        num2 = num2 / GCD;
        
        return num1 / num2
    },  

}

