import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">US Labor Market Overview</NavigationItem>
        <NavigationItem link="/dataExploration">Data Exploration</NavigationItem>
        <NavigationItem link="/claims">Unemployment Claims</NavigationItem>
        {/* <NavigationItem link="/demoPlayground">Playground</NavigationItem> */}
    </ul>
);

export default navigationItems;