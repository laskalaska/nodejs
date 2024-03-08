import * as constants from './constants.js'
import fs from "fs";

const defaultConfig = {
    logLevel: constants.level.INFO,
    scoreLevel: constants.scoreLevel[constants.level.INFO],
    appender: [constants.appender.CONSOLE],
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
    const formatter = process.env.LOG_OUTPUT_FORMAT?.toUpperCase();
    const delimiter = process.env.LOG_DELIMITER;
    const configFile = process.env.LOG_CONFIG_FILE;
    let fileConfig;

    if (configFile) {
        fileConfig = readConfigFile(configFile);
    }
    const appender = parseAppenders(process.env.LOG_APPENDER || fileConfig.appender);

    if (logLevel && constants.level[logLevel]) {
        config.logLevel = logLevel;
    } else if (fileConfig && fileConfig.logLevel) {
        config.logLevel = fileConfig.logLevel?.toUpperCase();
    }

    if (appender.length > 0) {
        config.appender = appender;
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

function parseAppenders(appenders = '') {
    return appenders.split(',')
        .map(a => a.trim().toUpperCase())
        .filter(validateAppender)
}

function validateAppender(appender) {
    return appender && !!constants.appender[appender];
}

export default config;