import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import classes from './BarChart.module.css';

// This is a functional component (dump component) which doesn't handle state
const BarChart = (props) => {
    var dataset = props.inputData;
    var chartTitle = props.title;
    var barColor = props.barColor;

    const chartRef = useRef();

    var margin = { top: 50, left: 50, bottom: 50, right: 50 },
        width = 700 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    var x = d3.scaleBand();
    var y = d3.scaleLinear();

    x.domain(dataset.map(d => d.week))
        .range([0, width])
        .paddingInner(0.2)
        .paddingOuter(0.2);

    y.domain([0, d3.max(dataset, d => d.users)])
        .range([height, 0]);

    var xAxis = d3.axisBottom()
        .scale(x);
    var yAxis = d3.axisLeft()
        .scale(y)
        .ticks(5, 'd');


    useEffect(() => {
        const svgElement = d3.select(chartRef.current)
        svgElement.selectAll('.bar')
            .attr('fill', barColor);
    }, [barColor]) // useEffect dependency list: useEffect will run after mount and whenever any of these variables change.

    useEffect(() => {
        console.log(props.barColor)
        const svgElement = d3.select(chartRef.current).append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

        svgElement.append('g')
            .attr('id', 'x-axis')
            .attr('class', 'axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

        svgElement.append('g')
            .attr('class', 'y-axis')
            .call(yAxis);

        svgElement.selectAll('.bar')
            .data(dataset, d => d.week)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.week))
            .attr('y', d => y(d.users))
            .attr('width', x.bandwidth())
            .attr('height', d => height - y(d.users))
            .attr('fill', barColor);
    }, []); // this ensures this effect only run once (after mount)


    return (
        <div className={classes.BarChart}>
            <p>Bar chart learned from: <a href="https://bl.ocks.org/d3noob/8952219" target="_blank">https://bl.ocks.org/d3noob/8952219</a></p>
            <h1>{chartTitle}</h1>
            <button onClick={() => props.resetTitleHandler("bar")}>Reset Title</button>
            <button onClick={props.switchColorHandler}>SwitchColor</button>
            <div ref={chartRef} />
        </div>
    );
}

export default BarChart;