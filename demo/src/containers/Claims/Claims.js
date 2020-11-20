import React, { Component } from 'react';

import Donut from '../../components/DonutChart/DonutChart';
import MapBox from '../../containers/MapBox/MapBox';

class Recovery extends Component {
    render() {
        return (
            <div>
                <Donut />
                <MapBox />
            </div>
        )
    }
};


export default Recovery;