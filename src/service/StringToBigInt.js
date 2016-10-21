import Big from 'big.js';

/**
 * @param {string} numberstring
 * @param {int} type
 * @returns {boolean|big}
 */
module.exports = function (numberstring, type) {
    if (numberstring.indexOf(',') > 0) {
        numberstring = numberstring.replace(',', '.');
    }

    var typestring;
    typestring = String('1' + '0'.repeat(type));
    var big = Big(numberstring).times(typestring);
    return big;
};
