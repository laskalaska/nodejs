import * as constants from './constants.js';
import config from "./config.js";
import consoleAppender from './appenders/console.js';
import fileAppender from './appenders/file.js'
import { getFormatter } from "./formatterStrategy.js";
import csvAppender from "./appenders/csv.js"

const appenders = {
    [constants.appender.CONSOLE]: consoleAppender,
    [constants.appender.FILE]: fileAppender,
    [constants.appender.CSV]: csvAppender,
    [undefined]: consoleAppender
}

function getAppender() {
    const outputFormat = getFormatter(config.formatter)
    // return appenders[config.appender](outputFormat)

    return config.appender
        .map(a => appenders[a])
        .filter(a => !!a)
        .map(a => a(outputFormat));
}

export {getAppender}