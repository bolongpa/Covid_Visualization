//import { format } from 'd3';
import React, { Component } from 'react';
import DatePicker from "react-datepicker";
//import * as d3 from 'd3';
import D3map from '../../components/Map/D3map.js';
import "react-datepicker/dist/react-datepicker.css";
class Map extends Component {
    state = {
        startDate: new Date("2020/1/22"),
        endDate: new Date("2020/7/22")
    }

    render() {
        return (
            <div>
                <p> Introduction here</p>
                <div >
                    <DatePicker selected={this.state.startDate} onChange={date => this.setState({ startDate: date })} minDate={new Date("2019/1/1")} maxDate={new Date("2020/9/1")} dateFormat="MM/yyyy" showMonthYearPicker />
                </div>
                <div>
                    <DatePicker selected={this.state.endDate} onChange={date => this.setState({ endDate: date })} minDate={this.state.startDate} maxDate={new Date("2020/9/1")} dateFormat="MM/yyyy" showMonthYearPicker />
                </div>
                <D3map startMonth={this.state.startDate} endMonth={this.state.endDate}></D3map>
                {console.log(this.state.startDate.getMonth())}

            </div>

        );
    }
}

export default Map;