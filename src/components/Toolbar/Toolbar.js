import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import DrawerToggle from '../Navigation/DrawerToggle/DrawerToggle';

const Toolbar = (props) => (
        <header className={styles.Toolbar}>
            <DrawerToggle open={props.open}/>
            <Logo />
            <nav className={styles.DesktopOnly}>
                <NavigationItems/>
            </nav>
        </header>
    )


export default Toolbar
