import React, { Component, Fragment } from 'react';
import * as d3 from 'd3';

import classes from './LineChart.module.css';

import productionIndex from '../../assets/data/ProductionIndexNumber.csv';


class LineChart extends Component {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.pRef = React.createRef();
    }

    componentWillMount() {
        console.log("componentWillMount")
        this.lineChartDataHandler();
    }


    state = {
        initial: true,
        data: null,
        country: "AFRICA",
        timeout: setTimeout(2000),
        first: null,
        last: null,
        margin: { top: 20, right: 80, bottom: 20, left: 50 }
    }

    lineChartDataHandler = () => {
        console.log("lineChartDataHandler");
        d3.csv(productionIndex).then(inputData => {
            var parseDate = d3.timeParse("%Y");
            inputData.forEach(function (d) {
                d.date = parseDate(d.date);

                d["AFRICA"] = +d["AFRICA"];
                d["AMERICAS"] = +d["AMERICAS"];
                d["ASIA"] = +d["ASIA"];
                d["EUROPE"] = +d["EUROPE"];
                d["OCEANIA"] = +d["OCEANIA"];
            });
            this.setState({
                data: inputData,
                first: inputData[0]["AFRICA"],
                last: inputData[inputData.length - 1]["AFRICA"]
            });

        });
        return Promise.resolve()
    }

    updateCountryHandler = (event) => {
        console.log("updateCountryHandler");
        this.setState({
            country: event.target.value
        }, () => {
            this.redraw();
        });

    }

    draw = () => {
        if (!this.state.data) {
            return
        }
        console.log("draw()", this.state.country);
        var data = this.state.data;

        var width = 960 - this.state.margin.left - this.state.margin.right;
        var height = 350 - this.state.margin.top - this.state.margin.bottom;

        var x = d3.scaleTime();
        var y = d3.scaleLinear();

        x.domain([data[0].date, data[data.length - 1].date])
            .range([0, width]);

        y.domain(d3.extent(data.map(d => d[this.state.country])))
            .range([height, 0]);

        var c = d3.scaleOrdinal()
            .domain(["AFRICA", "AMERICAS", "EUROPE", "ASIA", "OCEANIA"])
            .range(["blue", "black", "orange", "green", "#9900FF"]);

        var xAxis = d3.axisBottom()
            .scale(x)
            .ticks(10);

        var yAxis = d3.axisLeft()
            .scale(y)
            .ticks(15);

        var line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d[this.state.country]));

        const svg = d3.select(this.chartRef.current).append('svg')
            .attr('id', 'lineSvg')
            .attr('width', width + this.state.margin.left + this.state.margin.right)
            .attr('height', height + this.state.margin.top + this.state.margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + this.state.margin.left + ', ' + this.state.margin.top + ')');

        svg.append("g")
            .attr("className", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("id", "yAxis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Index");

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("opacity", 0.3)
            .attr("stroke", "lightgray")
            .call(xAxis
                .tickSize(-height, 0, 0)
                .tickFormat(""));

        svg.append("path")
            .datum(data)
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", c(this.state.country))
            .attr("stroke-width", 1.5)
            .attr("id", "line");
    }

    redraw = () => {
        console.log("redraw()", this.state.country)
        clearTimeout(this.state.timeout);
        var data = this.state.data;

        var width = 960 - this.state.margin.left - this.state.margin.right;
        var height = 350 - this.state.margin.top - this.state.margin.bottom;

        var x = d3.scaleTime();
        var y = d3.scaleLinear();

        x.domain([data[0].date, data[data.length - 1].date])
            .range([0, width]);
        y.domain(d3.extent(data.map(d => d[this.state.country])))
            .range([height, 0]);

        var yAxis = d3.axisLeft()
            .scale(y)
            .ticks(15);

        var c = d3.scaleOrdinal()
            .domain(["AFRICA", "AMERICAS", "EUROPE", "ASIA", "OCEANIA"])
            .range(["blue", "black", "orange", "green", "#9900FF"]);

        var line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d[this.state.country]));

        var svg = d3.select('#lineSvg');

        // First transition the line & label to the new value.
        var trans1 = svg.transition().duration(500);
        trans1.select("#line")
            .attr("d", line)
            .style("stroke", c(this.state.country));

        // Then transition the y-axis.
        var trans2 = trans1.transition();
        trans2.select("#line").attr("d", line);
        trans2.select("#yAxis").call(yAxis);
    }

    render() {
        if (this.state.initial && this.state.data) {
            this.setState({ initial: false })
            this.draw();
        }
        return (
            <div className={classes.LineChart}>
                <p>Line chart learned from: <a href="https://bl.ocks.org/fabiomainardi/00d9920d48a910216bcd" target="_blank" rel="noreferrer">https://bl.ocks.org/fabiomainardi/00d9920d48a910216bcd</a></p>

                <select onChange={(event) => this.updateCountryHandler(event)} value={this.state.country}>
                    <option key="AFRICA" value="AFRICA">Africa</option>
                    <option key="AMERICAS" value="AMERICAS">Americas</option>
                    <option key="ASIA" value="ASIA">Asia</option>
                    <option key="EUROPE" value="EUROPE">Europe</option>
                    <option key="OCEANIA" value="OCEANIA">Oceania</option>
                </select>
                <Fragment>
                    <h1>Production Index of {this.state.country}</h1>
                    <p ref={this.pRef}></p>
                    <div ref={this.chartRef} />
                </Fragment>

            </div>
        );
    }

}

export default LineChart;