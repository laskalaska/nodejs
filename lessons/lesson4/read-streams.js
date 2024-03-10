import fs from "fs";
import path from "path";
import readline from "readline";

const readStream = fs.createReadStream(path.join('./', 'log.txt'), {encoding: 'utf-8'});

const rl = readline.createInterface({
    input: readStream,
})


rl.on('line', (input) => {
    console.log('LINE:', input)
})

readStream.on('open', () => {
    console.log('read start');
})

// readStream.on('data', (chunk) => {
//     console.log(chunk);
// })

readStream.on('end', () => {
    console.log('read finish');
})