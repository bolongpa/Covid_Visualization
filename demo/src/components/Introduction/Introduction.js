import React, { Component } from 'react';
//import { Container, Row, Col } from 'react-bootstrap';

import classes from './Introduction.module.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import WCloud from "../WordCloud/WordCloud"
import infoGraph from "../../assets/images/Unemployment2020.png";

class Introduction extends Component {

    render() {
        // fetch(w).then(r=>r.text()).then(text=>console.log(text))
        // console.log(this.data)
        return (
            <div>
                <div className={classes.InfoGraphBox}>
                    <WCloud />
                    <img src={infoGraph} width="100%" />
                </div>
            </div >

        );
    }
}

export default Introduction;