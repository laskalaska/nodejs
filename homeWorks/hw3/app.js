import logger from "./lib/logger/logger.js";

import color from "./color.js";
import fruit from "./fruit.js";
import {add} from "./handler.js";


const log = logger.getLogger('app.js');

log.info(color);
log.info(fruit);
log.error('ERROR occur');
log.debug(color);
log.trace(fruit);

const data = 'text';
const user = '123';

log.info("Data", data, "User:", user, "Sdf", "test")

add(3, 5);