import React, { Component } from 'react';
import { MDCTabBar, MDCTab } from '@material/tabs'

const TabsBarView = () => {

    return (
        <nav id="basic-tab-bar" class="mdc-tab-bar">
            <a class="mdc-tab mdc-tab--active" href="#one">Home</a>
            <a class="mdc-tab" href="#two">Merchandise</a>
            <a class="mdc-tab" href="#three">About Us</a>
            <span class="mdc-tab-bar__indicator"></span>
        </nav>
    )

}

export default TabsBarView;