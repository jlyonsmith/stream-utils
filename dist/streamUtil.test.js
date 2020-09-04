"use strict";

var _stream = require("stream");

var _streamUtil = require("./streamUtil");

test("streamToBuffer", async () => {
  const s = "Hello World";
  const testStream = new _stream.Readable({
    read() {
      this.push(s);
      this.push(null);
    }

  });
  const result = await (0, _streamUtil.streamToBuffer)(testStream);
  expect(result).toBeInstanceOf(Buffer);
  expect(result).toEqual(Buffer.from(s));
});
test("streamToString", async () => {
  const s = "Brown Fox";
  const testStream = new _stream.Readable({
    read() {
      this.push(s);
      this.push(null);
    }

  });
  const result = await (0, _streamUtil.streamToString)(testStream);
  expect(result).toBe(s);
});
test("pipeToPromise", async () => {
  const writable = new _stream.Writable({
    write(chunk, encoding, callback) {
      callback();
    }

  }); // The null push is required to end the nodesJS Stream

  let readable = new _stream.Readable({
    read() {
      this.push("test");
      this.push(null);
    }

  });
  await expect((0, _streamUtil.pipeToPromise)(readable, writable)).resolves.toBeUndefined();
  const errorReadable = new _stream.Readable({
    read() {
      this.destroy(new Error());
    }

  });
  await expect((0, _streamUtil.pipeToPromise)(errorReadable, writable)).rejects.toBeInstanceOf(Error);
  const errorWritable = new _stream.Writable({
    write(chunk, encoding, callback) {
      this.destroy(new Error());
    }

  });
  readable = new _stream.Readable({
    read() {
      this.push("test");
      this.push(null);
    }

  });
  await expect((0, _streamUtil.pipeToPromise)(readable, errorWritable)).rejects.toBeInstanceOf(Error);
});
test("stringToStream", () => {
  const s = "abc";
  const readable = (0, _streamUtil.stringToStream)(s);
  expect(readable).toBeInstanceOf(_stream.Readable);
  expect(readable.read().toString()).toBe(s);
});
//# sourceMappingURL=streamUtil.test.js.map