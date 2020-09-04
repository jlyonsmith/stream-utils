/// <reference types="node" />

import { Readable, Writable } from "stream"

export function stringToStream(s: string): Readable
export function streamToBuffer(readable: Readable): Promise<Buffer>
export function streamToString(s: Readable, encoding: string): Promise<string>
export function pipeToPromise(
  readable: Readable,
  writeable: Writable
): Promise<any>
