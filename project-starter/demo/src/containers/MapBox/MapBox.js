import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import mapboxgl from 'mapbox-gl';
import classes from './MapBox.module.css';
import * as covid from '../../assets/data/time_series_covid19_confirmed_US.csv';
import { data } from 'autoprefixer';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";  
import "react-datepicker/src/stylesheets/datepicker.scss";
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";
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
      df:[],
      startDate:new Date("2020/1/22"),
      endDate:new Date("2020/11/1")
    };
    map = null
    RefFilter = React.createRef()
    current = this.state.df
    m = 1
    loadData(){
      d3.csv(covid,dd=>{
        var self = this
        const timeFormat = d3.timeFormat('%m/%d/%y')
        var start = timeFormat(this.state.startDate).replaceAll("/0","/")[0]=="0"?timeFormat(this.state.startDate).replaceAll("/0","/").substring(1):timeFormat(this.state.startDate).replaceAll("/0","/")
        var end = timeFormat(this.state.endDate).replaceAll("/0","/")[0]=="0"?timeFormat(this.state.endDate).replaceAll("/0","/").substring(1):timeFormat(this.state.endDate).replaceAll("/0","/")
        return {
            
            //state:dd["Province_State"],county:dd["Admin2"],value:dd["11/1/20"],lon:dd["Long_"],lat:dd["Lat"]}
            "type": "Feature",
            "properties": {
            "value":+dd[end]-(+dd[start]),
            "state":dd["Province_State"],
            "county":dd["Admin2"]
            },
            "geometry": {
            "type": "Point",
            "coordinates": [ dd["Long_"], dd["Lat"] ]
            }
        
        }})
        .then(d=>{
            this.setState({df:{"type": "FeatureCollection","features":d}})
            this.draw()
        })
    }

    componentDidMount() {
      this.loadData()
var svg = d3.select(this.legend).append("svg")
      const legend = svg.append('g')
        .attr('None', 'red')
        .attr('transform', 'translate(15,30)')
        .attr('text-anchor', 'middle')
        .style('font', '10px sans-serif')
        .selectAll('g')
        .data([20, 50, 150])
        .join('g');

    legend.append('circle')
        .attr('fill', 'none')
        .attr('stroke', 'brown')
        .attr('cy', d => 5)
        .attr('r', (d,i)=>6*i);

    legend.append('text')
        .attr('y', (d,i)=> -2 * 5*i)
        .attr('dy', '1.3em')
        .text(d3.format('.1s'));

    }

    changeDateHandler = () => {
      
      console.log(this.state)
      d3.csv(covid,dd=>{
        var self = this
        const timeFormat = d3.timeFormat('%m/%d/%y')
        var start = timeFormat(this.state.startDate).replaceAll("/0","/")[0]=="0"?timeFormat(this.state.startDate).replaceAll("/0","/").substring(1):timeFormat(this.state.startDate).replaceAll("/0","/")
        var end = timeFormat(this.state.endDate).replaceAll("/0","/")[0]=="0"?timeFormat(this.state.endDate).replaceAll("/0","/").substring(1):timeFormat(this.state.endDate).replaceAll("/0","/")
        return {
            
            //state:dd["Province_State"],county:dd["Admin2"],value:dd["11/1/20"],lon:dd["Long_"],lat:dd["Lat"]}
            "type": "Feature",
            "properties": {
            "value":+dd[end]-(+dd[start]),
            "state":dd["Province_State"],
            "county":dd["Admin2"]
            },
            "geometry": {
            "type": "Point",
            "coordinates": [ dd["Long_"], dd["Lat"] ]
            }
        
        }})
        .then(d=>{
            this.setState({df:{"type": "FeatureCollection","features":d}})
            // this.drawLayer(this.map)
            this.map.removeLayer('polygon')
            this.map.removeSource('mapdata')
            

            this.map.addSource('mapdata', {
                type: 'geojson',
                data: this.state.df
            });

            this.m = d3.max(this.state.df.features.map(d=>d.properties.value))
            console.log("m",this.m)
    
    
            this.map.addLayer({
                "id": "polygon",
                "type": "circle",
                "source": "mapdata",
                "layout": {},
                "paint": {
                    "circle-radius":["/",['to-number', ['get', 'value'],1],this.m/80],
                    "circle-color": "blue",
                    "circle-opacity": 0.8
                }
    
            });
      
              
      
            
        })
    }

    drawLayer(map){
      console.log("draw layer")
      var self = this
      console.log(self.state.df)
      map.on('load', function () {

        map.addSource('mapdata', {
            type: 'geojson',
            data: self.state.df
        });
        self.m = d3.max(self.state.df.features.map(d=>d.properties.value))

        map.addLayer({
            "id": "polygon",
            "type": "circle",
            "source": "mapdata",
            "layout": {},
            "paint": {
                "circle-radius":["/",['to-number', ['get', 'value'],1],self.m/80],
                "circle-color": "blue",
                "circle-opacity": 0.8
            }

        });
      })
  };
    
       

    draw() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYXBwbGVraW5nIiwiYSI6ImNrZm1kZzd1dTFoZXEyeWxkbXZ4a21vY3UifQ.KsSDa37AWc9h8u4eTRY19A';
        console.log(this.state)
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

      d3.selectAll(this.RefFilter)
          .style('background-color', '#FFF0F5');

      d3.select(id)
          .style('background-color', 'rgb(241, 140, 8)');
  }

  filter(n){
    var data = this.state.df.features.sort((a, b) => d3.descending(a.properties.value, b.properties.value));
    var current = {"type": "FeatureCollection","features":data.slice(0,n)}
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
            "circle-radius":["/",['to-number', ['get', 'value'],1],this.m/80],
            "circle-color": "blue",
            "circle-opacity": 0.7
        }

    });
  }

  
  
    render() {
      const { viewport } = this.state;
      var self = this
      return (
          <div>
            <div>
              <div className={classes.MyDatePicker}>
                <DatePicker selected={this.state.startDate} onChange={date => this.setState({startDate:date})} minDate={new Date("2020/1/22")} maxDate={new Date("2020/11/1")}/>
               </div>
               <div>
                <DatePicker selected={this.state.endDate} onChange={date => this.setState({endDate:date})} minDate={this.state.startDate} maxDate={new Date("2020/11/1")}/>
                </div>
               <button onClick={this.changeDateHandler}>enter</button>
              </div>
              <div className={classes.commands}>
                <span class={classes.filter} ref={this.RefFilter} id="all" onClick={function(e){self.toggleFilter("#all"); self.filter(10000)}}>All</span>
                <span class={classes.filter} ref={this.RefFilter}  id="top10" onClick={function(e){self.toggleFilter("#top10"); self.filter(10)}}>Filter top 10 by number of cases</span>
                <span class={classes.filter} ref={this.RefFilter} id="top20" onClick={function(e){self.toggleFilter("#top20"); self.filter(20)}}>Filter top 20 by number of cases</span>
              </div>
              <div>
              <div ref={el => this.mapContainer = el} className={classes.mapContainer}/>
              
              <div class={classes.legend} ref={e=>this.legend=e} ></div>
              </div>
        </div>
      );
    }
  }

  
  export default MapBox
  


