/**
 * @param {int} delta
 * @return {string}
 */
module.exports = function (delta) {
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    var seconds = delta % 60;

    var result = '';
    if (days) {
        result += days + 'd ';
    }

    result += ':' + (hours < 10 ? '0' + hours : hours);
    result += ':' + (minutes < 10 ? '0' + minutes : minutes);
    result += ':' + (seconds < 10 ? '0' + seconds : seconds);
    return result;
};
