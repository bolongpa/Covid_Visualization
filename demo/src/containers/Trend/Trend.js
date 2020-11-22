import React, { Component } from 'react';
import * as d3 from 'd3';

import classes from './Trend.module.css';
import unemployment from '../../assets/data/lineChart_unemployment.csv';
import covid from '../../assets/data/lineChart_covid_new_confirmed.csv';
import hiring from '../../assets/data/lineChart_hiring.csv';


class LineChart extends Component {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentWillMount() {
        console.log("componentWillMount")
        this.lineChartDataHandler();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.clickedState !== this.props.clickedState) {
            this.redraw();
        }
    }


    state = {
        initial: true,
        unemployData: null,
        covidData: null,
        hiringData: null,
        timeout: setTimeout(2000),
        first: null,
        last: null,
        margin: { top: 20, right: 80, bottom: 20, left: 50 },
        height: 500,
        width: window.screen.width
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
                unemployData: inputData
            });

        });
        d3.csv(covid).then(inputData => {
            var parseDate = d3.timeParse("%Y/%m");
            inputData.forEach(function (d) {
                Object.keys(d).map((key, _) => {
                    if (key != "Month") {
                        d[key] = +d[key] / 1000 // will add a (k) at yAxis
                    }
                })
                d.date = parseDate(d.Month);
            });
            this.setState({
                covidData: inputData
            });

        });
        d3.csv(hiring).then(inputData => {
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
                hiringData: inputData
            });

        });
    }

    draw = () => {
        console.log("draw()", this.props.clickedState);
        var unemployData = this.state.unemployData;
        var covidData = this.state.covidData;
        var hiringData = this.state.hiringData;

        var width = this.state.width - this.state.margin.left - this.state.margin.right;
        var height = this.state.height - this.state.margin.top - this.state.margin.bottom;

        var x = d3.scaleTime();
        var yLeft = d3.scaleLinear();
        var yRight = d3.scaleLinear();

        x.domain([unemployData[0].date, unemployData[unemployData.length - 1].date])
            .range([0, width]);

        yLeft.domain([3, d3.max(unemployData.map(d => d[this.props.clickedState]))])
            .range([height, 0]);

        yRight.domain(d3.extent(covidData.map(d => d[this.props.clickedState])))
            .range([height, 0]);

        var xAxis = d3.axisBottom()
            .scale(x)
            .ticks(10);

        var yLeftAxis = d3.axisLeft()
            .scale(yLeft)
            .ticks(15);

        var yRightAxis = d3.axisRight()
            .scale(yRight)
            .ticks(15);

        var line = d3.line()
            .x(d => x(d.date))
            .y(d => yLeft(d[this.props.clickedState]));

        var hiringLine = d3.line()
            .x(d => x(d.date))
            .y(d => yLeft(d[this.props.clickedState]));

        var covidLine = d3.line()
            .x(d => x(d.date))
            .y(d => yRight(d[this.props.clickedState]));

        const svg = d3.select(this.chartRef.current).append('svg')
            .attr('id', 'lineSvg')
            //.attr('width', this.state.width)
            .attr('width', "100%")
            .attr('height', this.state.height)
            .attr('viewBox', [0, 0, this.state.width, this.state.height + 10])
            .append('g')
            .attr('transform', 'translate(' + this.state.margin.left + ', ' + this.state.margin.top + ')');

        svg.append("g")
            .style("font-size", "1.2rem")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .style("font-size", "1.1rem")
            .attr("id", "yLeftAxis")
            .attr("stroke", "#114C94")
            .call(yLeftAxis)
            .append("text")
            .attr("y", -20)
            .attr("x", -10)
            .attr("dy", "1.2rem")
            .style("text-anchor", "middle")
            .text("(%)");

        svg.append("g")
            .style("font-size", "1.1rem")
            .attr("id", "yRightAxis")
            .attr("transform", "translate( " + width + ", 0 )")
            .attr("stroke", "#FF8C00")
            .call(yRightAxis)
            .append("text")
            .attr("y", -20)
            .attr("x", 10)
            .attr("dy", "1.2rem")
            .style("text-anchor", "middle")
            .text("(k)");

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("opacity", 0.3)
            .attr("stroke", "lightgray")
            .call(xAxis
                .tickSize(-height, 0, 0)
                .tickFormat(""));

        svg.append("path")
            .datum(unemployData)
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "#114C94")
            .attr("stroke-width", 3)
            .attr("id", "line");

        svg.append("path")
            .datum(hiringData)
            .attr("d", hiringLine)
            .attr("fill", "none")
            .attr("stroke", "#A174A9")
            .attr("stroke-width", 3)
            .attr("id", "hiringLine");

        svg.append("path")
            .datum(covidData)
            .attr("d", covidLine)
            .attr("fill", "none")
            .attr("stroke", "#FF8C00")
            .attr("stroke-width", 3)
            .attr("id", "covidLine");

        // Handmade legend
        svg.append("rect").attr("x", 60).attr("y", 50).attr("width", 10).attr("height", 5).style("fill", "#FF8C00");
        svg.append("rect").attr("x", 60).attr("y", 80).attr("width", 10).attr("height", 5).style("fill", "#114C94");
        svg.append("rect").attr("x", 60).attr("y", 110).attr("width", 10).attr("height", 5).style("fill", "#A174A9").attr("class", "hiringLegend");
        svg.append("text").attr("x", 80).attr("y", 55).text("COVID newly confirmed cases (k)").style("font-size", "1.2rem").attr("alignment-baseline", "middle");
        svg.append("text").attr("x", 80).attr("y", 85).text("Unemployment Rate (%)").style("font-size", "1.2rem").attr("alignment-baseline", "middle");
        svg.append("text").attr("x", 80).attr("y", 115).text("Nationwide Hiring Rate (%)").style("font-size", "1.2rem").attr("alignment-baseline", "middle").attr("class", "hiringLegend");

    }

    redraw = () => {
        console.log("redraw()", this.props.clickedState)
        clearTimeout(this.state.timeout);
        var unemployData = this.state.unemployData;
        var covidData = this.state.covidData;

        var width = this.state.width - this.state.margin.left - this.state.margin.right;
        var height = this.state.height - this.state.margin.top - this.state.margin.bottom;

        var x = d3.scaleTime();
        var yLeft = d3.scaleLinear();
        var yRight = d3.scaleLinear();

        x.domain([unemployData[0].date, unemployData[unemployData.length - 1].date])
            .range([0, width]);
        yLeft.domain(d3.extent(unemployData.map(d => d[this.props.clickedState])))
            .range([height, 0]);
        yRight.domain(d3.extent(covidData.map(d => d[this.props.clickedState])))
            .range([height, 0]);

        var yLeftAxis = d3.axisLeft()
            .scale(yLeft)
            .ticks(15);
        var yRightAxis = d3.axisRight()
            .scale(yRight)
            .ticks(15);

        var line = d3.line()
            .x(d => x(d.date))
            .y(d => yLeft(d[this.props.clickedState]));
        var covidLine = d3.line()
            .x(d => x(d.date))
            .y(d => yRight(d[this.props.clickedState]));

        var svg = d3.select('#lineSvg');

        // First transition the line & label to the new value.
        var trans1 = svg.transition().duration(600);
        trans1.select("#line")
            .attr("d", line);
        trans1.select("#covidLine")
            .attr("d", covidLine);

        // Then transition the y-axis.
        var trans2 = trans1.transition();
        trans2.select("#line").attr("d", line);
        trans2.select("#yLeftAxis").call(yLeftAxis);
        trans2.select("#covidLine").attr("d", covidLine);
        trans2.select("#yRightAxis").call(yRightAxis);

        // show nationwide hiring rate only when user select "United States"
        if (this.props.clickedState != "United States") {
            trans1.select("#hiringLine").style("visibility", "hidden");
            trans1.selectAll(".hiringLegend").style("visibility", "hidden");
        } else {
            trans1.select("#hiringLine").style("visibility", "visible");
            trans1.selectAll(".hiringLegend").style("visibility", "visible");
        }
    }

    render() {
        if (this.state.initial && this.state.unemployData && this.state.covidData && this.state.hiringData) {
            this.setState({ initial: false })
            this.draw();
        }
        return (
            <div className={classes.LineChart}>
                <h3 className={classes.Title}>Pandemics and the Labor Market - {this.props.clickedState}</h3>
                <div>
                    <p className={classes.Label}>Region: </p>
                    <select className={classes.StateSelection} onChange={(event) => this.props.updateStateHandler(event.target.value)} value={this.props.clickedState}>
                        <option key="United States" value="United States">United States</option>
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
                </div>
                <div ref={this.chartRef} />

            </div>
        );
    }

}

export default LineChart;