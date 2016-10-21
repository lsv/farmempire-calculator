import numbersizes from './../components/numbersizes.json';
import Big from 'big.js';
import _ from 'underscore';

/**
 * @param {big} number
 * @return {string}
 */
var BigToString = function (number) {
    var newnumber = number;
    newnumber = newnumber.toFixed(0);
    if (newnumber.length > 3) {
        var newkey = 0;
        var newname = '';
        _.find(numbersizes, function (name, key) {
            if (newnumber.length < key) {
                return newname;
            } else {
                newname = name;
                newkey = key;
            }
        });

        var typestring;
        typestring = String('1' + '0'.repeat(newkey));
        var big = Big(number).div(typestring);
        return big.toFixed(2) + ' ' + newname;
    }

    return number.toFixed(2);
};

module.exports = BigToString;
