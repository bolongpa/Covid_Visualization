// TODO: 1. pass time
//  2. pass button action

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import classes from './BarChart.module.css';
import { svg } from 'd3';

const BarChart = (props) => {
    var bar_width = 15;
    const bar_num = 10;
    const timeFormat = d3.timeFormat('%m/%d/%y');
    // const colorscale1 = d3.scaleSequential().domain([-15, 14]).interpolator(d3.interpolateBlues);
    // const colorscale2 = d3.scaleSequential().domain([-500000, 650000]).interpolator(d3.interpolateOranges);
    var start = props.start;
    var end = props.end;
    var start_year = props.start.getYear() + 1900;
    var start_month = props.start.getMonth() + 1;
    var end_year = props.end.getYear() + 1900;
    var end_month = props.end.getMonth() + 1;
    var unemploy_data = props.unemploy_data;  // raw unemployment data url
    var covid_data = props.covid_data;  // raw covid data url
    // var chartTitle = props.title;  // chart title
    var filter = props.filter;
    var chartTitle;
    if (filter == 'top') {chartTitle = 'Top 10 of State Unemployed Rate'} else {chartTitle = 'Bottom 10 of State Unemployed Rate'};

    // month and state abbr map
    var monthmap = { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec" }
    var statemap = { 'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'District of Columbia': 'DC', 'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD', 'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC', 'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY', 'Puerto Rico': 'PR', }

    const chartRef = useRef();

    // data processing functions for covid data
    function aggregate(data) {
        // console.log("agg",data)
        // console.log(data)
        var total = {}
        for (var d in data) {
            if (total[data[d][0]]) {
                total[data[d][0]] += +data[d][1];
                
            } else {
                total[data[d][0]] = +data[d][1];
            }
        }
        return total
    }

    function CovidDataPreprocess(covid_data) {

        var new_end = new Date(end.getYear() - 100 + 2000, end.getMonth() + 1, 0)
        var new_start = timeFormat(start).replaceAll("/0", "/")[0] == "0" ? timeFormat(start).replaceAll("/0", "/").substring(1) : timeFormat(start).replaceAll("/0", "/")
        new_end = timeFormat(new_end).replaceAll("/0", "/")[0] == "0" ? timeFormat(new_end).replaceAll("/0", "/").substring(1) : timeFormat(new_end).replaceAll("/0", "/")
        if (start.getMonth() == 0) {
            new_start = "1/22/20"
        }
        // console.log(new_start, new_end)

        covid_data = covid_data.map(d => [d.Province_State, d[new_end] - d[new_start]])
        covid_data = aggregate(covid_data)
        // console.log(covid_data)
        return covid_data
    }

    // function to draw
    function draw(svg, width, height, unemploy_data, covid_data, filter) {
        if (filter == 'top') {
            unemploy_data = topten(unemploy_data);
        } else if (filter == 'bottom') {
            unemploy_data = bottomten(unemploy_data);
        }
        // process covid_data
        var states_to_show = unemploy_data.map(d => d.state);
        var covid_data_temp = covid_data.map(d => {if (states_to_show.includes(d.state)) {return d;}});
        var covid_data = [];
        for (let i in covid_data_temp) {
            if (covid_data_temp[i]) {
                covid_data.push(covid_data_temp[i]);
            };
        }

        var x = d3.scaleBand();
        var y1 = d3.scaleLinear();
        var y2 = d3.scaleLinear();

        x.domain(unemploy_data.map(d => d.state))
            .range([7, height-10])
            .paddingInner(0.2);
        console.log("draw width",width)
        y1.domain([Math.min(0, d3.min(unemploy_data, d => d.value)), Math.max(0, d3.max(unemploy_data, d => d.value))])
            .range([0, width]);
        
        y2.domain([Math.min(0, d3.min(covid_data, d => d.value)), Math.max(0, d3.max(covid_data, d => d.value))])
            .range([0, width]);

        var y1zeroposition = width*Math.min(0, d3.min(unemploy_data, d => d.value))/(Math.min(0, d3.min(unemploy_data, d => d.value))-Math.max(0, d3.max(unemploy_data, d => d.value)));

        // unemployment bars
        svg.selectAll('.bar1')
            .data(unemploy_data)
            .enter()
            .append('rect')
            .attr('class', 'bar1')
            .attr('y', d => x(d.state))
            .attr('x', d => {if (d.value > 0) {return y1zeroposition;} else {return y1(d.value)}} )
            .attr('width', d => {if (d.value < 0) {return y1zeroposition-y1(d.value);} else if (d.value > 0) {return y1(d.value)-y1zeroposition;} else {return 1;}})
            .attr('height', bar_width)
            .attr('fill', d => "#4e8df2");

        svg.selectAll('.name')
            .data(unemploy_data)
            .enter()
            .append('text')
            .text(d => d.state)
            .attr('text-anchor', 'middle')
            .attr('class', 'name')
            .attr('x', d => -20)
            .attr('y', d => x(d.state) + 15);

        // covid bars
        svg.selectAll('.bar2')
            .data(covid_data)
            .enter()
            .append('rect')
            .attr('class', 'bar2')
            .attr('x', d => width*Math.min(0, d3.min(covid_data, d => d.value))/(Math.min(0, d3.min(covid_data, d => d.value))-Math.max(0, d3.max(covid_data, d => d.value))))
            .attr('y', d => x(d.state)+bar_width)
            .attr('width', d => y2(d.value))
            .attr('height', bar_width)
            .attr('fill', d => '#fac150');

        var xAxis = d3.axisLeft()
            .scale(d3.scaleLinear().range([0, height+5]))  // adding outer padding to scaleBand
            .ticks(0)
            .tickSize(0)
            .tickFormat('');

        svg.append('g')
            .attr('class', 'axis')
            .call(xAxis);

        var y1Axis = d3.axisTop()
            .scale(y1)
            .ticks(5, 'd')
            .tickFormat(function (d){
                return d3.format(".1f")(d);
            });

        svg.append('g')
            .attr('class', 'axis')
            .attr('id', 'axis_top').attr('stroke', '#4e8df2')
            .call(y1Axis);

        var y2Axis = d3.axisBottom()
            .scale(y2)
            .ticks(5, 'd')
            .tickFormat(function (d){
                return d3.format(".0s")(d);
            });

        svg.append('g')
            .attr('class', 'axis')
            .attr('id', 'axis_bottom')
            .attr('transform', 'translate(0,'+height+')').attr('stroke', '#fac150')
            .call(y2Axis);

        svg.append('text')
            .attr('x', -50)
            .attr('y', -5)
            .attr('class', 'xlabel')
            .append('tspan').text('State')

        svg.append('text')
            .attr('x', width - 150)
            .attr('y', -25)
            .attr('class', 'ylabel')
            .append('tspan').text('Unemployment Rate (%)').attr('fill', '#4e8df2')

        svg.append('text')
            .attr('x', width - 100)
            .attr('y', height + 35)
            .attr('class', 'ylabel')
            .append('tspan').text('COVID-19 Confirmed').attr('fill', '#fac150')

        // draw legend
        // var r = d3.range(0, 550000, 1000);
        // svg.selectAll("rect")
        //     .data(r)
        //     .enter()
        //     .append("rect")
        //     .attr("x", width+30)
        //     .attr("y", d=>height-y2(d)/width*height+0)
        //     .attr("width", 10)
        //     .attr("height", 10)
        //     .attr("fill", d => colorscale2(d))

        function topten(data) {
            return data.sort(function (a, b) { return d3.descending(a.value, b.value) }).slice(0, 10);
        }
        function bottomten(data) {
            return data.sort(function (a, b) { return d3.ascending(a.value, b.value) }).slice(0, 10);
        }
    }

    // draw chart
    useEffect(() => {
        // construct promises
        var promises = [];
        var files = [unemploy_data, covid_data];
        files.forEach(url => promises.push(d3.csv(url))); //  store two promises
        // console.log(promises)

        Promise.all(promises).then(function(values) {

                var unemploy_data = values[0];
                var covid_data = values[1];
                // console.log(unemploy_data)

                // extract unemployment data for chart
                const unemployment_start_rate = Object.fromEntries(unemploy_data.filter(x => x["Year"] == start_year && x["Period"] == monthmap[start_month]).map(d => [statemap[d.State], +d.unemploymentrate]));
                const unemployment_end_rate = Object.fromEntries(unemploy_data.filter(x => x["Year"] == end_year && x["Period"] == monthmap[end_month]).map(d => [statemap[d.State], +d.unemploymentrate]));
                // console.log(unemployment_start_rate);
                // console.log(unemployment_end_rate)
                var unemploy_data_to_chart = [];
                for (let k in statemap) {
                    var state = statemap[k];
                    unemploy_data_to_chart.push({"state": state, "value": +(unemployment_end_rate[state] - unemployment_start_rate[state]).toFixed(2)});
                }
                // console.log(unemploy_data_to_chart)

                // extract covid data for chart
                const temp_covid_data_to_chart = CovidDataPreprocess(covid_data);
                var covid_data_to_chart = [];
                for (let k in temp_covid_data_to_chart) {
                    if (statemap[k]) {
                        covid_data_to_chart.push({"state": statemap[k], "value": temp_covid_data_to_chart[k]});
                    }
                }
                // console.log(covid_data_to_chart);

                // draw chart
                var w =  parseInt(d3.select(chartRef.current).style("width"))
                console.log("w",w)
                var margin = { top: 50, left: 50, bottom: 60, right: 50 },
                    width = w - margin.left - margin.right;
                    bar_width = width/16;
                var height = bar_num * bar_width * 3.5 - margin.top - margin.bottom;
                
                var svg = d3.select(chartRef.current).append('svg')//.attr('viewBox', [0, 0, 1100, 610])
                    .attr('id', "bar_chart")
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .append('g')
                    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
                
                draw(svg, width, height, unemploy_data_to_chart, covid_data_to_chart, filter);
                

                
        });
        window.addEventListener('resize', function(){console.log("resize",d3.select(chartRef.current).style("width"));redraw_resize(parseInt(d3.select(chartRef.current).style("width")))})
    }, []);


    function redraw_resize(w){
        var svg = d3.select('#bar_chart')
        svg.attr("width",w)
    
    }


    // function to redraw according to filter
    function redraw(width, height, unemploy_data, covid_data, filter) {
        if (filter == 'top') {
            unemploy_data = topten(unemploy_data);
        } else if (filter == 'bottom') {
            unemploy_data = bottomten(unemploy_data);
        }
        console.log(unemploy_data);
        // process covid_data
        var states_to_show = unemploy_data.map(d => d.state);
        var covid_data_temp = covid_data.map(d => {if (states_to_show.includes(d.state)) {return d;}});
        var covid_data = [];
        for (let i in covid_data_temp) {
            if (covid_data_temp[i]) {
                covid_data.push(covid_data_temp[i]);
            };
        }

        var x = d3.scaleBand();
        var y1 = d3.scaleLinear();
        var y2 = d3.scaleLinear();

        x.domain(unemploy_data.map(d => d.state))
            .range([7, height-10])
            .paddingInner(0.2);

        y1.domain([Math.min(0, d3.min(unemploy_data, d => d.value)), Math.max(0, d3.max(unemploy_data, d => d.value))])
            .range([0, width]);
        
        y2.domain([Math.min(0, d3.min(covid_data, d => d.value)), Math.max(0, d3.max(covid_data, d => d.value))])
            .range([0, width]);

        var y1zeroposition = width*Math.min(0, d3.min(unemploy_data, d => d.value))/(Math.min(0, d3.min(unemploy_data, d => d.value))-Math.max(0, d3.max(unemploy_data, d => d.value)));

        // update unemployment bars
        var svg = d3.select('#bar_chart')
        svg.selectAll('.bar1').data(unemploy_data)
            .transition()
            .duration(800)
            .attr('x', d => {if (d.value > 0) {return y1zeroposition;} else {return y1(d.value)}} )
            .attr('width', d => {if (d.value < 0) {return y1zeroposition-y1(d.value);} else if (d.value > 0) {return y1(d.value)-y1zeroposition;} else {return 1;}})
            .attr('fill', d => '#4e8df2');

        svg.selectAll('.name')
            .data(unemploy_data)
            .transition()
            .text(d => d.state);

        // update covid bars
        svg.selectAll('.bar2')
            .data(covid_data)
            .transition()
            .duration(800)
            .attr('x', d => width*Math.min(0, d3.min(covid_data, d => d.value))/(Math.min(0, d3.min(covid_data, d => d.value))-Math.max(0, d3.max(covid_data, d => d.value))))
            .attr('width', d => y2(d.value))
            .attr('fill', d => '#fac150');

        // update axes
        var y1Axis = d3.axisTop()
            .scale(y1)
            .ticks(5, 'd')
            .tickFormat(function (d){
                return d3.format(".1f")(d);
            });

        svg.select('#axis_top')
            .transition()
            .duration(800)
            .call(y1Axis);

        var y2Axis = d3.axisBottom()
            .scale(y2)
            .ticks(5, 'd')
            .tickFormat(function (d){
                return d3.format(".0s")(d);
            });

        svg.select('#axis_bottom')
            .transition()
            .duration(800)
            .call(y2Axis);

        function topten(data) {
            return data.sort(function (a, b) { return d3.descending(a.value, b.value) }).slice(0, 10);
        }
        function bottomten(data) {
            return data.sort(function (a, b) { return d3.ascending(a.value, b.value) }).slice(0, 10);
        }
    }

    // redraw svg according to filter
    useEffect(() => {
        console.log(filter);
        // construct promises
        var promises = [];
        var files = [unemploy_data, covid_data];
        files.forEach(url => promises.push(d3.csv(url))); //  store two promises
        // console.log(promises)

        Promise.all(promises).then(function(values) {

                var unemploy_data = values[0];
                var covid_data = values[1];
                // console.log(unemploy_data)

                // extract unemployment data for chart
                const unemployment_start_rate = Object.fromEntries(unemploy_data.filter(x => x["Year"] == start_year && x["Period"] == monthmap[start_month]).map(d => [statemap[d.State], +d.unemploymentrate]));
                const unemployment_end_rate = Object.fromEntries(unemploy_data.filter(x => x["Year"] == end_year && x["Period"] == monthmap[end_month]).map(d => [statemap[d.State], +d.unemploymentrate]));
                // console.log(unemployment_start_rate);
                // console.log(unemployment_end_rate)
                var unemploy_data_to_chart = [];
                for (let k in statemap) {
                    var state = statemap[k];
                    unemploy_data_to_chart.push({"state": state, "value": +(unemployment_end_rate[state] - unemployment_start_rate[state]).toFixed(2)});
                }
                // console.log(unemploy_data_to_chart)

                // extract covid data for chart
                const temp_covid_data_to_chart = CovidDataPreprocess(covid_data);
                var covid_data_to_chart = [];
                for (let k in temp_covid_data_to_chart) {
                    if (statemap[k]) {
                        covid_data_to_chart.push({"state": statemap[k], "value": temp_covid_data_to_chart[k]});
                    }
                }
                // console.log(covid_data_to_chart);
                var w =  parseInt(d3.select(chartRef.current).style("width"))
                // redraw chart
                var margin = { top: 50, left: 50, bottom: 60, right: 50 },
                    width = w - margin.left - margin.right,
                    height = bar_num * bar_width * 3.1 - margin.top - margin.bottom;
                
                redraw(width, height, unemploy_data_to_chart, covid_data_to_chart, filter);
            });
                
        
    }, [filter, start_year, start_month, end_year, end_month])

    return (
        <div className={classes.BarChart}>
            <h1>{chartTitle}</h1>
            <button onClick={() => props.switchFilterHandler("top")}>Top 10</button>
            <button onClick={() => props.switchFilterHandler("bottom")}>Bottom 10</button>

            <div ref={chartRef}  style={{width:"400",display: 'flex', flexDirection: 'col', alignItems: 'center', justifyContent: 'left' }}/>
        </div>
    );
}

export default BarChart;