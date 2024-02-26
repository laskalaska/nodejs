import fs from "fs";
import * as constants from "../constants.js";

const NORMAL_LEVEL_LOG_FILE = 'logs/appLog.txt';
const ERROR_LEVEL_LOG_FILE = 'logs/appErrorLog.txt';

function log(date, level, category, message) {
    const formattedMessage = formatMessage(date, level, category, message);
    fs.writeFileSync(NORMAL_LEVEL_LOG_FILE, formattedMessage + '\n', {flag: 'a+'})

    if(level === constants.level.ERROR) {
        fs.writeFileSync(ERROR_LEVEL_LOG_FILE, formattedMessage + '\n', {flag: 'a+'})
    }
}

function formatMessage(date, level, category, message) {
    return `Date: ${date}, level: ${level}, category: ${category}, message: ${JSON.stringify(message)}`
}

export default {log}