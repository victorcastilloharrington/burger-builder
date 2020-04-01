import React, { Fragment } from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import styles from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const SideDrawer = (props) => {
    let attachedClasses = [styles.SideDrawer, styles.Close];

    if(props.show){
        attachedClasses = [styles.SideDrawer, styles.Open];
    }
    
    return (
        <Fragment>
            <Backdrop show={props.show} close={props.clicked}/>
            <div className={attachedClasses.join(' ')}>
                <Logo height="50px"/>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>
    )
}

export default SideDrawer
