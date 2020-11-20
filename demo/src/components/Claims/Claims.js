import React from 'react';

import Donut from '../DonutChart/DonutChart';
import MapBox from '../../containers/MapBox/MapBox';

import NationalClaim from '../../assets/data/nationalUnemploymentWeeklyClaims.json';

const Claims = (props) => {

    return (
        <div>
            <Donut data={NationalClaim.Jan4} />
            <Donut data={NationalClaim.Mar21} />
            <Donut data={NationalClaim.May9} />
            <Donut data={NationalClaim.Oct24} />
            <MapBox />
        </div>
    )
};

export default Claims;