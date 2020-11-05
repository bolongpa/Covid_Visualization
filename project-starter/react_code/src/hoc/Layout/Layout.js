import React, { Component, Fragment } from 'react';

import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        sideDrawerOpen: false
    }

    closeSideDrawer = () => {
        this.setState({sideDrawerOpen: false});
    }

    toggleDrawerHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen};
        });
    }

    render () {
        return (
            <Fragment>
                <Toolbar toggleDrawer={this.toggleDrawerHandler}/>
                <SideDrawer 
                    open={this.state.sideDrawerOpen}
                    sideDrawerClosed={this.closeSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        )
    }
};

export default (Layout);