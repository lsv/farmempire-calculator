import _ from 'underscore';
import StringToBig from './StringToBigInt';
import Big from 'big.js';

/**
 * @param farms {array}
 * @return {big}
 */
var Earning = function (farms) {
    var num = Big(0);
    _.forEach(farms, function (obj) {
        var big = StringToBig(obj.number, obj.type)
            .div(obj.time)
        ;
        num = num.add(big);
    });
    return num;
};

module.exports = Earning;
