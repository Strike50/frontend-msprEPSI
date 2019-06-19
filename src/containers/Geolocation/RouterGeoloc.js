import React from 'react';
import { Route, Switch } from 'react-router';
import Geolocation from "./Geolocation";
import DrugStore from "../DrugStore/DrugStore";

export class RouterGeoloc extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Geolocation} />
        <Route path="/:drugStoreId" component={DrugStore} />
      </Switch>
    )
  }
}

export default RouterGeoloc;
