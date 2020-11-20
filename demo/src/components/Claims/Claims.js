import React from 'react';

import Donut from '../DonutChart/DonutChart';
import MapBox from '../../containers/MapBox/MapBox';

const Claims = (props) => {
    return (
        <div>
            <Donut />
            <MapBox />
        </div>
    )
};

export default Claims;