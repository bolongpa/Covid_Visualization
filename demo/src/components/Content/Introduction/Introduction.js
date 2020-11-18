import React, { Component } from 'react';

import classes from './Introduction.module.css';
import MapBox from '../../../containers/MapBox/MapBox';
import { Container, Row, Col } from 'react-bootstrap';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import * as d3 from 'd3';
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';
import WCloud from "../../WordCloud/WordCloud"
import w from '../../../assets/data/words.json'


class Introduction extends Component {

    render() {
        // fetch(w).then(r=>r.text()).then(text=>console.log(text))
        // console.log(this.data)
        return (
            <div>
                <h1>Title</h1>
                <div className={classes.Introduction}>
                    <p>Introduction here</p>
                    <WCloud/>
                </div>
                <div className={classes.mapContainer}>
                    {/* <p>Mapbox here</p> */}
                    <MapBox></MapBox>


                </div>

            </div>

        );
    }
}

export default Introduction;