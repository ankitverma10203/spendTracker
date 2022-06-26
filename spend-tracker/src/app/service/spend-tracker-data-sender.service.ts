import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormDataDTO } from '../model/tracker-info-dto.model';
import { environment } from 'src/environments/environment';
import { UserNameKey } from '../model/constants';

@Injectable({
  providedIn: 'root'
})
export class SpendTrackerDataSenderService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
   };

  sendSpendTrackerData(trackerInfo: FormDataDTO ): Observable<any> {
    let username: string | null = localStorage.getItem(UserNameKey);
    trackerInfo[UserNameKey] = username?username:"";
    return this.http.post(environment.localBaseUrlTracker + environment.storageType + "/save", trackerInfo, this.httpOptions).pipe(catchError(this.errorHandler));
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
