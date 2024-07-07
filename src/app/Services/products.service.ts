import { Injectable } from '@angular/core';
import { Iproduct } from '../Models/iproduct';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { json } from 'stream/consumers';
import { APIResponseVM } from '../ViewModels/apiresponse-vm';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpOption;
  constructor(private httpClient: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // ,Authorization: 'my-auth-token'
      }),
    };
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

  getAllProducts(): Observable<Iproduct[]> {
    // Repository Design Pattern
    // return this.genericAPIHandler.getAll('/Products').pipe(
    //   map((APIResponseVM: APIResponseVM)=>APIResponseVM.data)
    // )
    return this.httpClient
      .get<Iproduct[]>(`${environment.APIURL}/Products`)
      .pipe(retry(2), catchError(this.handleError));
    // return this.httpClient.get<Iproduct[]>(`http://localhost:3000/Products`);
  }

  getProductsByCatID(catID: number): Observable<Iproduct[]> {
    return this.httpClient
      .get<Iproduct[]>(`${environment.APIURL}/Products?categoryID=${catID}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllProductByID(prdID: number): Observable<Iproduct> {
    return this.httpClient
      .get<Iproduct>(`${environment.APIURL}/Products/${prdID}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  addProduct(newPrd: Iproduct): Observable<Iproduct> {
    // return this.httpClient.post<Iproduct>(`${environment.APIURL}/Products`, JSON.stringify(newPrd), this.httpOption)
    // return this.httpClient
    //   .post<Iproduct>(
    //     `${environment.APIURL}/Products`,
    //     JSON.stringify(newPrd),
    //     this.httpOption
    //   )
    //   .pipe(
    //     retry(2),
    //     catchError(err=>{
    //       console.log(err);
    //       return throwError(()=>{
    //         new Error ("Post Erro")
    //       })
    //     })
    //   );

    return this.httpClient
      .post<Iproduct>(
        `${environment.APIURL}/Products`,
        JSON.stringify(newPrd),
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  updateProduct(prdID: number, UpdatedPrd: Iproduct) {}

  deleteProduct(prdID: number) {}
}
