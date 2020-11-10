import React, { Component } from 'react';
import DatePicker from "react-datepicker";

import D3map from '../../components/Map/D3map.js';
import BarChart from '../../components/Bar/BarChart';

import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col } from 'react-bootstrap';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

// input data for bar chart
import unemploy_data from "../../assets/data/unemployment.csv";
import covid_data from "../../assets/data/time_series_covid19_confirmed_US.csv";

class Map extends Component {
    state = {
        startDate: new Date("2020/1/22"),
        endDate: new Date("2020/7/22"),

        barChosenDataset: 'unemployment',
        unemploy_data: unemploy_data,
        covid_data: covid_data,

        chartUI: {
            bar: {
                title: 'Bar Chart',
                filter: 'all'
            }
        }
    }

    barSwitchFilterHandler = (bar) => {
        this.setState({
            chartUI: {
                ...this.state.chartUI,
                [bar]: {
                    ...this.state.chartUI[bar],
                    filter: "top"
                }
            }
        });
    }

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
        return (
            <React.Fragment>
                {/* <p> Introduction here</p> */}
                {/* <Container fluid="md" width="100%"> */}
                    <Row  md={8} lg={1}>
                        <Col xs='auto'>Start Month:</Col>
                        <Col>   
                            <DatePicker selected={this.state.startDate} onChange={date => this.setState({ startDate: date })} minDate={new Date("2019/1/1")} maxDate={new Date("2020/9/1")} dateFormat="MM/yyyy" showMonthYearPicker />
                        </Col>
                        <Col xs='auto'>End Month:</Col>
                        <Col>
                            <DatePicker selected={this.state.endDate} onChange={date => this.setState({ endDate: date })} minDate={this.state.startDate} maxDate={new Date("2020/9/1")} dateFormat="MM/yyyy" showMonthYearPicker />
                        </Col>
                </Row>
                <Row>
                    <Col>
                    <D3map startMonth={this.state.startDate} endMonth={this.state.endDate}></D3map>
                    </Col>
                {console.log(this.state.startDate.getMonth())}
                
                <Col>
                <BarChart
                    time={this.state.startDate}
                    chosenDataset={this.state.barChosenDataset}
                    unemploy_data={this.state.unemploy_data}
                    covid_data={this.state.covid_data}
                    title={this.state.chartUI.bar.title}
                    filter={this.state.chartUI.bar.filter}

                    resetTitleHandler={this.resetTitleHandler}
                    switchFilterHandler={this.barSwitchFilterHandler} />
                </Col>
                </Row>
                {/* </Container> */}
                </React.Fragment>
           

        );
    }
}

export default Map;