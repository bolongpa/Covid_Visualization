import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import us from "../../assets/data/counties-albers-10m.json";
import unemploy from "../../assets/data/unemployment.csv";
import covid from "../../assets/data/time_series_covid19_confirmed_US.csv";
import { feature, mesh } from "topojson-client";


var monthmap = { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec" }
var start = new Date("2020/1/1")
var end = new Date("2020/8/1")
const colorscale = d3.scaleSequential().domain([-3, 3]).interpolator(d3.interpolateRdBu)
const timeFormat = d3.timeFormat('%m/%d/%y')
var radius
var _s1 = d3.format(",.2s")
var offset = new Set(["25","10","09","44"])

const D3map = (props) => {
    const svgRef = useRef()
    start = props.startMonth
    end = props.endMonth

    function aggregate(data) {
        // console.log("agg",data)
        console.log(data)
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
        // console.log(covid_data)
        return covid_data
    }


    useEffect(() => {
        var svg = d3.select(svgRef.current).append("svg").attr('width', "800px")
            .attr('height', "800px").attr('viewBox', [0, 0, 1100, 610])
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
        // console.log(feature(us, us.objects.states))
        

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
                radius = d3.scaleSqrt().domain(d3.extent(Object.values(covid_data))).range([0, 25])

                const early = Object.fromEntries(unemploy_data.filter(x => x["Year"] == start.getYear() - 100 + 2000 && x["Period"] == monthmap[start.getMonth() + 1]).map(d => [d.State, d.unemploymentrate]))
                var current = Object.fromEntries(unemploy_data.filter(x => x["Year"] == end.getYear() - 100 + 2000 && x["Period"] == monthmap[end.getMonth() + 1]).map(d => [d.State, d.unemploymentrate.replace("(P)", "")]))
                
                var new_us = feature(us, us.objects.states).features
                    // console.log("newus",new_us)
                new_us.forEach(function(dd) {
                    dd.properties.unemploy = (+current[dd.properties.name] - early[dd.properties.name]) / +early[dd.properties.name];
                    dd.properties.covid = covid_data[dd.properties.name]
                })
                console.log("one", feature(us, us.objects.states).features)


                var r = [5,2,0,-2,-5]
                // var yscale = d3.scaleBand().domain(r).range([0, 300]).paddingInner(0).paddingOuter(0)
                var xscale = d3.scaleLinear().domain([-4,4]).range([0, 300])
                console.log(xscale.domain())
                var xaxis = d3.axisTop(xscale);

                svg.append("text").attr("x",550).attr("font-size",10).text("Unemployment growth rate").attr("fill","black")
                var axis_g = svg.append('g').attr('transform', 'translate(' + 550 + "," + 30 + ')')
                axis_g.call(xaxis).attr("y",10).select(".domain").remove();

                r = d3.range(-4, 4, 0.05)
                axis_g.selectAll("rect")
                    .data(r)
                    .enter()
                    .append("rect")
                    .attr("x", d=>xscale(d))
                    .attr("y", 0)
                    .attr("width", 4)
                    .attr("height", 8)
                    .attr("fill", d => colorscale(d))

                svg.append("g")
                    .attr("width",900)
                    .attr('class', 'countries')
                    .selectAll("path")
                    .data(feature(us, us.objects.states).features) //🚧  use us features
                    .join("path")
                    .attr("id", d => d.properties.name.replace(" ",""))
                    .attr("stroke", "none")
                    .attr("fill", function(d) {return colorscale(d.properties.unemploy)}) //🚧  fill color based on value whose key is id
                    .attr("fill-opacity",0.7)
                    .on("click", function(e, d) {
                        console.log(d.id)
                        console.log(d.properties.name)
                    })
                    .on("mouseover",function(e,d){
                        d3.select(this).attr("fill-opacity",1)
                        // console.log(d)
                        d3.select("text#"+d.properties.name.replace(" ","")).attr("display","block")

                    }
                    )
                    .on("mouseout",function(e,d){
                        d3.select(this).attr("fill-opacity",0.7)
                        d3.select("text#"+d.properties.name.replace(" ","")).attr("display","none")
                    })
                    .attr("d", path)
                    .append("title")

                
                const text_select = svg.append('g')
                    .selectAll("text")
                    .data(feature(us, us.objects.states).features)
                    .enter()
                    .append("text")
                    .attr("id",d=>d.properties.name.replace(" ",""))
                    .attr("text-anchor", "middle")
                    .attr('transform', d => `translate(${path.centroid(d)})`)
                    .attr("display","none")
                    .on("mouseover",function(e,d){
                        d3.select(this).attr("display","block")
                        d3.select("path#"+d.properties.name.replace(" ","")).attr("fill-opacity",1)
                    })
                    .on("mouseout",function(e,d){
                        d3.select(this).attr("display","none")
                        d3.select("path#"+d.properties.name.replace(" ","")).attr("fill-opacity",0.7)
                    })
                
                text_select.append("tspan").attr("x",0).attr("dx",d=>offset.has(d.id)?"5em":"0").attr("dy", "0em").attr("class","tspan1")
                .text(d => d.properties.name)
                text_select.append("tspan").attr("x",0).attr("dx",d=>offset.has(d.id)?"3em":"0").attr("dy", "1.5em").attr("class","tspan2")
                .text(d=>"+"+_s1(+d.properties.covid))

            })
            
    }, [])

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
                // var radius = d3.scaleSqrt().domain(d3.extent(Object.values(covid_data))).range([5, 25])



                const early = Object.fromEntries(unemploy_data.filter(x => x["Year"] == start.getYear() - 100 + 2000 && x["Period"] == monthmap[start.getMonth() + 1]).map(d => [d.State, d.unemploymentrate.replace("(P)", "")]))
                var current = Object.fromEntries(unemploy_data.filter(x => x["Year"] == end.getYear() - 100 + 2000 && x["Period"] == monthmap[end.getMonth() + 1]).map(d => [d.State, d.unemploymentrate.replace("(P)", "")]))
                var new_us = feature(us, us.objects.states).features
                console.log(current,early)
                    // console.log("newus",new_us)
                new_us.forEach(function(dd) {
                    dd.properties.unemploy = (+current[dd.properties.name] - early[dd.properties.name]) / +early[dd.properties.name];
                    dd.properties.covid = covid_data[dd.properties.name]
                })
                console.log("new", new_us)


                new_us.forEach(function(d) {
                    // console.log(d3.select("#" + d.properties.name))

                    d3.select("path#" + d.properties.name.replace(" ","")).transition().attr("fill", d => colorscale(d.properties.unemploy))
                    //d3.select("circle#" + d.properties.name.replace(" ","")).transition().attr("fill", d => colorscale(d.properties.unemploy)).attr('r', d => radius(d.properties.covid))
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

                d3.selectAll(".tspan2").text(d=>isNaN(d.properties.covid)?"--":"+"+_s1(+d.properties.covid))

            })
    }, [start, end])








    return ( <React.Fragment>
        <div ref = { svgRef }>

        </div> 
        </React.Fragment>
    )
}

export default D3map;