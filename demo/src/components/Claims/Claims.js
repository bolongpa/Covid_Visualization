import React from 'react';

import Donut from '../DonutChart/DonutChart';
import MapBox from '../../containers/MapBox/MapBox';

import NationalClaim from '../../assets/data/nationalUnemploymentWeeklyClaims.json';

const Claims = (props) => {

    return (
        <div>
            <p>Some intro of weekly claim</p>

            <MapBox />
            <p>Some conclusions of observations of the latest weekly claim (initial + continued claims) on map</p>

            <Donut data={NationalClaim.Jan4} />
            <Donut data={NationalClaim.Mar21} />
            <Donut data={NationalClaim.May9} />
            <Donut data={NationalClaim.Oct24} />

            <p>Conclusion of observations on map and donut chart</p>
        </div>
    )
};

export default Claims;