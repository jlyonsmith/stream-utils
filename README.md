# Stream Utilities

Contains a collection of [Node.js Stream](https://nodejs.org/dist/latest-v14.x/docs/api/stream.html) utilities.

- `stringToStream` - Create a `Readable` from a string
- `pipeToPromise` - `pipe` between a `Readable` and `Writable` stream returning a `Promise`
- `streamToBuffer` - Read a `Readable` into a `Buffer`.
