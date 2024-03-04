import fs from "fs";
import * as constants from "../constants.js";

const NORMAL_LEVEL_LOG_FILE = 'logs/appLog.txt';
const ERROR_LEVEL_LOG_FILE = 'logs/appErrorLog.txt';

function log(date, level, category, message) {
    const formattedMessage = formatMessage(date, level, category, message);
    writeToFile(NORMAL_LEVEL_LOG_FILE, formattedMessage)

    if(level === constants.level.ERROR) {
        writeToFile(ERROR_LEVEL_LOG_FILE, formattedMessage)
    }
}

async function writeToFile(file, message) {
    try {
        await fs.promises.writeFile(file, message + '\n', {flag: 'a+'})
    } catch (err) {
        console.error(err)
    }
}

function formatMessage(date, level, category, message) {
    return `Date: ${date}, level: ${level}, category: ${category}, message: ${JSON.stringify(message)}`
}

export default {log}