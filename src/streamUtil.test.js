import { Readable, Writable } from "stream"
import { streamToBuffer, pipeToPromise, stringToStream } from "./streamUtil"

test("streamToBuffer", async () => {
  const s = "Hello World"
  const testStream = new Readable({
    read() {
      this.push(s)
      this.push(null)
    },
  })

  const result = await streamToBuffer(testStream)

  expect(result).toBeInstanceOf(Buffer)
  expect(result).toEqual(Buffer.from(s))
})

test("pipeToPromise", async () => {
  const writable = new Writable({
    write(chunk, encoding, callback) {
      callback()
    },
  })

  // The null push is required to end the nodesJS Stream
  const readable = new Readable({
    read() {
      this.push("test")
      this.push(null)
    },
  })

  await expect(pipeToPromise(readable, writable)).resolves.toBeUndefined()
})

test("stringToStream", () => {
  const s = "abc"
  const readable = stringToStream(s)

  expect(readable).toBeInstanceOf(Readable)
  expect(readable.read().toString()).toBe(s)
})
