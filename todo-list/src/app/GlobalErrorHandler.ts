//this file is used to manage the GlobalErrorHandler, handling errors so that users dont see the errors but save the errors for better development of the site

import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationStrategy } from '@angular/common';
// the GlobalErrorHandler class inherits from the ErrorHandler class that was imported
//The ErrorHandler class is resposible for handling all unhandled errors by default, we need to customize it to be able to handle other errors
@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  constructor(
    private httpClient: HttpClient,
    private locationStrategy: LocationStrategy
  ) {
    super();
  }
  override handleError(error: any): void {
    var errorEvent = {
      path: this.locationStrategy.path(),
      message: error.message ?? error.toString(),
      handler: 'GlobalErrorHnadler',
      user: 'the-id-of-the-current-user',
      time: new Date(),
      stack: error.stack,
    };
    this.httpClient
      .post('http://localhost:3002/errors', errorEvent)
      .subscribe(() => {});
  }
}
