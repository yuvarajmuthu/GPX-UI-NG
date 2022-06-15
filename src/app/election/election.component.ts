
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { UserService } from '../services/user.service';
import { DatashareService } from '../services/datashare.service';
import * as am5 from '@amcharts/amcharts5';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4themes_Animated from '@amcharts/amcharts4/themes/Animated';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/usaHigh';
import * as Highcharts from "highcharts/highmaps";
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);

declare var require: any;

am4core.useTheme(am4themes_Animated);
@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.scss']
})
export class ElectionComponent {

  constructor() { }

  Highcharts: any;
  chartConstructor = "mapChart";
  chartOptions: any;
  drilldown: any;
  properties: any;
  value: any;

  datadisplay=[
    {product:"apple",id:"25"},
    {product:"apple2",id:"250"},
    {product:"apple3",id:"2500"},
    {product:"apple4",id:"250000"},
    {product:"apple5",id:"250000"}
]

  ngOnInit() {
    this.UsaMAp();
  }
  UsaMAp() {
    this.Highcharts = Highcharts;
    const caMapData = require("@highcharts/map-collection/countries/us/us-all.geo.json");
    const caMap = Highcharts.geojson(caMapData);
    console.log(caMap);
    // Set a random value on map
    caMap.forEach((el: any, i) => {
      el.value = i;
      if (i < 20) {
        el.color = 'blue'
      } else {
        el.color = 'red'
      }
      el.drilldown = el.properties["hc-key"];
    });
    console.log(caMap);


    this.chartOptions = {
      chart: {
        height: (10 / 16) * 100 + "%",
        events: {
          drilldown(e: any) {
            const chart = this as any;

            // let mapKey = "countries/us/" + e.point.drilldown + "-all";
            // console.log(this.mapKey,"mapKey","countries/us/us-sd-all");

            //Stackbliz wont load data if you pass mapkey as variable. So I use a hard code one in this example.
            // const mapData = require(`@highcharts/map-collection/${mapKey}.geo.json`);
            // const mapData = require('@highcharts/map-collection/' +mapKey +'.geo.json');
            // console.log(mapData);
            const mapData = require("@highcharts/map-collection/countries/us/" + e.point.drilldown + "-all.geo.json");
            // const mapData = require(`@highcharts/map-collection/countries/us/us-all.geo.json`);
            const provinceData = Highcharts.geojson(mapData);

            // Set a random value on map
            provinceData.forEach((el: any, i) => {
              el.value = i;
            });

            chart.addSeriesAsDrilldown(e.point, {
              name: e.point.name,
              data: provinceData,

              // after click state name display on map
              dataLabels: {
                enabled: true,
                format: '{point.name}'
              }
            });

            chart.setTitle(null, { text: e.point.name });
          },
          drillup() {
            const chart = this as any;
          }
        }
      },
      title: {
        text: "Usa Map ...",
        useHTML: true,
      },
      
      // zoom
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: "bottom"
        }
      },
      // on hover USA map effect
      plotOptions: {
        map: {
          states: {
            hover: {
              color: "#F8BA03"
            }
          }
        }
      },
      series: [{
        data: caMap,
        name: 'Random data...........',
        states: {
          hover: {
            color: '#BADA55'
          }
        },
        dataLabels: {
          enabled: true,
          format: '{point.properties.hc-a2}'
        },
      }],
      tooltip: {
        borderRadius: 8,
        borderWidth: 0,
        // backgroundColor: 'white',
        // borderColor: 'black',
        // headerFormat: 'Temperature<br/>',
        // // pointFormat: '{point.x:%e %b, %Y} {point.y}:00: <b>{point.value} ℃</b> {point.properties.hc-key}'
        // pointFormat: '{point.value}<br/>' +
        //   '<span class="header-name">Color:</span> <div class="header-sub-name">{point.color}</div><br/>' +
        //   '<span class="header-name">Name:</span> <div class="header-sub-name" style="color:"blue">{point.name}</div><br/>' +
        //   '<span class="header-name">Latitude:</span> <div class="header-sub-name">{point.properties.latitude}</div><br/>' +
        //   '<span class="header-name">Longitude:</span> <div class="header-sub-name">{point.properties.longitude}</div><br/>',

        // pointFormat: '<table class=\"table\"><thead><tr><th scope=\"col\">#</th><th scope=\"col\">First</th><th scope=\"col\">Last</th><th scope=\"col\">Handle</th></tr></thead><tbody><tr><th scope=\"row\">1</th><td>Mark</td><td>Otto</td><td>@mdo</td></tr><tr><th scope=\"row\">2</th><td>Jacob</td><td>Thornton</td><td>@fat</td></tr><tr><th scope=\"row\">3</th><td>Larry</td><td>the Bird</td><td>@twitter</td></tr></tbody></table>'

        // headerFormat: '<span style="font-size:13px">{point.value}</span><table>',
        // pointFormat: '<tr><th style="color:"blue";padding:0">abc</th></tr>'+
        // '<tr><td style="color:"blue";padding:0">abc</td><td style="color:"blue";padding:0">abc</td></tr>'+
        // '<tr><td style="color:"blue";padding:0">abc</td></tr>',


        shared: true,
        useHTML: true,
        headerFormat: '<div style="border-bottom:1px solid red;">Temperature</div>',
        // pointFormat: '<table class="table">'+
        //             '<tr>'+
        //               '<th>Product Color</th>'+
        //               '<th>id</th>'+
        //             '</tr>'+
        //             '<tr >'+
        //             '<td>{point.color} </td>' +
        //             '<td>{point.value}</td>'+
        //             '</tr>',
        // footerFormat: '</table>',
        pointFormat: '<div class="card">'+
        '<div class="card-body">'+
          '<h4 class="card-title">Basic Table</h4>'+
          '<p class="card-description">'+
            'Basic table with card'+
          '</p>'+
          '<div class="table-responsive">'+
            '<table class="table">'+
              '<thead>'+
                '<tr>'+
                  '<th>Name</th>'+
                  '<th>ID No.</th>'+
                  '<th>Created On</th>'+
                  '<th>Status</th>'+
                '</tr>'+
              '</thead>'+
              '<tbody>'+
                '<tr>'+
                  '<td>Samso Park</td>'+
                  '<td>34424433</td>'+
                  '<td>12 May 2017</td>'+
                  '<td><label class="badge badge-danger">Pending</label></td>'+
                '</tr>'+
                '<tr>'+
                  '<td>Marlo Sanki</td>'+
                  '<td>53425532</td>'+
                  '<td>15 May 2015</td>'+
                  '<td><label class="badge badge-warning">In progress</label></td>'+
                '</tr>'+
                '<tr>'+
                  '<td>John ryte</td>'+
                  '<td>53275533</td>'+
                  '<td>14 May 2017</td>'+
                  '<td><label class="badge badge-info">Fixed</label></td>'+
                '</tr>'+
                '<tr>'+
                  '<td>Peter mark</td>'+
                  '<td>53275534</td>'+
                  '<td>16 May 2017</td>'+
                  '<td><label class="badge badge-success">Completed</label></td>'+
                '</tr>'+
                '<tr>'+
                  '<td>Dave</td>'+
                  '<td>53275535</td>'+
                  '<td>20 May 2017</td>'+
                  '<td><label class="badge badge-warning">In progress</label></td>'+
                '</tr>'+
              '</tbody>'+
            '</table>'+
          '</div>'+
        '</div>'+
      '</div>',
        footerFormat: '',
        valueDecimals: 2,
        outside: true,
        // formatter: function(tooltip:any) {
        //   var s = "";
        //   datadisplay.forEach((el: any, index) => {
        //     console.log(index);
        //     // s += `<span>${el.product}</span>: <b>${el.product}</b><br>`;
        //     s += `'<table class="table">'+
           
        //     <tr >
        //     '<td>${el.product}</td>' +
        //     '<td>${el.id}</td>'+
        //     '</tr>'+
        //     </table>'`
        //   });
        //   return s;
        // }
      },
      drilldown: {}
    };
  }

filter(){
  console.log("filter");
  
  this.Highcharts = Highcharts;
    const caMapData = require("@highcharts/map-collection/countries/us/us-all.geo.json");
    const caMap = Highcharts.geojson(caMapData);
    console.log(caMap);
    // Set a random value on map
    caMap.forEach((el: any, i) => {
      el.value = i;
      if (i > 20) {
        el.color = 'blue'
      } else {
        el.color = 'red'
      }
      el.drilldown = el.properties["hc-key"];
    });
    console.log(caMap);
  this.chartOptions = {
    chart: {
      height: (10 / 16) * 100 + "%",
      events: {
        drilldown(e: any) {
          const chart = this as any;
          const mapData = require("@highcharts/map-collection/countries/us/" + e.point.drilldown + "-all.geo.json");
          const provinceData = Highcharts.geojson(mapData);
          // Set a random value on map
          provinceData.forEach((el: any, i) => {
            el.value = i;
          });
          chart.addSeriesAsDrilldown(e.point, {
            name: e.point.name,
            data: provinceData,
            // after click state name display on map
            dataLabels: {
              enabled: true,
              format: '{point.name}'
            }
          });
          chart.setTitle(null, { text: e.point.name });
        },
        drillup() {
          const chart = this as any;
        }
      }
    },
    title: {
      text: "Usa Map ...",
      useHTML: true,
    },
    // zoom
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: "bottom"
      }
    },
    // on hover USA map effect
    plotOptions: {
      map: {
        states: {
          hover: {
            color: "#F8BA03"
          }
        }
      }
    },
    series: [{
      data: caMap,
      name: 'Random data...........',
      states: {
        hover: {
          color: '#BADA55'
        }
      },
      dataLabels: {
        enabled: true,
        format: '{point.properties.hc-a2}'
      },
    }],
    tooltip: {
      borderRadius: 8,
      borderWidth: 0,
      shared: true,
      useHTML: true,
      headerFormat: '<div style="border-bottom:1px solid red;">Temperature</div>',
      pointFormat: '<div class="card">'+
      '<div class="card-body">'+
        '<h4 class="card-title">Basic Table</h4>'+
        '<p class="card-description">'+
          'Basic table with card'+
        '</p>'+
        '<div class="table-responsive">'+
          '<table class="table">'+
            '<thead>'+
              '<tr>'+
                '<th>Name</th>'+
                '<th>ID No.</th>'+
                '<th>Created On</th>'+
                '<th>Status</th>'+
              '</tr>'+
            '</thead>'+
            '<tbody>'+
              '<tr>'+
                '<td>Samso Park</td>'+
                '<td>34424433</td>'+
                '<td>12 May 2017</td>'+
                '<td><label class="badge badge-danger">Pending</label></td>'+
              '</tr>'+
              '<tr>'+
                '<td>Marlo Sanki</td>'+
                '<td>53425532</td>'+
                '<td>15 May 2015</td>'+
                '<td><label class="badge badge-warning">In progress</label></td>'+
              '</tr>'+
              '<tr>'+
                '<td>John ryte</td>'+
                '<td>53275533</td>'+
                '<td>14 May 2017</td>'+
                '<td><label class="badge badge-info">Fixed</label></td>'+
              '</tr>'+
              '<tr>'+
                '<td>Peter mark</td>'+
                '<td>53275534</td>'+
                '<td>16 May 2017</td>'+
                '<td><label class="badge badge-success">Completed</label></td>'+
              '</tr>'+
              '<tr>'+
                '<td>Dave</td>'+
                '<td>53275535</td>'+
                '<td>20 May 2017</td>'+
                '<td><label class="badge badge-warning">In progress</label></td>'+
              '</tr>'+
            '</tbody>'+
          '</table>'+
        '</div>'+
      '</div>'+
    '</div>',
      footerFormat: '',
      valueDecimals: 2,
      outside: true,
    },
    drilldown: {}
  };
}

  // // ----------------------------------
  // private root: am5.Root;
  // private chart: am4maps.MapChart

  // ngAfterViewInit() {
  //   this.chart = am4core.create("line-chart", am4maps.MapChart);


  //   this.chart.geodata = am4geodata_worldLow
  //   this.chart.projection = new am4maps.projections.AlbersUsa();

  //   let polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries());
  //   polygonSeries.exclude = ["AQ"];
  //   polygonSeries.useGeodata = true;

  //   // polygonSeries.set("heatRules", [{
  //   //   target: polygonSeries.mapPolygons.template,
  //   //   dataField: "value",
  //   //   min: am5.color(0xff621f),
  //   //   max: am5.color(0x661f00),
  //   //   key: "fill"
  //   // }]);

  //   polygonSeries.data.push(
  //     { id: "US-AL", value: 4447100, "fill": am4core.color("red") },
  //     { id: "US-AK", value: 626932 },
  //     { id: "US-AZ", value: 5130632 },
  //     { id: "US-AR", value: 2673400 },
  //     { id: "US-CA", value: 33871648 },
  //     { id: "US-CO", value: 4301261 },
  //     { id: "US-CT", value: 3405565 },
  //     { id: "US-DE", value: 783600 },
  //     { id: "US-FL", value: 15982378 },
  //     { id: "US-GA", value: 8186453 },
  //     { id: "US-HI", value: 1211537 },
  //     { id: "US-ID", value: 1293953 },
  //     { id: "US-IL", value: 12419293 },
  //     { id: "US-IN", value: 6080485 },
  //     { id: "US-IA", value: 2926324 },
  //     { id: "US-KS", value: 2688418 },
  //     { id: "US-KY", value: 4041769 },
  //     { id: "US-LA", value: 4468976 },
  //     { id: "US-ME", value: 1274923 },
  //     { id: "US-MD", value: 5296486 },
  //     { id: "US-MA", value: 6349097 },
  //     { id: "US-MI", value: 9938444 },
  //     { id: "US-MN", value: 4919479 },
  //     { id: "US-MS", value: 2844658 },
  //     { id: "US-MO", value: 5595211 },
  //     { id: "US-MT", value: 902195 },
  //     { id: "US-NE", value: 1711263 },
  //     { id: "US-NV", value: 1998257 },
  //     { id: "US-NH", value: 1235786 },
  //     { id: "US-NJ", value: 8414350 },
  //     { id: "US-NM", value: 1819046 },
  //     { id: "US-NY", value: 18976457 },
  //     { id: "US-NC", value: 8049313 },
  //     { id: "US-ND", value: 642200 },
  //     { id: "US-OH", value: 11353140 },
  //     { id: "US-OK", value: 3450654 },
  //     { id: "US-OR", value: 3421399 },
  //     { id: "US-PA", value: 12281054 },
  //     { id: "US-RI", value: 1048319 },
  //     { id: "US-SC", value: 4012012 },
  //     { id: "US-SD", value: 754844 },
  //     { id: "US-TN", value: 5689283 },
  //     { id: "US-TX", value: 20851820 },
  //     { id: "US-UT", value: 2233169 },
  //     { id: "US-VT", value: 608827 },
  //     { id: "US-VA", value: 7078515 },
  //     { id: "US-WA", value: 5894121 },
  //     { id: "US-WV", value: 1808344 },
  //     { id: "US-WI", value: 5363675 },
  //     { id: "US-WY", value: 493782 }
  //   );
  //   console.log(polygonSeries);
  //   let polygonTemplate = polygonSeries.mapPolygons.template;
  //   console.log(polygonTemplate, "polygonTemplate");

  //   polygonTemplate.tooltipText = "{name}:{value}";
  //   polygonTemplate.polygon.fillOpacity = 0.6;
  //   // polygonTemplate.fill=am4core.color("#74B267");
  //   polygonTemplate.propertyFields.fill = "fill";
  //   let hs = polygonTemplate.states.create("hover");
  //   hs.properties.fill = am4core.color('#74X999');
  //   if (polygonSeries.data[0].id == 'US-AL') {
  //     console.log("hi");

  //     // let hs =polygonTemplate.data[0].id=am4core.color('red');
  //   }

  //   // this.chart.legend = new am4maps.Legend();
  //   // this.chart.legend.position = "right";
  //   // this.chart.legend.align = "right";
  //   // polygonSeries.name = "Western Europe";

  //   // polygonSeries.heatRules.push({
  //   //   "property": "fill",
  //   //   "target": polygonSeries.mapPolygons.template,
  //   //   "min": am4core.color("#ffffff"),
  //   //   "max": am4core.color("#AAAA00"),
  //   //   "logarithmic": true
  //   // });
  // }
  // ngOnDestroy() {
  //   // if(this.chart){
  //   //   this.chart.dispose();
  //   // }
  // }


}
