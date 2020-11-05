import React, { Component } from 'react';
import * as d3 from 'd3';

import classes from './LineChart.css';
import * as inputData from '../../assets/data/newUsers.json';

class LineChart extends Component {
    state = {
        data: inputData.data,
        chart: {
            title: inputData.name,
            strokeColor: 'steelblue',
            buttonColor: 'lightyellow'
        }
    }

    componentDidMount() {
        this.draw()
    }

    componentDidUpdate() {
        this.draw()
    }

    switchColorHandler = () => {
        console.log("button clicked!")
        if (this.state.chart.strokeColor === 'steelblue') {
            this.setState({
                chart: {
                    ...this.state.chart,
                    strokeColor: 'orange',
                    buttonColor: 'lightblue'
                }
            })
        } else {
            this.setState({
                chart: {
                    ...this.state.chart,
                    strokeColor: 'steelblue',
                    buttonColor: 'lightyellow'
                }
            })
        }
    }

    

    draw() {
        const svg = d3.select("svg"),
            margin = { top: 50, right: 20, bottom: 50, left: 50 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const x = d3.scaleLinear()
            .rangeRound([0, width]);

        const y = d3.scaleLinear()
            .rangeRound([height, 0]);

        const lineCount = d3.line()
            .x(function (d) { return x(d.week); })
            .y(function (d) { return y(d.users); });


        x.domain(d3.extent(this.state.data, function (d) { return d.week; }));
        y.domain(d3.extent(this.state.data, function (d) { return d.users; }));

        //plot the x axis
        g.append("g")
            .attr("class", `axis axis--x`)
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", 'axis axis--y')
            .call(d3.axisLeft(y))
            //plot the color legend
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("font-size", "0.8rem")
            .style("text-anchor", "end")
            .text("New Users");
        g.append('g')
            .attr('class', 'legend')
            .append('text')
            .attr('y', -10)
            .attr('x', width - 100)
            .text('Users');
        g.append('g')
            .append('rect')
            .attr('y', -23)
            .attr('x', width - 55)
            .attr('width', 18)
            .attr('height', 18)
            .attr('fill', this.state.chart.strokeColor);

        //plot the x axis legend
        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + 40) + ")")
            .style("text-anchor", "middle")
            .text("Week #");

        g.append("path")
            .datum(this.state.data)
            .attr("class", `lineUsers`)
            .attr("d", lineCount)
            .attr('fill', 'None')
            .attr('stroke', this.state.chart.strokeColor)
            .attr("stroke-width", '3px');
    }

    render() {
        return (
            <div className={classes.ChartBox}>
                <h1>{this.state.chart.title}</h1>
                <button 
                    onClick={this.switchColorHandler}
                    style={{backgroundColor: this.state.chart.buttonColor}}>Switch Color</button>
                <svg className={classes.LineChart} />
                <p>Learned from: <a href="https://medium.com/@mark_is_here/visualizing-data-with-d3-and-react-js-8c373e48cc1">https://medium.com/@mark_is_here/visualizing-data-with-d3-and-react-js-8c373e48cc1</a></p>
            </div>
        );
    }
}

export default LineChart;