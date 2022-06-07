import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpendTrackerDataRetrieverService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
   };

  getSpendTrackerData() {
    return this.http.get(environment.localBaseUrl + environment.storageType + "/read", this.httpOptions);
  }

  getAllDates() {
    return this.http.get(environment.localBaseUrl + environment.storageType + "/dates", this.httpOptions);
  }

  getAllTotalAmount() {
    return this.http.get(environment.localBaseUrl + environment.storageType + "/totalAmount", this.httpOptions);
  }
}
