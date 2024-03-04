import * as constants from './constants.js'
import fs from "fs";

const defaultConfig = {
    logLevel: constants.level.INFO,
    scoreLevel: constants.scoreLevel[constants.level.INFO],
    appender: constants.appender.CONSOLE
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

    enrichConfig(config)

    return config;
}

const config = initConfig();

export default config;