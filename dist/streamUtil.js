"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pipeToPromise = pipeToPromise;
exports.streamToBuffer = exports.stringToStream = void 0;

var _stream = require("stream");

const stringToStream = s => new _stream.Readable({
  read() {
    this.push(s); // End of data

    this.push(null);
  }

});

exports.stringToStream = stringToStream;

const streamToBuffer = readable => new Promise((resolve, reject) => {
  var chunks = [];
  var writable = new _stream.Writable({
    write(chunk, encoding, callback) {
      chunks.push(chunk); // Successful write

      callback();
    }

  });
  readable.on("end", () => resolve(Buffer.concat(chunks)));
  readable.on("error", error => reject(error));
  readable.pipe(writable);
});

exports.streamToBuffer = streamToBuffer;

function pipeToPromise(readable, writable) {
  const promise = new Promise((resolve, reject) => {
    readable.on("error", error => reject(error));
    writable.on("error", error => reject(error));
    writable.on("finish", file => resolve(file));
  });
  readable.pipe(writable);
  return promise;
}
//# sourceMappingURL=streamUtil.js.map