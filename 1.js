/*  Решение задания 1
В консоли выведет 1 5 6 2 3 4   */
/* Задание с таймерами */

const EventEmitter = require('events');
var { nanoid } = require("nanoid");
const colors = require("colors/safe");


class Timer {
    constructor(endDate, evEmitter) {
        this.evEmitter = evEmitter;
        this.name = `Timer_${nanoid(3)}`; // todo implement nanoID
        this.endDate = new Date(endDate);
    }

    start() {
        this.intervalId = setInterval(() => {
            let currentDate = new Date;
            if (currentDate < this.endDate) {
                let res = new Date(this.endDate - currentDate);
                this.evEmitter.emit('tick', `${this.name} ends in years:${res.getUTCFullYear() - 1970} months:${res.getUTCMonth()} days:${res.getUTCDate() - 1} ${res.getUTCHours()}:${res.getUTCMinutes()}:${res.getUTCSeconds()}`);
            } else {
                this.evEmitter.emit('tick', colors.red(`${this.name} stops!`));
                clearInterval(this.intervalId);
            }
        }, 1000);

    }
}
let args = [...process.argv].slice(2);
const eventEmitter = new EventEmitter();
eventEmitter.on('tick', (val) => console.log(val));

args.forEach(arg => {
    new Timer(arg, eventEmitter).start();
});
