const fs = require('fs');
const ACCESS_LOG = 'aaa.log';
arrIP = ['89.123.1.41', '176.212.24.22']

function createPath(ip) {
    return `%${ip}% _requests.log`
};
const { Transform } = require('stream');
const readStream = fs.createReadStream(ACCESS_LOG);
function createWriteStreams(ip) {
    const writeStream = fs.createWriteStream(createPath(ip));
    return writeStream;
}

const tr = (ip) => new Transform({
    transform(chunk, encoding, done) {
        var stringData = chunk.toString()

        if (this._invalidLine) {
            stringData = this._invalidLine + stringData
        }

        let lines = stringData.split('\n');

        this._invalidLine = lines.splice(lines.length - 1, 1)[0];
        let filteredLines = lines.filter(str => str.includes(ip)).join('\n')

        this.push(filteredLines);
        done();
    }
});

function pipeStreams(ip1, ip2) {
    if (ip1)
        readStream.pipe(tr(ip1)).pipe(createWriteStreams(ip1))
    else if (ip2) {
        readStream.pipe(tr(ip2)).pipe(createWriteStreams(ip2))
    }
}
pipeStreams(arrIP[0], arrIP[1]);