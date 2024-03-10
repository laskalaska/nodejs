import EventEmitter from 'node:events';

const ee = new EventEmitter();

const delay = (ms) => {
    const now = Date.now();
    while (Date.now() - now <= ms) {
    }
}

ee.on("log", () => {
    console.log('log 1')
}) // create event

let listener = () => {
    console.log('event once')
};
ee.once("event", listener) // create event that will be called once per app run

ee.prependListener('event', () => {
    console.log('event first');
}) // create event and push it to the start of the 'events' list

ee.on("event", () => {
    // delay(5500);
    console.log('event 1')
})

ee.on("event", () => {
    delay(500)
    console.log('event 2')
})

ee.removeListener('event', listener); // remove listener from event list

console.log(ee.eventNames());

ee.on('log', (date, category, message) => {
    console.log(date, category, message)
})

ee.emit("event"); // call event and all array of listeners within it
ee.emit("event");
ee.emit('log', new Date(), 'app.js', 'test'); // call event listeners with arguments
process.on('uncaughtException', (err) => {
    console.log('catched');
    console.log(err.message);
})

process.on('unhandledRejection', (err, promise) => {
    console.log('unhandledRej', err, promise);
})

new Promise((res, rej) => {
    rej('PROMISE REJECTED')
}).then()


// throw new Error('ERROR');


// document.getElementById('div').addEventListener("click", () => {
//
// })

// qwerty(name) {
//     this.list[name].forEach(l => l());
// }