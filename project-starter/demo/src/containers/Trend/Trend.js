import React, { Component } from 'react';
import * as d3 from 'd3';

import unemployment from '../../assets/data/lineChart_unemployment.csv';


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
        state: "All",
        timeout: setTimeout(2000),
        first: null,
        last: null,
        margin: { top: 20, right: 80, bottom: 20, left: 50 }
    }

    lineChartDataHandler = () => {
        console.log("lineChartDataHandler");
        d3.csv(unemployment).then(inputData => {
            var parseDate = d3.timeParse("%Y/%m");
            inputData.forEach(function (d) {
                Object.keys(d).map((key, _) => {
                    if (key != "Month") {
                        d[key] = +d[key]
                    }
                })
                d.date = parseDate(d.Month);
            });
            this.setState({
                data: inputData
            });

        });
    }

    updateStateHandler = (event) => {
        console.log("updateStateHandler");
        this.setState({
            state: event.target.value
        }, () => {
            this.redraw();
        });

    }

    draw = () => {
        if (!this.state.data) {
            return
        }
        console.log("draw()", this.state.state);
        console.log(this.state.data)
        var data = this.state.data;

        var width = 960 - this.state.margin.left - this.state.margin.right;
        var height = 350 - this.state.margin.top - this.state.margin.bottom;

        var x = d3.scaleTime();
        var y = d3.scaleLinear();

        x.domain([data[0].date, data[data.length - 1].date])
            .range([0, width]);

        y.domain(d3.extent(data.map(d => d[this.state.state])))
            .range([height, 0]);

        var xAxis = d3.axisBottom()
            .scale(x)
            .ticks(10);

        var yAxis = d3.axisLeft()
            .scale(y)
            .ticks(15);

        var line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d[this.state.state]));

        const svg = d3.select(this.chartRef.current).append('svg')
            .attr('id', 'lineSvg')
            .attr('width', width + this.state.margin.left + this.state.margin.right)
            .attr('height', height + this.state.margin.top + this.state.margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + this.state.margin.left + ', ' + this.state.margin.top + ')');

        svg.append("g")
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
            .attr("stroke", "#008B8B")
            .attr("stroke-width", 1.8)
            .attr("id", "line");
    }

    redraw = () => {
        console.log("redraw()", this.state.state)
        clearTimeout(this.state.timeout);
        var data = this.state.data;

        var width = 960 - this.state.margin.left - this.state.margin.right;
        var height = 350 - this.state.margin.top - this.state.margin.bottom;

        var x = d3.scaleTime();
        var y = d3.scaleLinear();

        x.domain([data[0].date, data[data.length - 1].date])
            .range([0, width]);
        y.domain(d3.extent(data.map(d => d[this.state.state])))
            .range([height, 0]);

        var yAxis = d3.axisLeft()
            .scale(y)
            .ticks(15);

        var line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d[this.state.state]));

        var svg = d3.select('#lineSvg');

        // First transition the line & label to the new value.
        var trans1 = svg.transition().duration(500);
        trans1.select("#line")
            .attr("d", line);

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
        var targetState = this.state.state;
        if (this.state.state == "All") {
            targetState = "the United States"
        }
        return (
            <div>
                <select onChange={(event) => this.updateStateHandler(event)} value={this.state.state}>
                    <option key="All" value="All">All</option>
                    <option key="Alabama" value="Alabama">Alabama</option>
                    <option key="Alaska" value="Alaska">Alaska</option>
                    <option key="Arizona" value="Arizona">Arizona</option>
                    <option key="Arkansas" value="Arkansas">Arkansas</option>
                    <option key="California" value="California">California</option>
                    <option key="Colorado" value="Colorado">Colorado</option>
                    <option key="Connecticut" value="Connecticut">Connecticut</option>
                    <option key="Delaware" value="Delaware">Delaware</option>
                    <option key="District of Columbia" value="District of Columbia">District of Columbia</option>
                    <option key="Florida" value="Florida">Florida</option>
                    <option key="Georgia" value="Georgia">Georgia</option>
                    <option key="Hawaii" value="Hawaii">Hawaii</option>
                    <option key="Idaho" value="Idaho">Idaho</option>
                    <option key="Illinois" value="Illinois">Illinois</option>
                    <option key="Indiana" value="Indiana">Indiana</option>
                    <option key="Iowa" value="Iowa">Iowa</option>
                    <option key="Kansas" value="Kansas">Kansas</option>
                    <option key="Kentucky" value="Kentucky">Kentucky</option>
                    <option key="Louisiana" value="Louisiana">Louisiana</option>
                    <option key="Maine" value="Maine">Maine</option>
                    <option key="Maryland" value="Maryland">Maryland</option>
                    <option key="Massachusetts" value="Massachusetts">Massachusetts</option>
                    <option key="Michigan" value="Michigan">Michigan</option>
                    <option key="Minnesota" value="Minnesota">Minnesota</option>
                    <option key="Mississippi" value="Mississippi">Mississippi</option>
                    <option key="Missouri" value="Missouri">Missouri</option>
                    <option key="Montana" value="Montana">Montana</option>
                    <option key="Nebraska" value="Nebraska">Nebraska</option>
                    <option key="Nevada" value="Nevada">Nevada</option>
                    <option key="New Hampshire" value="New Hampshire">New Hampshire</option>
                    <option key="New Jersey" value="New Jersey">New Jersey</option>
                    <option key="New Mexico" value="New Mexico">New Mexico</option>
                    <option key="New York" value="New York">New York</option>
                    <option key="North Carolina" value="North Carolina">North Carolina</option>
                    <option key="North Dakota" value="North Dakota">North Dakota</option>
                    <option key="Ohio" value="Ohio">Ohio</option>
                    <option key="Oklahoma" value="Oklahoma">Oklahoma</option>
                    <option key="Oregon" value="Oregon">Oregon</option>
                    <option key="Pennsylvania" value="Pennsylvania">Pennsylvania</option>
                    <option key="Puerto Rico" value="Puerto Rico">Puerto Rico</option>
                    <option key="Rhode Island" value="Rhode Island">Rhode Island</option>
                    <option key="South Carolina" value="South Carolina">South Carolina</option>
                    <option key="South Dakota" value="South Dakota">South Dakota</option>
                    <option key="Tennessee" value="Tennessee">Tennessee</option>
                    <option key="Texas" value="Texas">Texas</option>
                    <option key="Utah" value="Utah">Utah</option>
                    <option key="Vermont" value="Vermont">Vermont</option>
                    <option key="Virginia" value="Virginia">Virginia</option>
                    <option key="Washington" value="Washington">Washington</option>
                    <option key="West Virginia" value="West Virginia">West Virginia</option>
                    <option key="Wisconsin" value="Wisconsin">Wisconsin</option>
                    <option key="Wyoming" value="Wyoming">Wyoming</option>
                </select>
                <h1>Unemployment Rate Trend of {targetState}</h1>
                <p ref={this.pRef}>2019/01-2020/08</p>
                <div ref={this.chartRef} />

            </div>
        );
    }

}

export default LineChart;