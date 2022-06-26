import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserNameKey } from '../model/constants';

@Injectable({
  providedIn: 'root'
})
export class SpendTrackerDataRetrieverService {

  private username: string | null = "";

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }),
    params: new HttpParams().append(UserNameKey, this.getUsername())
  };

  private getUsername(): string {
    if (this.username != null && this.username != "") {
      return this.username;
    }
    this.username = localStorage.getItem(UserNameKey);
    return this.username ? this.username : "";
  }

  public getSpendTrackerData() {
    return this.http.get(environment.localBaseUrlTracker + environment.storageType + "/read", this.httpOptions).pipe(catchError(this.errorHandler));
  }

  public getAllDates() {
    return this.http.get(environment.localBaseUrlTracker + environment.storageType + "/dates", this.httpOptions).pipe(catchError(this.errorHandler));
  }

  public getAllTotalAmount() {
    return this.http.get(environment.localBaseUrlTracker + environment.storageType + "/totalAmount", this.httpOptions).pipe(catchError(this.errorHandler));
  }

  public errorHandler(error: Response | any) {
    if (error instanceof ErrorEvent) {
      console.error("An error occured", error.message);
      return throwError("Something bad happenend");
    }
    else {
      console.error(`Backend returned code ${error.status}` +
        `body was: ${error.message}`);
      return throwError(error);
    }
  }
}
