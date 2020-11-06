import React from 'react';

import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';
    
const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Introduction</NavigationItem>
        <NavigationItem link="/map">Map</NavigationItem>
    </ul>
);
    
export default navigationItems;