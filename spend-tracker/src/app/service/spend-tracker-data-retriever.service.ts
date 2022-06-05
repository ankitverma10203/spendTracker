import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.get("http://localhost:8080/tracker/read", this.httpOptions);
  }

  getAllDates() {
    return this.http.get("http://localhost:8080/tracker/dates", this.httpOptions);
  }

  getAllTotalAmount() {
    return this.http.get("http://localhost:8080/tracker/totalAmount", this.httpOptions);
  }
}
