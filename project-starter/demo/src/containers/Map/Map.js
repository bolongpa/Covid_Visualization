import React, { Component } from 'react';
import DatePicker from "react-datepicker";

import D3map from '../../components/Map/D3map.js';
import BarChart from '../../components/Bar/BarChart';

import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col,Alert,Badge } from 'react-bootstrap';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

// input data for bar chart
import unemploy_data from "../../assets/data/unemployment.csv";
import covid_data from "../../assets/data/time_series_covid19_confirmed_US.csv";

class Map extends Component {
    state = {
        startDate: new Date("2020/1/22"),
        endDate: new Date("2020/7/22"),

        barChosenDataset: 'unemploy_data',
        unemploy_data: unemploy_data,
        covid_data: covid_data,

        chartUI: {
            bar: {
                title: 'Unemployment Rate Bar Chart',
                filter: 'top'
            }
        }
    }

    barSwitchFilterHandler = (filterType) => {
        this.setState({
            chartUI: {
                ...this.state.chartUI,
                bar: {
                    ...this.state.chartUI.bar,
                    filter: filterType
                }
            }
        });
    }

    resetTitleHandler = (chart, newTitle) => {
        this.setState({
            chartUI: {
                ...this.state.chartUI,
                [chart]: {
                    ...this.state.chartUI[chart],
                    title: newTitle + chart.charAt(0).toUpperCase() + chart.slice(1) + " Chart"
                }
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                {/* <p> Introduction here</p> */}
                <Container fluid>
                <Alert variant="dark">
                    
                    <h3>In this section, you can explore the unemployment rate and covid pandemic more!</h3>
                    <p>For better understanding of the relationship between unemployment rate and number of covid cases, you can pick the period you are interested and see the change of unemployment rate during that time. When hovering over the state, the increase number of covid of that period will also show up.</p>
                    <p>Currently, we only have employment data till 2020 August.</p>
                    <hr />
                    <p>Bar chart...</p>
                
                <Row >
                <Badge pill variant="success">
                    Success
                </Badge>

                    <Col xs='auto'>Start Month:</Col>
                    <Col xs = "2">
                        <DatePicker selected={this.state.startDate} onChange={date => this.setState({ startDate: date })} minDate={new Date("2019/1/1")} maxDate={new Date("2020/9/1")} dateFormat="MM/yyyy" showMonthYearPicker />
                    </Col>
                                  
                    <Col xs='auto'>End Month:</Col>
                    <Col xs = "2">
                        <DatePicker selected={this.state.endDate} onChange={date => this.setState({ endDate: date })} minDate={this.state.startDate} maxDate={new Date("2020/9/1")} dateFormat="MM/yyyy" showMonthYearPicker />
                    </Col>

                </Row>
                </Alert>
                <Row>
                    <Col xs="7">
                        <D3map startMonth={this.state.startDate} endMonth={this.state.endDate}></D3map>
                    </Col>
                    {console.log(this.state.startDate.getMonth())}

                    <Col >
                        <BarChart
                            start={this.state.startDate}
                            end={this.state.endDate}
                            chosenDataset={this.state[this.state.barChosenDataset]}
                            title={this.state.chartUI.bar.title}
                            filter={this.state.chartUI.bar.filter}

                            resetTitleHandler={this.resetTitleHandler}
                            switchFilterHandler={this.barSwitchFilterHandler} />
                    </Col>
                </Row>
                </Container>
            </React.Fragment>


        );
    }
}

export default Map;