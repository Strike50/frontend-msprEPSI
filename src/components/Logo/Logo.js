import React from 'react';

import classes from './Logo.module.css';
import nivantisLogo from '../../assets/images/nivantis-logo.png';

const logo = () => (
  <div className={classes.Logo}>
    <img alt="LogoNivantis" src={nivantisLogo}/>
  </div>
);

export default logo;