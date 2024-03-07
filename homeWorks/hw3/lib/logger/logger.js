import config from "./config.js";
import {level, scoreLevel} from './constants.js';
import * as appenderStrategy from './appenderStrategy.js';

const logger = (category) => ({
    info: (...args) => {
        executeLog(level.INFO, category, args)
    },
    warn: (...args) => {
        executeLog(level.WARN, category, args)
    },
    error: (...args) => {
        executeLog(level.ERROR, category, args)
    },
    debug: (...args) => {
        executeLog(level.DEBUG, category, args)
    },
    trace: (...args) => {
        executeLog(level.TRACE, category, args)
    },
})

const appender = appenderStrategy.getAppender();

function executeLog(level, category, args) {
    if (scoreLevel[level] <= config.scoreLevel) {
        const message = args.join(config.delimiter);
        appender.log(Date.now(), level, category, message);
    }
}

export default {
    getLogger(category) {
        return logger(category);
    }};