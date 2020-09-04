"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringToStream = stringToStream;
exports.streamToBuffer = streamToBuffer;
exports.streamToString = streamToString;
exports.pipeToPromise = pipeToPromise;

var _stream = require("stream");

function stringToStream(s) {
  new _stream.Readable({
    read() {
      this.push(s); // End of data

      this.push(null);
    }

  });
}

function streamToBuffer(readable) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readable.on("data", chunk => chunks.push(chunk));
    readable.on("error", reject);
    readable.on("end", () => resolve(Buffer.concat(chunks)));
  });
}

function streamToString(readable, encoding = "utf8") {
  return streamToBuffer(readable).then(buffer => buffer.toString(encoding));
}

function pipeToPromise(readable, writable) {
  const promise = new Promise((resolve, reject) => {
    readable.on("error", error => reject(error));
    writable.on("error", error => reject(error));
    writable.on("finish", () => resolve());
  });
  readable.pipe(writable);
  return promise;
}
//# sourceMappingURL=streamUtil.js.map