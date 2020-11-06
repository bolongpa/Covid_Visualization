import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
    
const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Introduction</NavigationItem>
        <NavigationItem link="/map">Map</NavigationItem>
        <NavigationItem link="/demoPlayground">Playground</NavigationItem>
    </ul>
);
    
export default navigationItems;