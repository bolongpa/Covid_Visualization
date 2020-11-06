import React, { Component } from 'react';

import './Introduction.css';

class Introduction extends Component {

    render() {
        return (
            <div>
                <h1>Title</h1>
                <div className="Mapbox">
                    <p>Mapbox here</p>
                </div>
                <div className="Introduction">
                    <p>Introduction here</p>
                </div>
            </div>

        );
    }
}

export default Introduction;