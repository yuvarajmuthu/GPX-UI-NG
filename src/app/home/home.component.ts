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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router,
    private userService: UserService,
    private datashareService: DatashareService, private zone: NgZone) { }

  Highcharts: any;
  chartConstructor = "mapChart";
  chartOptions: any;
  drilldown: any;
  properties: any;
  value: any;


  ngOnInit() {
    if (this.datashareService.isUserLogged()) {
      this.router.navigate(['/searchLegislator']);
    }
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
      el.drilldown = el.properties["hc-key"];
    });
    console.log(caMap);


    this.chartOptions = {
      chart: {
        // height: (8 / 16) * 100 + "%",
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
        text: "Usa Map ..."
      },
      // colorAxis: {
      //   min: 0,
      //   minColor: "#E6E7E8",
      //   maxColor: "#417BCC"
      // },

      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: "bottom"
        }
      },
      


            // colorAxis: {
            //     stops: [
            //         [0, '#3060cf'],
            //         [0.5, '#fffbbc'],
            //         [0.9, '#c4463a'],
            //         [1, '#c4463a']
            //     ],
            //     min: -15,
            //     max: 25,
            //     startOnTick: false,
            //     endOnTick: false,
            //     labels: {
            //         format: '{value}℃'
            //     }
            // },


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
            
            //boostThreshold: 100,
            borderWidth: 0,
            // nullColor: '#EFEFEF',
            // colsize: 24 * 36e5, // one day
            tooltip: {
                headerFormat: 'Temperature<br/>',
                pointFormat: '{point.x:%e %b, %Y} {point.y}:00: <b>{point.value} ℃</b> {point.properties.hc-key}'
            },
            //data: this.heatchartdata,
            // turboThreshold: 7000 // #3404, remove after 4.0.5 release
        }],
      drilldown: {}
    };
  }



// ----------------------------------
  private root: am5.Root;
  private chart: am4maps.MapChart

  ngAfterViewInit() {
    this.chart = am4core.create("line-chart", am4maps.MapChart);


    this.chart.geodata = am4geodata_worldLow
    this.chart.projection = new am4maps.projections.AlbersUsa();

    let polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ["AQ"];
    polygonSeries.useGeodata = true;

    // polygonSeries.set("heatRules", [{
    //   target: polygonSeries.mapPolygons.template,
    //   dataField: "value",
    //   min: am5.color(0xff621f),
    //   max: am5.color(0x661f00),
    //   key: "fill"
    // }]);

    polygonSeries.data.push(
      { id: "US-AL", value: 4447100, "fill": am4core.color("red") },
      { id: "US-AK", value: 626932 },
      { id: "US-AZ", value: 5130632 },
      { id: "US-AR", value: 2673400 },
      { id: "US-CA", value: 33871648 },
      { id: "US-CO", value: 4301261 },
      { id: "US-CT", value: 3405565 },
      { id: "US-DE", value: 783600 },
      { id: "US-FL", value: 15982378 },
      { id: "US-GA", value: 8186453 },
      { id: "US-HI", value: 1211537 },
      { id: "US-ID", value: 1293953 },
      { id: "US-IL", value: 12419293 },
      { id: "US-IN", value: 6080485 },
      { id: "US-IA", value: 2926324 },
      { id: "US-KS", value: 2688418 },
      { id: "US-KY", value: 4041769 },
      { id: "US-LA", value: 4468976 },
      { id: "US-ME", value: 1274923 },
      { id: "US-MD", value: 5296486 },
      { id: "US-MA", value: 6349097 },
      { id: "US-MI", value: 9938444 },
      { id: "US-MN", value: 4919479 },
      { id: "US-MS", value: 2844658 },
      { id: "US-MO", value: 5595211 },
      { id: "US-MT", value: 902195 },
      { id: "US-NE", value: 1711263 },
      { id: "US-NV", value: 1998257 },
      { id: "US-NH", value: 1235786 },
      { id: "US-NJ", value: 8414350 },
      { id: "US-NM", value: 1819046 },
      { id: "US-NY", value: 18976457 },
      { id: "US-NC", value: 8049313 },
      { id: "US-ND", value: 642200 },
      { id: "US-OH", value: 11353140 },
      { id: "US-OK", value: 3450654 },
      { id: "US-OR", value: 3421399 },
      { id: "US-PA", value: 12281054 },
      { id: "US-RI", value: 1048319 },
      { id: "US-SC", value: 4012012 },
      { id: "US-SD", value: 754844 },
      { id: "US-TN", value: 5689283 },
      { id: "US-TX", value: 20851820 },
      { id: "US-UT", value: 2233169 },
      { id: "US-VT", value: 608827 },
      { id: "US-VA", value: 7078515 },
      { id: "US-WA", value: 5894121 },
      { id: "US-WV", value: 1808344 },
      { id: "US-WI", value: 5363675 },
      { id: "US-WY", value: 493782 }
    );
    console.log(polygonSeries);
    let polygonTemplate = polygonSeries.mapPolygons.template;
    console.log(polygonTemplate, "polygonTemplate");

    polygonTemplate.tooltipText = "{name}:{value}";
    polygonTemplate.polygon.fillOpacity = 0.6;
    // polygonTemplate.fill=am4core.color("#74B267");
    polygonTemplate.propertyFields.fill = "fill";
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color('#74X999');
    if (polygonSeries.data[0].id == 'US-AL') {
      console.log("hi");

      // let hs =polygonTemplate.data[0].id=am4core.color('red');
    }

    // this.chart.legend = new am4maps.Legend();
    // this.chart.legend.position = "right";
    // this.chart.legend.align = "right";
    // polygonSeries.name = "Western Europe";

    // polygonSeries.heatRules.push({
    //   "property": "fill",
    //   "target": polygonSeries.mapPolygons.template,
    //   "min": am4core.color("#ffffff"),
    //   "max": am4core.color("#AAAA00"),
    //   "logarithmic": true
    // });
  }
  ngOnDestroy() {
    // if(this.chart){
    //   this.chart.dispose();
    // }
  }


}
