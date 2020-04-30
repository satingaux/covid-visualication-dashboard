import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnInit {

  DATA: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://api.covid19india.org/state_district_wise.json').subscribe(data => {
      this.DATA = data;
      console.log(this.DATA);
      // this.getMapReady(this.DATA.statewise);
      // this.drawDailyChart();
      // this.drawTotalChart();
    });
  }

}
