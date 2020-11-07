import React, { Component } from 'react';

import classes from './Introduction.module.css';
import MapBox from '../../../containers/MapBox/MapBox';

class Introduction extends Component {

    render() {
        return (
            <div>
                <h1>Title</h1>
                <div className={classes.Mapbox}>
                    <p>Mapbox here</p>


                </div>
                <div className={classes.Introduction}>
                    <p>Introduction here</p>
                </div>
            </div>

        );
    }
}

export default Introduction;