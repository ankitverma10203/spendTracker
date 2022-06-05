import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TrackerInfoDTO } from '../model/tracker-info-dto.model';

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

  sendSpendTrackerData(trackerInfo: TrackerInfoDTO ): Observable<any> {
    return this.http.post("http://localhost:8080/tracker/test", trackerInfo, this.httpOptions);
  }
}
