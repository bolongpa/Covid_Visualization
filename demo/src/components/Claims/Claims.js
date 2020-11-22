import React from 'react';

import Donut from '../DonutChart/DonutChart';
import MapBox from '../../containers/MapBox/MapBox';

import classes from './Claims.module.css';

import NationalClaim from '../../assets/data/nationalUnemploymentWeeklyClaims.json';

const Claims = (props) => {
    var labels = ["Before Outbreak", "After Outbreak", "Latest"]
    var weeks = Object.keys(NationalClaim)
    var claimTypes = NationalClaim[weeks[0]].map(d => d.type);

    var donutsArray = []
    for (let i in weeks) {
        donutsArray.push(
            {
                week: weeks[i],
                data: NationalClaim[weeks[i]],
                label: labels[i]
            }
        )
    }
    console.log(donutsArray)
    const donuts = donutsArray.map(d => {
        return <Donut data={d.data} week={d.week} label={d.label} types={claimTypes} />
    })

    return (
        <div>
            <p>Some intro of weekly claim</p>

            <MapBox />
            <p>Some conclusions of observations of the latest weekly claim (initial + continued claims) on map</p>

            <div className={classes.DonutLegend}>
                <div className={classes.LegendSquare} style={{ backgroundColor: "#B0C4DE" }} />
                <p className={classes.LegendLabel}>Initial Claim</p>
                <div className={classes.LegendSquare} style={{ backgroundColor: "#FFD966" }} />
                <p className={classes.LegendLabel}>Continued Claim</p>
            </div>
            <div className={classes.DonutsArea}>
                {donuts}
            </div>

            <p>Conclusion of observations on map and donut chart</p>
        </div>
    )
};

export default Claims;