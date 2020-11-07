import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import us from "../../assets/data/counties-albers-10m.json";
import unemploy from "../../assets/data/unemployment.csv";
import covid from "../../assets/data/time_series_covid19_confirmed_US.csv";
import { feature, mesh } from "topojson-client";


var monthmap = { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec" }
var start = new Date("2020/1/1")
var end = new Date("2020/8/1")
const colorscale = d3.scaleSequential().domain([-5, 5]).interpolator(d3.interpolateRdBu)
const timeFormat = d3.timeFormat('%m/%d/%y')

const D3map = (props) => {
    const svgRef = useRef()
    start = props.startMonth
    end = props.endMonth

    function aggregate(data) {
        // console.log("agg",data)
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
        console.log(new_start, new_end)

        covid_data = covid_data.map(d => [d.Province_State, d[new_end] - d[new_start]])
        covid_data = aggregate(covid_data)
        return covid_data
    }




    useEffect(() => {
        console.log("trigger useffect")
        var promises = [];
        var files = [unemploy, covid];
        files.forEach(url => promises.push(d3.csv(url))); //🚧  store two promises
        // console.log(promises)

        Promise.all(promises).then(function(values) {

                var unemploy_data = values[0]
                var covid_data = values[1]

                covid_data = CovidDataPreprocess(covid_data)
                var radius = d3.scaleSqrt().domain(d3.extent(Object.values(covid_data))).range([5, 25])



                const early = Object.fromEntries(unemploy_data.filter(x => x["Year"] == start.getYear() - 100 + 2000 && x["Period"] == monthmap[start.getMonth() + 1]).map(d => [d.State, d.unemploymentrate]))
                var current = Object.fromEntries(unemploy_data.filter(x => x["Year"] == end.getYear() - 100 + 2000 && x["Period"] == monthmap[end.getMonth() + 1]).map(d => [d.State, d.unemploymentrate.replace("(P)", "")]))
                var new_us = feature(us, us.objects.states).features
                    // console.log("newus",new_us)
                new_us.forEach(function(dd) {
                    dd.properties.unemploy = (+current[dd.properties.name] - early[dd.properties.name]) / +early[dd.properties.name];
                    dd.properties.covid = covid_data[dd.properties.name]
                })
                console.log("new", new_us)

                new_us.forEach(function(d) {
                    d3.select("#" + d.properties.name).transition().attr("fill", d => colorscale(d.properties.unemploy)).attr('r', d => radius(d.properties.covid))
                })

                const legend = d3.select("#legend")
                console.log([d3.min(Object.values(covid_data)), d3.quantile(Object.values(covid_data).sort(d3.ascending), 0.6), d3.max(Object.values(covid_data))])
                legend.selectAll("circle").data([d3.min(Object.values(covid_data)), d3.quantile(Object.values(covid_data).sort(d3.ascending), 0.6), d3.max(Object.values(covid_data))])
                    .attr('cy', d => -radius(d))
                    .attr('r', radius);

                legend.selectAll("text").data([d3.min(Object.values(covid_data)), d3.quantile(Object.values(covid_data).sort(d3.ascending), 0.6), d3.max(Object.values(covid_data))])
                    .attr('y', d => -2 * radius(d))
                    .attr('dy', '1.3em')
                    .text(d => d3.format('.1s')(d))




            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [start, end])

    useEffect(() => {
        var svg = d3.select(svgRef.current).append("svg").attr('width', "1000px")
            .attr('height', "800px").attr('viewBox', [0, 0, 975, 610])
        var path = d3.geoPath()
        svg.append('path')
            .datum(feature(us, us.objects.nation))
            .attr('fill', 'lightgrey')
            .attr('d', path);

        svg.append('path')
            .datum(mesh(us, us.objects.states, (a, b) => a !== b))
            .attr('fill', 'none')
            .attr('stroke', 'white')
            .attr('stroke-linejoin', 'round')
            .attr('d', path);
        console.log(feature(us, us.objects.states))
        svg.append('g')
            .selectAll("text")
            .data(feature(us, us.objects.states).features)
            .enter()
            .append("text")
            .text(d => d.properties.name)
            .attr("text-anchor", "middle")
            .attr('transform', d => `translate(${path.centroid(d)})`)

        var promises = [];
        var files = [unemploy, covid];
        files.forEach(url => promises.push(d3.csv(url))); //🚧  store two promises
        console.log(promises)

        Promise.all(promises).then(function(values) {

                var unemploy_data = values[0]
                var covid_data = values[1]

                covid_data = CovidDataPreprocess(covid_data)
                    // console.log(Object.keys(covid_data))

                // var radius = d3.scaleSqrt([0, d3.quantile(Object.values(covid_data).sort(d3.ascending), 0.985)], [5, 40]);
                var radius = d3.scaleSqrt().domain(d3.extent(Object.values(covid_data))).range([5, 25])

                const early = Object.fromEntries(unemploy_data.filter(x => x["Year"] == start.getYear() - 100 + 2000 && x["Period"] == monthmap[start.getMonth() + 1]).map(d => [d.State, d.unemploymentrate]))
                var current = Object.fromEntries(unemploy_data.filter(x => x["Year"] == end.getYear() - 100 + 2000 && x["Period"] == monthmap[end.getMonth() + 1]).map(d => [d.State, d.unemploymentrate.replace("(P)", "")]))
                var new_us = feature(us, us.objects.states).features
                    // console.log("newus",new_us)
                new_us.forEach(function(dd) {
                    dd.properties.unemploy = (+current[dd.properties.name] - early[dd.properties.name]) / +early[dd.properties.name];
                    dd.properties.covid = covid_data[dd.properties.name]
                })
                console.log("new", new_us)

                svg.append("g")
                    .attr('class', 'countries')
                    .selectAll("path")
                    .data(feature(us, us.objects.states).features) //🚧  use us features
                    .join("path")
                    .attr("id", d => d.properties.name)
                    .attr("stroke", "#333")
                    .attr("fill", d => colorscale(d.properties.unemploy)) //🚧  fill color based on value whose key is id
                    .on("click", function(e, d) {
                        console.log(d.id)
                    })
                    .attr("d", path)
                    .append("title")

                svg.append('g')
                    .selectAll("circle")
                    .data(feature(us, us.objects.states).features)
                    .enter()
                    .append("circle")
                    .attr("id", d => d.properties.name)
                    .attr('transform', d => `translate(${path.centroid(d)})`)
                    .attr('r', d => radius(d.properties.covid))
                    .attr("fill", "none")
                    // .attr('fill-opacity', 0.7)
                    .attr('stroke', 'black')
                    .attr('stroke-width', 0.5)



                const legend = svg.append('g')
                    .attr('fill', '#777')
                    .attr('transform', 'translate(910,608)')
                    .attr('text-anchor', 'middle')
                    .style('font', '10px sans-serif')
                    .attr("id", "legend")
                    .selectAll('g')
                    .data([2000, 100000, 700000])
                    .join('g');

                legend.append('circle')
                    .attr('fill', 'none')
                    .attr('stroke', 'red')
                    .attr('cy', d => -radius(d))
                    .attr('r', radius);

                legend.append('text')
                    .attr('y', d => -2 * radius(d))
                    .attr('dy', '1.3em')
                    .text(d3.format('.1s'));
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])






    return ( <React.Fragment>
        <div ref = { svgRef }/> 
        </React.Fragment>
    )
}

export default D3map;