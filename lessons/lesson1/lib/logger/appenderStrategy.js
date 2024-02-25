import * as constants from './constants.js';
import config from "./config.js";
import consoleAppender from './appenders/console.js';

const appenders = {
    [constants.appender.CONSOLE]: consoleAppender,
    [undefined]: consoleAppender
}

function getAppender() {
    // if(constants.appender.CONSOLE === config.appender) {
    //     return consoleAppender
    // }
    //
    // return consoleAppender;

    return appenders[config.appender]
}

export {getAppender}