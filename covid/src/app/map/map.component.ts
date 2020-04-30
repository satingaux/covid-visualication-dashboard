import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private api: ApiService, private http: HttpClient) { }
  DATA: any;
  ngOnInit(): void {
      // this.fetch();

    this.http.get('https://api.covid19india.org/data.json').subscribe(data => {
      this.DATA = data;
      this.getMapReady(this.DATA.statewise);
      this.drawDailyChart();
      this.drawTotalChart();
    });
  }

  getMapReady(statewise) {
    // console.log(statewise);
    const mappedstatewisedata = this.mapStatewiseData(statewise);
    google.charts.load('current', {
      packages: ['geomap'],
      // Note: you will need to get a mapsApiKey for your project.
      // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      mapsApiKey: 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
    });

    google.charts.setOnLoadCallback(drawRegionsMap);
    function drawRegionsMap() {
      const data = google.visualization.arrayToDataTable(

        mappedstatewisedata
        );
      const options = {
        // title: 'Daily',
        region: 'IN',
        resolution: 'provinces',
      // options.colorAxis = {colors: ['#e31b23', 'black', 'black', 'black', 'white']};
        backgroundColor: '#84ffff',
        datalessRegionColor: '#fff3e0',
        defaultColor: 'red',
        colorAxis: {minValue: 0, maxValue: mappedstatewisedata[1],  colors: ['#fff8e1', '#d50000']},

      };
      // options.title = 'India';

      const chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
      function myClickHandler() {
        const selection = chart.getSelection();
        let message = '';
        const item = selection[0];
        if (item.row != null && item.column != null) {
          message += '{row:' + item.row + ',column:' + item.column + '}';
        } else if (item.row != null) {
            message += '{row:' + item.row + mappedstatewisedata[item.row + 1] + '}';
            options.colorAxis = {minValue: 0, maxValue: mappedstatewisedata[item.row + 1], colors: ['#fff8e1', '#d50000']};
        } else if (item.column != null) {
            message += '{column:' + item.column + '}';
        }
        if (message === '') {
            message = 'nothing';
        }
        // console.log('you clicked:' + message);
        // alert('You selected ' + message);
      }

      google.visualization.events.addListener(chart, 'select', myClickHandler);
      chart.draw(data, options);

    }


  }

  async fetch() {
    this.http.get('https://api.covid19india.org/data.json').subscribe(data => {
      this.DATA = data;
    });
  }

  mapStatewiseData(statewise) {
    statewise.splice(0, 1);
    const mapStatewiseData = [['State', 'Active', 'Deaths']];

    // tslint:disable-next-line:forin
    for ( const key in statewise ) {
      if (statewise[key].state === 'Odisha') {
        statewise[key].state = 'Orissa';
      }
      mapStatewiseData.push([statewise[key].state,
                            parseInt(statewise[key].active),
                            // parseInt(statewise[key].confirmed),
                            parseInt(statewise[key].deaths)
                            // parseInt(statewise[key].deltaconfirmed),
                            // parseInt(statewise[key].deltadeaths),
                            // parseInt(statewise[key].deltarecovered),
                            // parseInt(statewise[key].recovered)
                          ]);
    }

    return mapStatewiseData;
  }

  drawDailyChart() {

    // console.log(this.DATA.cases_time_series[70]);
    const mapDailyData = [['Date', 'Daily Deceased', 'Daily Confirmed', 'Daily Recovered']];

    // tslint:disable-next-line:forin
    for ( const key in this.DATA.cases_time_series ) {
      mapDailyData.push([
                            this.DATA.cases_time_series[key].date,
                            parseInt(this.DATA.cases_time_series[key].dailydeceased),
                            parseInt(this.DATA.cases_time_series[key].dailyconfirmed),
                            parseInt(this.DATA.cases_time_series[key].dailyrecovered),
                        ]);
    }
    // console.log(this.DATA);
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        const data = google.visualization.arrayToDataTable(
          mapDailyData
        );

        const options = {
          // title: 'Daily',
          curveType: 'function',
          legend: { position: 'top' }
        };

        const chart = new google.visualization.LineChart(document.getElementById('daily_chart'));

        chart.draw(data, options);
      }
  }

  drawTotalChart()  {
    // console.log(this.DATA.cases_time_series[70]);
    const mapDailyData = [['Date', 'Total Deceased', 'Total Confirmed', 'Total Recovered']];

    // tslint:disable-next-line:forin
    for ( const key in this.DATA.cases_time_series ) {
      mapDailyData.push([
                            this.DATA.cases_time_series[key].date,
                            parseInt(this.DATA.cases_time_series[key].totaldeceased),
                            parseInt(this.DATA.cases_time_series[key].totalconfirmed),
                            parseInt(this.DATA.cases_time_series[key].totalrecovered),
                        ]);
    }
    // console.log(this.DATA);
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        const data = google.visualization.arrayToDataTable(
          mapDailyData
        );

        const options = {
          // title: 'Daily',
          curveType: 'function',
          legend: { position: 'top' }
        };

        const chart = new google.visualization.LineChart(document.getElementById('total_chart'));

        chart.draw(data, options);
      }
  }


}
