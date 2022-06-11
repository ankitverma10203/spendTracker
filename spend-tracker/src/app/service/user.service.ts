import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormDataDTO } from '../model/tracker-info-dto.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  public isValidUser(userData: FormDataDTO): Observable<any> {
    return this.http.post(environment.localBaseUrlUser + "validateUser", userData, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  public saveUser(userData: FormDataDTO): Observable<any> {
    return this.http.post(environment.localBaseUrlUser + "saveUser", userData, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  public errorHandler(error:Response | any){
    if(error instanceof ErrorEvent){
      console.error("An error occured",error.message);
      return throwError("Something bad happenend");
    }
    else{
      console.error(`Backend returned code ${error.status}` +
      `body was: ${error.message}`);
      return throwError(error);
    }
  }
}
