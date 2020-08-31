import { Readable, Writable } from "stream"

export const stringToStream = (s) =>
  new Readable({
    read() {
      this.push(s)
      // End of data
      this.push(null)
    },
  })

export const streamToBuffer = (readable) =>
  new Promise((resolve, reject) => {
    var chunks = []
    var writable = new Writable({
      write(chunk, encoding, callback) {
        chunks.push(chunk)
        // Successful write
        callback()
      },
    })

    readable.on("end", () => resolve(Buffer.concat(chunks)))
    readable.on("error", (error) => reject(error))
    readable.pipe(writable)
  })

export function pipeToPromise(readable, writable) {
  const promise = new Promise((resolve, reject) => {
    readable.on("error", (error) => reject(error))
    writable.on("error", (error) => reject(error))
    writable.on("finish", (file) => resolve(file))
  })
  readable.pipe(writable)
  return promise
}
