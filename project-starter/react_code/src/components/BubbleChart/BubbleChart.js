import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import classes from './BubbleChart.css';
//import * as inputData from '../../assets/data/bubbleDemo.json';

// This is a functional component (dump component) which doesn't handle state
const BubbleChart = (props) => {
    
    var dataset = props.inputData; // [[20,40,10], [40,150,20], [100,70,50], [200,120,30]];
    var chartTitle = props.title;

    const color = d3.schemeCategory10;

    const chartRef = useRef();

    var margin = { top: 50, left: 50, bottom: 50, right: 50 },
    width = 700 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

    useEffect(() => {
        const svgElement = d3.select(chartRef.current).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

        svgElement.selectAll("circle")
            .data(dataset)
            .join("circle")
            .attr("cx", d => d[0])
            .attr("cy", d => d[1])
            .attr("r", d => d[2])
            .attr("fill", (d, i) => color[i])
    }, [dataset]);
    
    return (
        <div className={classes.BubbleChart}>
            <p>Bubble chart learned from: <a href="https://wattenberger.com/blog/react-and-d3" target="_blank">https://wattenberger.com/blog/react-and-d3</a></p>
            <h1>{chartTitle}</h1>
            <button onClick={() => props.resetTitleHandler("bubble")}>Reset Title</button>
            <div ref={chartRef}/>
        </div>
    );
}

export default BubbleChart;