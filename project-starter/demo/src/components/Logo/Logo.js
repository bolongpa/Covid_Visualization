import React from 'react';

import classes from './Logo.module.css';
import ninjaLogo from '../../assets/images/ninja-logo.png';

const logo = () => (
    <div className={classes.Logo}>
        <img src={ninjaLogo} alt="NinjaV"></img>
    </div>
);
    
export default logo;