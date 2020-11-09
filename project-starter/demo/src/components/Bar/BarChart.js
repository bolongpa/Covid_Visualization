// TODO: 1. pass time 
//  2. pass button action

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import classes from './BarChart.module.css';

const BarChart = (props) => {
    var time = props.time;
    var time_year = time.getYear() + 1900;
    var time_month = time.getMonth() + 1;
    var chosenDataset = props.chosenDataset;  // currently using dataset name
    var unemploy_data = props.unemploy_data;  // raw unemployment data
    var covid_data = props.covid_data;  // raw covid data
    var chartTitle = props.title;  // chart title
    var filter = props.filter;

    var monthmap = { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec" }
    var statemap = {'Alabama':'AL', 'Alaska':'AK', 'Arizona':'AZ', 'Arkansas':'AR', 'California':'CA', 'Colorado':'CO', 'Connecticut':'CT', 'Delaware':'DE', 'District of Columbia':'DC', 'Florida':'FL', 'Georgia':'GA', 'Hawaii':'HI', 'Idaho':'ID', 'Illinois':'IL', 'Indiana':'IN', 'Iowa':'IA', 'Kansas':'KS', 'Kentucky':'KY', 'Louisiana':'LA', 'Maine':'ME', 'Maryland':'MD', 'Massachusetts':'MA', 'Michigan':'MI', 'Minnesota':'MN', 'Mississippi':'MS', 'Missouri':'MO', 'Montana':'MT', 'Nebraska':'NE', 'Nevada':'NV', 'New Hampshire':'NH', 'New Jersey':'NJ', 'New Mexico':'NM', 'New York':'NY', 'North Carolina':'NC', 'North Dakota':'ND', 'Ohio':'OH', 'Oklahoma':'OK', 'Oregon':'OR', 'Pennsylvania':'PA', 'Rhode Island':'RI', 'South Carolina':'SC', 'South Dakota':'SD', 'Tennessee':'TN', 'Texas':'TX', 'Utah':'UT', 'Vermont':'VT', 'Virginia':'VA', 'Washington':'WA', 'West Virginia':'WV', 'Wisconsin':'WI', 'Wyoming':'WY', 'Puerto Rico':'PR',}

    const chartRef = useRef();

    var dataurl = {'covid':covid_data, 'unemployment':unemploy_data};
    var dataset = dataurl[chosenDataset];

    useEffect(() => {
        d3.csv(dataset, d=>{
            if (d.Year == time_year.toString() && d.Period == monthmap[time_month]) {
                return {
                    state:d.State,
                    year:d.Year,
                    month:d.Period,
                    rate:+d.unemploymentrate
                };
            };
            
        }).then(data=>{
            console.log(filter);
            if (filter === 'top') {
                data = topten(data);
            } else if (filter === 'bottom') {
                data = bottomten(data);
            }
            
            var margin = { top: 50, left: 50, bottom: 50, right: 50 },
                width = 1900 - margin.left - margin.right,
                height = 350 - margin.top - margin.bottom;

            var x = d3.scaleBand();
            var y = d3.scaleLinear();

            x.domain(data.map(d => d.state))
                .range([10, width])
                .paddingInner(0.2);

            y.domain([0, d3.max(data, d => d.rate)])
                .range([height, 0]);

            const svg = d3.select(chartRef.current).append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');


            svg.selectAll('.bar')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('x', d => x(d.state))
                .attr('y', d => y(d.rate))
                .attr('width', x.bandwidth())
                .attr('height', d => height - y(d.rate))
                .attr('fill', 'steelblue');

            svg.selectAll('.name')
                .data(data)
                .enter()
                .append('text')
                .text(d => statemap[d.state])
                .attr('text-anchor', 'middle')
                .attr('class', 'name')
                .attr('x', d => x(d.state) + x.bandwidth() / 2)
                .attr('y', d => height + 15);

            var xAxis = d3.axisBottom()
                .scale(d3.scaleLinear().range([0, width+10]))  // adding outer padding to scaleBand
                .ticks(0)
                .tickSize(0)
                .tickFormat('');

            svg.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(0,' + height + ')')
                .call(xAxis);

            var yAxis = d3.axisLeft()
                .scale(y)
                .ticks(5, 'd');

            svg.append('g')
                .attr('class', 'axis')
                .call(yAxis);

            svg.append('text')
                .attr('x', width /2)
                .attr('y', height + 35)
                .attr('class', 'xlabel')
                .append('tspan').text('state')
            
            svg.append('text')
                .attr('x', - height / 2)
                .attr('y', - margin.left * 0.7)
                .attr('transform', 'rotate(-90)')
                .attr('class', 'ylabel')
                .append('tspan').text('rate')
            




            function topten(data) {
                return data.sort(function (a, b) {return d3.descending(a.rate, b.rate)}).slice(0, 10);
            }
            function bottomten(data) {
                return data.sort(function (a, b) {return d3.ascending(a.rate, b.rate)}).slice(0, 10);
            }
        })
    });

    

   


    return (
        <div className={classes.BarChart}>
            <h1>{chartTitle}</h1>
            <button onClick={() => props.resetTitleHandler("covid")}>COVID</button>
            <button onClick={() => props.resetTitleHandler("unemployment")}>Unemployment</button>
            <button onClick={() => props.switchFilterHandler('top')}>Top 10</button>
            <button onClick={() => props.switchFilterHandler('bottom')}>Bottom 10</button>

            <div ref={chartRef} />
        </div>
    );
}

export default BarChart;