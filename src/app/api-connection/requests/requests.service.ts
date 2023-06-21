import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  response: string = '';
  url: string = 'https://index-bislat-back.azurewebsites.net/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    responseType: 'text',
  }

  constructor(private http: HttpClient) { }

  postRequest(httpURL: string, item: any): Observable<string> {

    return this.http.post(this.url + httpURL, JSON.stringify(item), {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
    });
  }

  GetRequest(httpURL: string) {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", (this.url + httpURL), false); // false for synchronous request
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
  }

  DeleteRequest(httpURL: string) {
    return this.http.delete(this.url + httpURL, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' },
    );
  }

  PutRequest(httpURL: string, item: any) {
    return this.http.put(this.url + httpURL, JSON.stringify(item), {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
    })
  }
}
