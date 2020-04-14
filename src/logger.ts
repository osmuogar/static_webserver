/**
 * MIT License
 * 
 * Copyright (c) 2017-present, Óscar Muñoz Garrigós
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { Writable } from 'stream';

export class Logger {

  private output: Writable;

  /** 
   * Builds a logger where to place logs and messages.
   * @todo add capability for an external logger.
   * @param path path where to create the file.
   */
  constructor() {

    this.output = process.stdout;

  }

  /**
   * Formats a message adding a date.
   * @param message message to be formatted.
   */
  private formatMessage(level: string, message: string): string {
    let now: Date = new Date();
    return now.getUTCDate() + '-' +
      (now.getUTCMonth() + 1) + '-' +
      now.getUTCFullYear() + ' ' +
      now.getUTCHours() + ':' +
      now.getUTCMinutes() + ':' +
      now.getUTCSeconds() + ' ' +
      level + '. ' +
      message + '\n';
  }

  /**
   * Writes a message to the logger output.
   * @param level log level.
   * @param message message to be written.
   */
  log(level: Logger.LEVEL, message: string) {
    if (this.output) {
      this.output.write(this.formatMessage(level, message));
    }
  }

}

export module Logger {

  /** Severity of the log. */
  export enum LEVEL {
    OFF = 'OFF', // Log must finish
    FATAL = 'FATAL', // Service must finish
    ERROR = 'ERROR', // Error
    WARN = 'WARN', // Warning
    INFO = 'INFO', // Info
    DEBUG = 'DEBUG', // Debug
    TRACE = 'TRACE', // Detailed information
    ALL = 'ALL' // All log levels
  }

}
