import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import mapboxgl from 'mapbox-gl';
import classes from './MapBox.module.css';
import covid from '../../assets/data/time_series_covid19_confirmed_US.csv';
//import { data } from 'autoprefixer';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/src/stylesheets/datepicker.scss";
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";

import { Container, Row, Col,Button } from 'react-bootstrap';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';


// https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/#variable-binding
// https://docs.mapbox.com/mapbox-gl-js/example/data-driven-circle-colors/
// https://docs.mapbox.com/help/tutorials/mapbox-gl-js-expressions/
//https://dev.to/laney/react-mapbox-beginner-tutorial-2e35
class MapBox extends Component {

  state = {
    viewport: {
      latitude: 39.50,
      longitude: -98.35,
      zoom: 3.5,
      bearing: 0,
      pitch: 0,
      width: "100%",
      height: 500
    },
    popupInfo: null,
    df: [],
    startDate: new Date("2020/1/22"),
    endDate: new Date("2020/11/1"),
    m:1
  };

  map = null
  RefFilter = React.createRef()
  current = this.state.df
  m = 1
  legend_radius = null

  async loadData() {
    d3.csv(covid, dd => {
      var self = this
      const timeFormat = d3.timeFormat('%m/%d/%y')
      var start = timeFormat(this.state.startDate).replaceAll("/0", "/")[0] == "0" ? timeFormat(this.state.startDate).replaceAll("/0", "/").substring(1) : timeFormat(this.state.startDate).replaceAll("/0", "/")
      var end = timeFormat(this.state.endDate).replaceAll("/0", "/")[0] == "0" ? timeFormat(this.state.endDate).replaceAll("/0", "/").substring(1) : timeFormat(this.state.endDate).replaceAll("/0", "/")
      return {

        //state:dd["Province_State"],county:dd["Admin2"],value:dd["11/1/20"],lon:dd["Long_"],lat:dd["Lat"]}
        "type": "Feature",
        "properties": {
          "value": +dd[end] - (+dd[start]),
          "state": dd["Province_State"],
          "county": dd["Admin2"]
        },
        "geometry": {
          "type": "Point",
          "coordinates": [dd["Long_"], dd["Lat"]]
        }

      }
    })
      .then(d => {
        this.setState({ df: { "type": "FeatureCollection", "features": d } })
        this.draw()
        console.log("lod",this.m)
      })
  }

  async componentDidMount() {
    this.loadData()
  }

  changeDateHandler = () => {

    d3.csv(covid, dd => {
      var self = this
      const timeFormat = d3.timeFormat('%m/%d/%y')
      var start = timeFormat(this.state.startDate).replaceAll("/0", "/")[0] == "0" ? timeFormat(this.state.startDate).replaceAll("/0", "/").substring(1) : timeFormat(this.state.startDate).replaceAll("/0", "/")
      var end = timeFormat(this.state.endDate).replaceAll("/0", "/")[0] == "0" ? timeFormat(this.state.endDate).replaceAll("/0", "/").substring(1) : timeFormat(this.state.endDate).replaceAll("/0", "/")
      return {

        //state:dd["Province_State"],county:dd["Admin2"],value:dd["11/1/20"],lon:dd["Long_"],lat:dd["Lat"]}
        "type": "Feature",
        "properties": {
          "value": +dd[end] - (+dd[start]),
          "state": dd["Province_State"],
          "county": dd["Admin2"]
        },
        "geometry": {
          "type": "Point",
          "coordinates": [dd["Long_"], dd["Lat"]]
        }

      }
    })
      .then(d => {
        this.setState({ df: { "type": "FeatureCollection", "features": d } })
        // this.drawLayer(this.map)
        this.map.removeLayer('polygon')
        this.map.removeSource('mapdata')


        this.map.addSource('mapdata', {
          type: 'geojson',
          data: this.state.df
        });

        this.setState({m:d3.max(this.state.df.features.map(d => d.properties.value))})
        var m_city = this.state.df.features.filter(d=>d.properties.value==this.state.m)[0]


        this.map.addLayer({
          "id": "polygon",
          "type": "circle",
          "source": "mapdata",
          "layout": {},
          "paint": {
            "circle-radius": ["/", ['to-number', ['get', 'value'], 1], this.state.m / 100],
            "circle-color": "DarkRed",
            "circle-opacity": 0.8
          }

        });
        var format = d3.format('.1s')
        const timeFormat = d3.timeFormat('%m/%d/%Y')
        // d3.select(this.legend).select("text").text("hello! The highest number of covid case is around "+format(this.state.m)+" in "+m_city.properties.state+" "+m_city.properties.county)
        var legend = d3.select(this.legend).select("text")
        legend.select(".tspan1").attr("x",0).attr("dy", "0em")
        .text("From "+timeFormat(this.state.startDate)+" to "+timeFormat(this.state.endDate))
        legend.select(".tspan2").attr("x",0).attr("dy", "1.5em")
        .text("The highest increase of covid cases was around "+format(this.state.m)+" in "+m_city.properties.state+"-"+m_city.properties.county)
        this.toggleFilter("#all")
      



      })
  }

  drawLayer(map) {
    console.log("draw layer")
    var self = this
    console.log("self.state.df", self.state.df)
    map.on('load', function () {

      map.addSource('mapdata', {
        type: 'geojson',
        data: self.state.df
      });
      self.setState({m:d3.max(self.state.df.features.map(d => d.properties.value))})
      // self.m = d3.max(self.state.df.features.map(d => d.properties.value))
      console.log("drawlayer_m",self.state.m)
      var m_city = self.state.df.features.filter(d=>d.properties.value==self.state.m)[0]
      console.log(m_city)

      var covid_data = self.state.df.features.map(d => d.properties.value)
      console.log("dd",[d3.quantile(Object.values(covid_data).sort(d3.ascending), 0.15),d3.quantile(Object.values(covid_data).sort(d3.ascending), 0.5),d3.quantile(Object.values(covid_data).sort(d3.ascending), 0.985)])

      map.addLayer({
        "id": "polygon",
        "type": "circle",
        "source": "mapdata",
        "layout": {},
        "paint": {
        "circle-radius": ["/", ['to-number', ['get', 'value'], 1], self.state.m / 100],
        "circle-color": "DarkRed",
        "circle-opacity": 0.7,
        // 'fill-color': [ 'interpolate', ['linear'], ["/", ['to-number', ['get', 'value'], 1], self.state.m / 40000], 0, '#F2F12D', 10000, '#E6B71E', 20000, '#DA9C20', 30000, '#B86B25', 40000, '#8B4225'],  //OK - interpolate color proportional to AREA property with a factor of 0.5
        // 'fill-opacity': 0.8,
        }

      });
  
    var svg = d3.select(self.legend).append("svg").attr("width","500").attr("height","40")
    var format = d3.format('.1s')
    const timeFormat = d3.timeFormat('%m/%d/%Y')
    const legend = svg.append('g').append('text')
      legend.attr('None', 'red')
      .attr('transform', 'translate(0,10)')
      // .attr('text-anchor', 'middle')
      .attr("alignment-baseline","middle")
      .style('font', '14px sans-serif')
      
      legend.append("tspan").attr("x",0).attr("dy", "0em").attr("class","tspan1")
      .text("From "+timeFormat(self.state.startDate)+" to "+timeFormat(self.state.endDate))
      legend.append("tspan").attr("x",0).attr("dy", "1.5em").attr("class","tspan2")
      .text("The highest increase of covid cases was around "+format(self.state.m)+" in "+m_city.properties.state+"-"+m_city.properties.county)
    d3.select(self.legend).style("display","block")
    })
  };



  draw() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXBwbGVraW5nIiwiYSI6ImNrZm1kZzd1dTFoZXEyeWxkbXZ4a21vY3UifQ.KsSDa37AWc9h8u4eTRY19A';
    console.log("this.state", this.state)
    this.map = new mapboxgl.Map({
      container: this.mapContainer, // container id
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [this.state.viewport.longitude, this.state.viewport.latitude], // starting position [lng, lat]
      zoom: this.state.viewport.zoom // starting zoom
    });
    console.log(this.state.df)
    this.drawLayer(this.map)

  }
  toggleFilter(id) {

    d3.selectAll("span")
      .style('background-color', '#FFF0F5');

    d3.select(id)
      .style('background-color', 'rgb(241, 140, 8)');
  }

  filter(n) {
    var data = this.state.df.features.sort((a, b) => d3.descending(a.properties.value, b.properties.value));
    var current = { "type": "FeatureCollection", "features": data.slice(0, n) }
    this.map.removeLayer('polygon')
    this.map.removeSource('mapdata')


    this.map.addSource('mapdata', {
      type: 'geojson',
      data: current
    });


    this.map.addLayer({
      "id": "polygon",
      "type": "circle",
      "source": "mapdata",
      "layout": {},
      "paint": {
        "circle-radius": ["/", ['to-number', ['get', 'value'], 1], this.state.m / 100],
        "circle-color": "DarkRed",
        "circle-opacity": 0.7,
        // 'fill-color': [ 'interpolate', ['linear'], ['*', ['get', 'value'], 0.5], 0, '#F2F12D', 10000, '#E6B71E', 20000, '#DA9C20', 30000, '#B86B25', 40000, '#8B4225'],  //OK - interpolate color proportional to AREA property with a factor of 0.5
        // 'fill-opacity': 0.8,
      }

    });
  }



  render() {
    const { viewport } = this.state;
    var self = this
    return (
      <div>
        <div>
          <Container style={{"height":"50px","marginTop":"10px"}}>
            <Row>
              <Col xs='auto'>Start Date:</Col>
              <Col xs="0"><DatePicker selected={this.state.startDate} onChange={date => this.setState({ startDate: date })} minDate={new Date("2020/1/22")} maxDate={new Date("2020/11/1")} /></Col>
              <Col xs='auto'>End Date:</Col>
              <Col xs="0"><DatePicker selected={this.state.endDate} onChange={date => this.setState({ endDate: date })} minDate={this.state.startDate} maxDate={new Date("2020/11/1")} /></Col>
              <Col><Button variant="outline-primary" onClick={this.changeDateHandler}>enter</Button></Col>
            </Row>
          </Container>

          {/* <div className={classes.MyDatePicker}>
            <p>Start Date:</p>
            <DatePicker selected={this.state.startDate} onChange={date => this.setState({ startDate: date })} minDate={new Date("2020/1/22")} maxDate={new Date("2020/11/1")} />
          </div >
          <div className={classes.MyDatePicker}>
            <DatePicker selected={this.state.endDate} onChange={date => this.setState({ endDate: date })} minDate={this.state.startDate} maxDate={new Date("2020/11/1")} />
          </div>
          <button onClick={this.changeDateHandler}>enter</button> */}
        </div>
        <div className={classes.commands}>
          <span className={classes.filter} ref={this.RefFilter} id="all" onClick={function (e) { self.toggleFilter("#all"); self.filter(10000) }}>All</span>
          <span className={classes.filter} ref={this.RefFilter} id="top10" onClick={function (e) { self.toggleFilter("#top10"); self.filter(10) }}>Filter top 10 by number of cases</span>
          <span className={classes.filter} ref={this.RefFilter} id="top20" onClick={function (e) { self.toggleFilter("#top20"); self.filter(20) }}>Filter top 20 by number of cases</span>
        </div>
        <div className={classes.mapContainer}>
          <div ref={el => this.mapContainer = el} style={{position: "relative",height: "inherit",width: "inherit"}}  />
          <div class={classes.legend } ref={e => this.legend = e} style={{"display":"none"}}>
            {/* <h3>Info</h3> */}
        </div>
          {console.log("final",this.state.m)}
        </div>
      </div>
    );
  }
}


export default MapBox;



