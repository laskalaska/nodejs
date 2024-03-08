import fs from "fs";
import * as constants from "../constants.js";

const NORMAL_LEVEL_LOG_FILE = 'logs/appLog.txt';
const ERROR_LEVEL_LOG_FILE = 'logs/appErrorLog.txt';

const log = formatter => (date, level, category, message) => {
    const formattedMessage = formatter(date, level, category, message);
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

function init(formatter) {
    return {
        log: log(formatter)
    }
}

export default init;