import React, {Fragment, Component} from 'react';
import styles from '../Layout/Layout.module.css'
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Backdrop from '../UI/Backdrop/Backdrop';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  toggleSideDrawerHandler = () => {
    this.setState({showSideDrawer: !this.state.showSideDrawer}) ;
  }

  render(){
    return (
      <Fragment>
        <div>
        <Toolbar open={this.toggleSideDrawerHandler} />
        <SideDrawer show={this.state.showSideDrawer} clicked={this.toggleSideDrawerHandler}/>
        <Backdrop />
        </div>
        <main className={styles.Content}>
          {this.props.children}
        </main>
      </Fragment>
    )
  }
};

export default Layout;