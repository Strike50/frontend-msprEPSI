import React, { Suspense } from 'react';
import Calculator from "./containers/Calculator/Calculator";
import Layout from "./hoc/Layout/Layout";
import { Switch, Route, Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
import Spinner from "./components/UI/Spinner/Spinner";
import * as actions from './store/actions/index';
import Logout from "./containers/Auth/Logout/Logout";
import Auth from "./containers/Auth/Auth";

const Form = React.lazy(() => {
  return import('./containers/Form/Form');
});

const Geolocation = React.lazy(() => {
  return import('./containers/Geolocation/RouterGeoloc');
});

class App extends React.Component{
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/form" render={props => <Form {...props} />}/>
          <Route path="/info" render={props => <Geolocation {...props} />}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/" exact component={Calculator}/>
          <Redirect to="/"/>
        </Switch>
      );
    }
    return (
      <Layout>
        <Suspense fallback={<Spinner />}>
          {routes}
        </Suspense>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => {dispatch(actions.authCheckState())}
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
