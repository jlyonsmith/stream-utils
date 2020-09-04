import { Readable, Writable } from "stream"
import {
  streamToBuffer,
  pipeToPromise,
  stringToStream,
  streamToString,
} from "./streamUtil"

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

test("streamToString", async () => {
  const s = "Brown Fox"
  const testStream = new Readable({
    read() {
      this.push(s)
      this.push(null)
    },
  })
  const result = await streamToString(testStream)

  expect(result).toBe(s)
})

test("pipeToPromise", async () => {
  const writable = new Writable({
    write(chunk, encoding, callback) {
      callback()
    },
  })

  // The null push is required to end the nodesJS Stream
  let readable = new Readable({
    read() {
      this.push("test")
      this.push(null)
    },
  })

  await expect(pipeToPromise(readable, writable)).resolves.toBeUndefined()

  const errorReadable = new Readable({
    read() {
      this.destroy(new Error())
    },
  })

  await expect(pipeToPromise(errorReadable, writable)).rejects.toBeInstanceOf(
    Error
  )

  const errorWritable = new Writable({
    write(chunk, encoding, callback) {
      this.destroy(new Error())
    },
  })
  readable = new Readable({
    read() {
      this.push("test")
      this.push(null)
    },
  })

  await expect(pipeToPromise(readable, errorWritable)).rejects.toBeInstanceOf(
    Error
  )
})

test("stringToStream", () => {
  const s = "abc"
  const readable = stringToStream(s)

  expect(readable).toBeInstanceOf(Readable)
  expect(readable.read().toString()).toBe(s)
})
