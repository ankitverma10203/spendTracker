import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpendTrackerDataModiferService {
  constructor(private http: HttpClient) {}

  deleteRecord(id: any): Observable<any> {
    console.log(id);
    return this.http.delete(
      environment.localBaseUrl + environment.storageType + '/deleteRecord',
      {
        body: id,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }),
      }
    );
  }
}
