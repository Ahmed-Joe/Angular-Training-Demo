import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { constructor } from 'assert';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { APIResponseVM } from '../ViewModels/apiresponse-vm';
@Injectable({
  providedIn: 'root',
})
export class GenericAPIHandlerService {
  httpOptions;
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // ,Authorization: 'my-auth-token'
      }),
    };
  }
  // in case you need access token, this function for that
  private setHeader(key: string, value: string) {
    this.httpOptions.headers.set(key, value);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 500) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  getAll(APIRoute: string): Observable<APIResponseVM> {
    return this.httpClient
      .get<APIResponseVM>(`${environment}/${APIRoute}`)
      .pipe(retry(3), catchError(this.handleError));
  }
  // search(searchItems: string[]): Observable<APIResponseVM> {}
  // getByID(id: string): Observable<APIResponseVM> {}
  // post(newObject: any): Observable<APIResponseVM> {}
  // put(id: string, newObject: any): Observable<APIResponseVM> {}
  // delete(id: string): Observable<APIResponseVM> {}
}
