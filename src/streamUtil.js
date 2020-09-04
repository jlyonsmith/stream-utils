import { Readable } from "stream"

export function stringToStream(s) {
  return new Readable({
    read() {
      this.push(s)
      // End of data
      this.push(null)
    },
  })
}

export function streamToBuffer(readable) {
  return new Promise((resolve, reject) => {
    const chunks = []

    readable.on("data", (chunk) => chunks.push(chunk))
    readable.on("error", reject)
    readable.on("end", () => resolve(Buffer.concat(chunks)))
  })
}

export function streamToString(readable, encoding = "utf8") {
  return streamToBuffer(readable).then((buffer) => buffer.toString(encoding))
}

export function pipeToPromise(readable, writable) {
  const promise = new Promise((resolve, reject) => {
    readable.on("error", (error) => reject(error))
    writable.on("error", (error) => reject(error))
    writable.on("finish", () => resolve())
  })
  readable.pipe(writable)
  return promise
}
