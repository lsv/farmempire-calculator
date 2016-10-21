/**
 * @param timestring {string}
 * @returns {number}
 * @constructor
 */
var Timesplit = function (timestring) {
    var count = (timestring.match(/:/g) || []).length;
    var times = [];
    var hour = 0;
    var min = 0;
    var sec = 0;
    switch (count) {
        default:
        case 0:
            sec = timestring;
            break;
        case 1:
            // min:sec
            times = timestring.split(':');
            min = times[0];
            sec = times[1];
            break;
        case 2:
            // tt:min:sec
            times = timestring.split(':');
            hour = times[0];
            min = times[1];
            sec = times[2];
            break;
    }

    return (parseInt(hour) * 60 * 24) + (parseInt(min) * 60) + parseInt(sec);
};

module.exports = Timesplit;
