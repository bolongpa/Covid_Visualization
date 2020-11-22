import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

import classes from './DonutChart.module.css';

const Donut = (props) => {
    const chartRef = useRef();

    var width = 400
    var height = 380
    var margin = 80

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = height / 2 - margin

    // set the color scale
    var color = d3.scaleOrdinal()
        .domain(props.types)
        .range(["#B0C4DE", '#FFD966'])

    // Compute the position of each group on the pie:
    var pie = d3.pie()
        .startAngle(Math.PI / 10)
        .endAngle(Math.PI * 2 + Math.PI / 10)
        .value(function (d) { return d.value; })

    // The arc generator
    var arc = d3.arc()
        .innerRadius(radius * 0.8)         // This is the size of the donut hole
        .outerRadius(radius * 0.95)

    // Another arc that won't be drawn. Just for labels positioning
    var outerArc = d3.arc()
        .innerRadius(radius * 1.05)
        .outerRadius(radius * 1.05)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    useEffect(() => {
        var pieData = pie(props.data)
        // append the svg object
        var svg = d3.select(chartRef.current)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        svg
            .selectAll('whatever')
            .data(pieData)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(radius / 2)         // This is the size of the donut hole
                .outerRadius(radius)
            )
            .attr('fill', function (d) { return (color(d.data.type)) })
            // .attr("stroke", "black")
            // .style("stroke-width", "2px")
            .style("opacity", 0.7)

        d3.select(chartRef.current).select('svg')
            .append("text")
            .attr('x', width / 2)
            .attr('y', height / 2)
            .attr('text-anchor', 'middle')
            .text(props.week);

        d3.select(chartRef.current).select('svg')
            .append("text")
            .attr('x', width / 2)
            .attr('y', margin / 3)
            .attr('text-anchor', 'middle')
            .attr('font-weight', 'bold')
            .text(props.label);

        // Add the polylines between chart and labels:
        svg
            .selectAll('allPolylines')
            .data(pieData)
            .enter()
            .append('polyline')
            .attr("stroke", d => color(d.data.type))
            .style("fill", "none")
            .attr("stroke-width", 1)
            .attr('points', function (d) {
                var posA = arc.centroid(d) // line insertion in the slice
                var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
                var posC = outerArc.centroid(d); // Label position = almost the same as posB
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
                posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                return [posA, posB, posC]
            })

        // Add labels:
        svg
            .selectAll('allLabels')
            .data(pieData)
            .enter()
            .append('text')
            .text(d => d.data.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
            .attr('transform', function (d) {
                var pos = outerArc.centroid(d);
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                return 'translate(' + pos + ')';
            })
            .style('text-anchor', function (d) {
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                return (midangle < Math.PI ? 'start' : 'end')
            })
    }, [])

    return (
        <div className={classes.Donut} ref={chartRef} />
    )
};

export default Donut;