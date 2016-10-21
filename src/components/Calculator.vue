<template>

    <form class="form-style-9">
        <ul v-if="earning">
            <li>
                Du tjener ligenu: <span id="earning_now" class="result">{{ earning }}</span><span class="divider">/</span>s
            </li>
        </ul>

        <ul v-for="i in numfarms">
            <li>
                <input v-on:blur="calcResult()" placeholder="23.62" type="text" class="field-style" :id="'farm_' + i + '_number'" pattern="^[0-9]{1,3}((.,)[0-9]{2}?)$" />
                <money-select :id="'farm_' + i + '_type'" v-on:moneytype-changed="calcResult()"></money-select>
                <span class="divider">/</span>
                <input v-on:blur="calcResult()" type="text" class="field-style" :id="'farm_' + i + '_time'" placeholder="tt:mm:ss / mm:ss / ss" />
            </li>
        </ul>

        <ul v-if="farms.length > 0">
            <li>
                <p>
                <label>Din beholdning nu:</label>
                <input v-on:blur="calcResult()" placeholder="23.62" type="text" class="field-style" id="now_number" pattern="^[0-9]{1,3}(.[0-9]{2}?)$" />
                <money-select :id="'now_type'" v-on:moneytype-changed="calcResult()"></money-select>
                </p>

                <p>
                <label>Hvor længe går der før jeg får:</label>
                <input v-on:blur="calcResult()" placeholder="23.62" type="text" class="field-style" id="wanted_number" pattern="^[0-9]{1,3}(.[0-9]{2}?)$" />
                <money-select :id="'wanted_type'" v-on:moneytype-changed="calcResult()"></money-select>
                </p>
            </li>
            <li v-if="result">
                Der går tæt på: <span id="" class="result">{{ result }}</span>
            </li>
        </ul>
    </form>

</template>
<script>
    import MoneySelect from './moneyselect';
    import Splittime from './../service/splittime';
    import StringToBigInt from './../service/StringToBigInt';
    import Earning from './../service/earnings';
    import Timetoget from './../service/TimeToGetMoney';
    import BigIntToString from './../service/BigIntToString';
    import SecondsToTime from './../service/SecondsToTime';

    export default {
        data () {
            return {
                cache: [],
                farms: [],
                result: null,
                earning: null,
                numfarms: 8
            }
        },

        ready () {
            this.cache = this.$localStorage.get('farms');
        },

        methods: {
            getValue (id) {
                return document.getElementById(id).value;
            },

            calcResult () {
                var number, type, time, now, nowType, realNumber;

                var farms = [];
                for (var i = 1; i <= this.numfarms; i++) {
                    number = this.getValue('farm_' + i + '_number');
                    type = this.getValue('farm_' + i + '_type');
                    time = this.getValue('farm_' + i + '_time');
                    if (!number || !type || !time) {
                        continue;
                    }

                    realNumber = StringToBigInt(number, type);
                    if (realNumber === false) {
                        continue;
                    }

                    time = Splittime(time);
                    if (time === false) {
                        continue;
                    }

                    farms.push({
                        number: number,
                        type: type,
                        time: time
                    })
                }

                this.farms = farms;
                this.$localStorage.set('farms', farms);

                if (this.farms.length > 0) {
                    var earning = Earning(this.farms);
                    this.earning = BigIntToString(earning);

                    number = this.getValue('wanted_number');
                    type = this.getValue('wanted_type');
                    now = this.getValue('now_number');
                    nowType = this.getValue('now_type');
                    if (now === '') {
                        now = '0';
                    }

                    if (number && type) {
                        number = StringToBigInt(number, type);
                        if (number) {
                            this.result = SecondsToTime(Timetoget(earning, number, StringToBigInt(now, nowType)));
                        }
                    }

                }

            }
        },

        components: {
            MoneySelect
        }
    }
</script>
<style type="text/css">
.result {
    font-weight: bold;
    font-size: 120%;
}
.divider {
    padding-left: 10px;
    padding-right: 10px;
}
.form-style-9 {
    display: inline-block;
    background: #FAFAFA;
    padding: 30px;
    box-shadow: 1px 1px 25px rgba(0, 0, 0, 0.35);
    border: 6px solid #305A72;
}
.form-style-9 ul{
    padding:0;
    margin:0;
    list-style:none;
}
.form-style-9 ul li{
    display: block;
    margin-bottom: 10px;
    min-height: 35px;
}
.form-style-9 ul li  .field-style{
    transition: all 250ms ease-in-out;
    outline: none;
    padding: 5px;
    margin: 5px 1px 3px 0;
    border: 1px solid #DDDDDD;

}.form-style-9 ul li  .field-style:focus{
     box-shadow: 0 0 2px rgba(81, 203, 238, 1);
     border: 1px solid rgba(81, 203, 238, 1);
}
</style>
