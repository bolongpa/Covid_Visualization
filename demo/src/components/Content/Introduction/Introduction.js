import React, { Component } from 'react';
//import { Container, Row, Col } from 'react-bootstrap';

import classes from './Introduction.module.css';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import MapBox from '../../../containers/MapBox/MapBox';
import WCloud from "../../WordCloud/WordCloud"


class Introduction extends Component {

    render() {
        // fetch(w).then(r=>r.text()).then(text=>console.log(text))
        // console.log(this.data)
        return (
            <div>
                <h1 className={classes.Title}>US LABOR MARKET AND COVID-19</h1>
                <div className={classes.Introduction}>
                    <WCloud />
                    <br />
                    <p>TODO: Will add motivation and introduction here</p>
                    <br />
                </div>
                <div className={classes.mapContainer}>
                    <MapBox />
                </div>

            </div >

        );
    }
}

export default Introduction;