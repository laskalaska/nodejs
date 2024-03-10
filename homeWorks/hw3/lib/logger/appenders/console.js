// function log(formatter) {
//     return function (date, level, category, message){
//         console.log(formatMessage(date, level, category, message))
//     }
// }
const log = formatter => (date, level, category, message) => {
    console.log(formatter(date, level, category, message));
}

function init(formatter) {
    return {log: log(formatter)}
}

export default init;