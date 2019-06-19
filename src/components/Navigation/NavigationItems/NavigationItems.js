import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {

  return props.isAuthenticated ? (
        <ul className={classes.NavigationItems}>
          <NavigationItem link="/" exact>Calculator</NavigationItem>
          <NavigationItem link="/info" exact>Geolocation</NavigationItem>
          <NavigationItem link="/form" exact>Forms</NavigationItem>
          <NavigationItem link="/logout">Logout</NavigationItem>
        </ul>
  ) : null;
};

export default navigationItems;