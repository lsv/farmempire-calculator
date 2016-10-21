/**
 * @param {big} earning Earnings pr second
 * @param {big} number Money you want
 * @param {big} currentMoney Your current money
 * @return {string}
 */
var TimeToGetMoney = function (earning, number, currentMoney) {
    return number.minus(currentMoney).div(earning).toFixed(0);
};

module.exports = TimeToGetMoney;
