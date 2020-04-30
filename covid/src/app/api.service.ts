import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {

  public data = {};
  constructor(private http: HttpClient) {}

  ngOnInit()  {
    console.log("ngonint");
    this.fetch();
  }

  fetch() {
    this .http.get('https://api.covid19india.org/data.json').subscribe(data => {
      this.data = data;
      console.log(data);
      return data;
    });
  }
}
