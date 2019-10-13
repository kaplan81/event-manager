import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Generic error handlers.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  /**
   * Handle all HTTP call errors in the same way.
   */
  handleHttpError(operation = 'operation'): (e: HttpErrorResponse) => never {
    return (error: HttpErrorResponse): never => {
      console.error(error); // log to console instead
      const message =
        error.error instanceof ErrorEvent
          ? // A client-side or network error occurred.
            error.error.message
          : // A server-side or network error occurred.
            `Server returned code ${error.status} with body "${error.error}"`;
      throw new Error(`${operation} failed::: ${message}`);
    };
  }
}
