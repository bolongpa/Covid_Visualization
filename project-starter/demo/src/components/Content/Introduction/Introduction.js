import React, { Component } from 'react';

import classes from './Introduction.module.css';
import MapBox from '../../../containers/MapBox/MapBox';
import { Container, Row, Col } from 'react-bootstrap';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
class Introduction extends Component {

    render() {
        return (
            <div>
                <h1>Title</h1>
                <div className={classes.mapContainer}>
                    {/* <p>Mapbox here</p> */}
                    <MapBox></MapBox>


                </div>
                <div className={classes.Introduction}>
                    <p>Introduction here</p>
                </div>
            </div>

        );
    }
}

export default Introduction;