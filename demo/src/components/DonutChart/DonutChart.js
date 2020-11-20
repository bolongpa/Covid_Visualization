import React from 'react';

import classes from './DonutChart.module.css';

const Donut = (props) => {

    return (
        <div className={classes.Donut}>
            <p>Donut Chart Data: {JSON.stringify(props.data)}</p>
        </div>
    )
};

export default Donut;