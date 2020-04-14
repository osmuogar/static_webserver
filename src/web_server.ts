/**
 * MIT License
 *
 * Copyright (c) 2017 osmuogar
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

import * as Express from 'express';
import * as fs from 'fs';
import * as helmet from 'helmet';
import * as http from 'http';
import * as requestIp from 'request-ip';
import { isNumber, isString } from 'util';
import { Logger } from './logger';

/**
 * Service configuration interface.
 */
export interface ServiceConfiguration {
  staticFolderPath: string;
  port: number;
}

/**
 * Class with exports a server with the singleton pattern.
 */
export class WebServer {

  /** HTTP server. */
  protected server: http.Server;
  /** Express application. */
  protected readonly app: Express.Application;
  /** Logger instance. */
  protected readonly logger: Logger;

  /**
   * Constructor method of the class.
   * @param config server configuration
   */
  constructor(config: ServiceConfiguration) {

    // Initialize express
    this.app = Express();

    // Additional express configuration
    this.configCheck(config);

    // Create the logger instance
    this.logger = new Logger();

    // Set the server API
    this.serverAPI();

  }

  /**
   * Checks the configuration of the server.
   * @param config configuration of the server.
   */
  protected configCheck(config: ServiceConfiguration) {
    // Check the static folder
    if (
      !config.staticFolderPath ||
      !isString(config.staticFolderPath) ||
      !fs.existsSync(config.staticFolderPath)
    ) {
      throw Error(
        'Invalid param config.staticFolderpath: ' +
        JSON.stringify(config.staticFolderPath)
      );
    }
    // Recommended for security reasons to use the full path
    this.app.set('staticFolderPath', fs.realpathSync(config.staticFolderPath));

    // Checks for the port parameter
    if (
      !config.port ||
      !isNumber(config.port) ||
      config.port < 0 ||
      config.port > 65535
    ) {
      throw Error(
        'Invalid param config.port: ' +
        JSON.stringify(config.port)
      );
    }
    this.app.set('port', config.port);
  }

  /**
   * Sets the server API
   */
  protected serverAPI(): void {

    // Disables various HTTP headers for security reasons
    this.app.use(helmet());

    // When any message is received this will publish a log
    this.app.use((req: Express.Request, res: Express.Response,
      next: Express.NextFunction) => {

      this.logger.log(Logger.LEVEL.INFO,
        requestIp.getClientIp(req) + ' ' +
        req.method + ' ' +
        req.path + '.'
      );

      next();

    });

    // Exposing public folder
    this.logger.log(
      Logger.LEVEL.INFO,
      'Exposing folder ' + this.app.get('staticFolderPath') + "."
    );
    this.app.use(Express.static(this.app.get('staticFolderPath')));

    this.app.get('*', (req: Express.Request, res: Express.Response,
      next: Express.NextFunction) => {
        res.redirect('/');
        next();
    });

  }

  /**
   * Start the server.
   */
  listen(): void {

    this.server = http.createServer(this.app).listen(
      this.app.get('port'), () => {
        this.logger.log(
          Logger.LEVEL.INFO,
          "Server running on port " + this.app.get('port') + "."
        );
      });

  }

  /**
   * Stops the server.
   */
  close(): void {

    if (
      this.server &&
      this.server.listening
    ) {
      this.server.close(() => {
        this.logger.log(Logger.LEVEL.INFO, "Server stopped.");
      });
    }

  }

}
