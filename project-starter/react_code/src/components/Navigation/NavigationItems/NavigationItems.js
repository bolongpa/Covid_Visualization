import React from 'react';

import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';
    
const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Introduction</NavigationItem>
        <NavigationItem link="/linechart">Line Chart</NavigationItem>
        <NavigationItem link="/map">Map</NavigationItem>
        <NavigationItem link="/mapbox">MapBox</NavigationItem>
        <NavigationItem link="/multiplecharts">Multi</NavigationItem>
    </ul>
);
    
export default navigationItems;