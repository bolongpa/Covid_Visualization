import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import * as d3 from 'd3';

import classes from './MultiCharts.css';
import BubbleChart from '../../components/BubbleChart/BubbleChart';
import BarChart from '../../components/BarChart/BarChart';
import * as inputData from '../../assets/data/newUsers.json';
//import "../../../node_modules/react-datepicker/dist/react-datepicker.css"
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";


class MultiCharts extends Component {

    constructor(props) {
        super(props);
        this.btn1Ref = React.createRef();
        this.btn2Ref = React.createRef();
        this.btn3Ref = React.createRef();
    }

    state = {
        startdate: new Date(),
        enddate: new Date(),
        bubbleData: inputData.data.slice(0, 10).map(x => [x.week * 50, x.users, x.orders]), // the [x, y, size] of bubbles
        barData: inputData.data,
        chartUI: {
            bubble: {
                title: 'Bubble Chart Demo'
            },
            bar: {
                title: 'Bar Chart Demo',
                color: 'steelblue'
            }
        }
    }

    // for button playground
    resetBtnColorHandler = () => {
        d3.selectAll('span').style('background-color', '#eee').style('color', 'black');
        // d3.select(this.btn1Ref.current).style('background-color', '#eee').style('color', 'black');
        // d3.select(this.btn2Ref.current).style('background-color', '#eee').style('color', 'black');
        // d3.select(this.btn3Ref.current).style('background-color', '#eee').style('color', 'black');
    }

    buttonColorHandler = (ref) => {
        console.log(ref);
        this.resetBtnColorHandler();
        d3.select(ref.current).style('background-color', 'salmon').style('color', 'white');
    }

    // for datepicker playground
    setDateHandler = (date, which) => {
        this.setState({
            [which]: date
        })
    }

    // this function is for the bar chart, it is triggered when the "SwitchColor" button is clicked in the BarChart component
    switchBarColorHandler = () => {
        console.log("switch!")
        if (this.state.chartUI.bar.color === 'steelblue') {
            this.setState({
                chartUI: {
                    ...this.state.chartUI,
                    bar: {
                        ...this.state.chartUI.bar,
                        color: 'orange'
                    }
                }
            })
        } else {
            this.setState({
                chartUI: {
                    ...this.state.chartUI,
                    bar: {
                        ...this.state.chartUI.bar,
                        color: 'steelblue'
                    }
                }
            })
        }
    }

    // this function is for both charts, it listens to the click event of the "Modify property used by both chart" button,
    // which locates in this MultiCharts component
    updateTitleHandler = () => {
        this.setState({
            chartUI: {
                ...this.state.chartUI,
                bar: {
                    ...this.state.chartUI.bar,
                    title: this.state.chartUI.bar.title + ' Go'
                },
                bubble: {
                    ...this.state.chartUI.bubble,
                    title: this.state.chartUI.bubble.title + ' Go'
                }

            }
        })
    }

    // this function is for both charts, it listens to the click event of the "Reset Title" button,
    // which locate in both the BarChart component and the BubbleChart component
    resetTitleHandler = (chart) => {
        this.setState({
            chartUI: {
                ...this.state.chartUI,
                [chart]: {
                    ...this.state.chartUI[chart],
                    title: chart.charAt(0).toUpperCase() + chart.slice(1) + " Chart Demo"
                }
            }
        })
    }

    render() {
        console.log(this.state.bubbleData)
        return (
            <div className={classes.MultiCharts}>
                <h1>DatePicker Playground</h1>
                <div className={classes.MyDatePicker}>
                    <DatePicker selected={this.state.startdate} onChange={date => this.setDateHandler(date, "startdate")} />
                </div>
                <div className={classes.MyDatePicker}>
                    <DatePicker selected={this.state.enddate} onChange={date => this.setDateHandler(date, "enddate")} />
                </div>

                <h1>Button Playground</h1>
                <span ref={this.btn1Ref} onClick={() => this.buttonColorHandler(this.btn1Ref)}>Button1</span>
                <span ref={this.btn2Ref} onClick={() => this.buttonColorHandler(this.btn2Ref)}>Button2</span>
                <span ref={this.btn3Ref} onClick={() => this.buttonColorHandler(this.btn3Ref)}>Button3</span>

                <h1>How to put multiple charts together</h1>
                <p>Play with the buttons and see how functions are passed into components to trigger re-rendering :)</p>
                <button onClick={this.updateTitleHandler}>Modify property used by both chart</button>
                <BubbleChart
                    inputData={this.state.bubbleData}
                    title={this.state.chartUI.bubble.title}
                    resetTitleHandler={this.resetTitleHandler} />
                <br />
                <BarChart
                    inputData={this.state.barData}
                    title={this.state.chartUI.bar.title}
                    resetTitleHandler={this.resetTitleHandler}
                    barColor={this.state.chartUI.bar.color}
                    switchColorHandler={this.switchBarColorHandler} />
            </div>
        );
    }
}

export default MultiCharts;