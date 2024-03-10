import * as constants from "./constants.js";
import config from "./config.js";
import jsonFormatter from './formatters/json.js';
import csvFormatter from './formatters/csv.js'
import defaultFormatter from './formatters/default.js'

const formatters = {
    [constants.formatter.JSON]: jsonFormatter,
    [constants.formatter.CSV]: csvFormatter,
    [constants.formatter.DEFAULT]: defaultFormatter,
    [undefined]: defaultFormatter
}

function getFormatter(formatter) {
    return formatters[formatter];
}

export { getFormatter }