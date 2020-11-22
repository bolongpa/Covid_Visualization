import React, { Component } from 'react';
import * as d3 from 'd3';
import mapboxgl from 'mapbox-gl';
import DatePicker from "react-datepicker";
import { Container, Row, Col, Button } from 'react-bootstrap';

import classes from './MapBox.module.css';
import claim from '../../assets/data/weekly_claim_state.csv';

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/src/stylesheets/datepicker.scss";
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";
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
  };

  map = null
  RefFilter = React.createRef()
  current = this.state.df
  legend_radius = null

  async loadData() {
    d3.csv(claim, dd => {
      var self = this
 return {

        //state:dd["Province_State"],county:dd["Admin2"],value:dd["11/1/20"],lon:dd["Long_"],lat:dd["Lat"]}
        "type": "Feature",
        "properties": {
          "value": +dd["total"],
          "state": dd["State"],
        },
        "geometry": {
          "type": "Point",
          "coordinates": [dd["lat"], dd["lon"]]
        }

      }
    })
      .then(d => {
        this.setState({ df: { "type": "FeatureCollection", "features": d } })
        this.draw()
      })
  }

  async componentDidMount() {
    this.loadData()
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

    var claims_max = d3.max(self.state.df.features.map(d => d.properties.value))

    var m_state = self.state.df.features.filter(d => d.properties.value == claims_max)[0]


      map.addLayer({
        "id": "polygon",
        "type": "circle",
        "source": "mapdata",
        "layout": {},
        "paint": {
          "circle-radius": ["/",["sqrt",['to-number', ['get', 'value']]],15],
          "circle-color": "DarkRed",
          "circle-opacity": 0.7,
          // 'fill-color': [ 'interpolate', ['linear'], ["/", ['to-number', ['get', 'value'], 1], self.state.m / 40000], 0, '#F2F12D', 10000, '#E6B71E', 20000, '#DA9C20', 30000, '#B86B25', 40000, '#8B4225'],  //OK - interpolate color proportional to AREA property with a factor of 0.5
          // 'fill-opacity': 0.8,
        }

      });

      var svg = d3.select(self.legend).append("svg").attr("width", "500").attr("height", "40")
      var format = d3.format('.1s')
      const timeFormat = d3.timeFormat('%m/%d/%Y')
      const legend = svg.append('g').append('text')
      legend.attr('None', 'red')
        .attr('transform', 'translate(0,10)')
        // .attr('text-anchor', 'middle')
        .attr("alignment-baseline", "middle")
        .style('font', '14px sans-serif')

      legend.append("tspan").attr("x", 0).attr("dy", "0em").attr("class", "tspan1")
        .text("During the week 11/07/2020 ")
      legend.append("tspan").attr("x", 0).attr("dy", "1.5em").attr("class", "tspan2")
        .text("The highest number of claim was around " + format(claims_max) + " in "+ m_state.properties.state )
      d3.select(self.legend).style("display", "block")
    })
  };

  draw() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXBwbGVraW5nIiwiYSI6ImNrZm1kZzd1dTFoZXEyeWxkbXZ4a21vY3UifQ.KsSDa37AWc9h8u4eTRY19A';
    console.log("this.state", this.state)
    this.map = new mapboxgl.Map({
      container: this.mapContainer, // container id
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [this.state.viewport.longitude, this.state.viewport.latitude], // starting position [lng, lat]
      zoom: this.state.viewport.zoom, // starting zoom
      maxZoom: 10,
      minZoom: 3
    });
    console.log(this.state.df)
    this.drawLayer(this.map)

  }

  // toggleFilter(id) {

  //   d3.selectAll("span")
  //     .style('background-color', '#FFF0F5');

  //   d3.select(id)
  //     .style('background-color', 'rgb(241, 140, 8)');
  // }

  // filter(n) {
  //   var data = this.state.df.features.sort((a, b) => d3.descending(a.properties.value, b.properties.value));
  //   var current = { "type": "FeatureCollection", "features": data.slice(0, n) }
  //   this.map.removeLayer('polygon')
  //   this.map.removeSource('mapdata')

  //   this.map.addSource('mapdata', {
  //     type: 'geojson',
  //     data: current
  //   });

  //   this.map.addLayer({
  //     "id": "polygon",
  //     "type": "circle",
  //     "source": "mapdata",
  //     "layout": {},
  //     "paint": {
  //       "circle-radius": ["/", ['to-number', ['get', 'value'], 1], this.state.m / 100],
  //       "circle-color": "DarkRed",
  //       "circle-opacity": 0.7,
  //       // 'fill-color': [ 'interpolate', ['linear'], ['*', ['get', 'value'], 0.5], 0, '#F2F12D', 10000, '#E6B71E', 20000, '#DA9C20', 30000, '#B86B25', 40000, '#8B4225'],  //OK - interpolate color proportional to AREA property with a factor of 0.5
  //       // 'fill-opacity': 0.8,
  //     }

  //   });
  // }

  render() {
    var self = this
    return (
      <div>
        <div className={classes.mapContainer}>
          <div ref={el => this.mapContainer = el} style={{ position: "relative", height: "inherit", width: "inherit" }} />
          <div class={classes.legend} ref={e => this.legend = e} style={{ "display": "none" }}>
          </div>
          {console.log("final", this.state.m)}
        </div>
      </div>
    );
  }
}


export default MapBox;



