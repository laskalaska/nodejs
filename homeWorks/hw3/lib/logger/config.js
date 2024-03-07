import * as constants from './constants.js'
import fs from "fs";

const defaultConfig = {
    logLevel: constants.level.INFO,
    scoreLevel: constants.scoreLevel[constants.level.INFO],
    appender: constants.appender.CONSOLE,
    formatter: constants.formatter.DEFAULT,
    delimiter: constants.DELIMITER,
}

function enrichConfig(config) {
    config.scoreLevel = constants.scoreLevel[config.logLevel]
}

function readConfigFile(filePath) {
    try {
        const dataFile = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(dataFile);
    } catch (err) {
        console.log('Error reading config file: ' + err);
    }
}

function initConfig() {
    const config = defaultConfig;
    // const config = {
    //     logLevel: logLevel,
    //     // scoreLevel: constants.scoreLevel[logLevel] // moved to enrichConfig
    // }

    const logLevel = process.env.LOG_LEVEL?.toUpperCase();
    const appender = process.env.LOG_APPENDER?.toUpperCase();
    const formatter = process.env.LOG_OUTPUT_FORMAT?.toUpperCase();
    const delimiter = process.env.LOG_DELIMITER;
    const configFile = process.env.LOG_CONFIG_FILE;
    let fileConfig;

    if (configFile) {
        fileConfig = readConfigFile(configFile);
    }

    if (logLevel && constants.level[logLevel]) {
        config.logLevel = logLevel;
    } else if (fileConfig && fileConfig.logLevel) {
        config.logLevel = fileConfig.logLevel?.toUpperCase();
    }

    if (appender && constants.appender[appender]) {
        config.appender = appender;
    } else if (fileConfig && fileConfig.appender) {
        config.appender = fileConfig.appender?.toUpperCase();
    }

    if (formatter && constants.formatter[formatter]) {
        config.formatter = formatter;
    } else if (fileConfig && fileConfig.formatter) {
        config.formatter = fileConfig.formatter?.toUpperCase();
    }

    if (delimiter) {
        config.delimiter = delimiter;
    } else if (fileConfig && fileConfig.delimiter) {
        config.delimiter = fileConfig.delimiter?.toUpperCase();
    }

    enrichConfig(config)

    return config;
}

const config = initConfig();

export default config;