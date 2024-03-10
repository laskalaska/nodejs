import fs from 'fs';
import path from "path";
import { Transform } from 'stream';

const readStream = fs.createReadStream(path.join('./', 'log.txt'));
const writeStream = fs.createWriteStream(path.join('./', './log1.txt'), {encoding: 'utf-8', flags: 'a+'});

const transform = new Transform({
    transform(chunk, encoding, callback) {
        const s = chunk.toString();
        const all = s.replaceAll('Log', '\nLOGGER');

        callback(null, all);
    }
})

const stream = readStream.pipe(transform).pipe(writeStream);
// const stream = readStream.pipe(writeStream);

stream.on('finish', () => {
    console.log('stream finish');
})

// writeStream.on('open', () => {
//     console.log('write start');
// })
//
// writeStream.on('finish', () => {
//     console.log('write finish');
// })
//
// writeStream.write('Log1');
// writeStream.write('Log1');
// writeStream.write('Log2');
// writeStream.write('Log3');
// writeStream.write('Log4');
//
// writeStream.end(() => {
//     console.log('write ended');
// })
