import React from 'react';
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import CardSubtitle from "reactstrap/es/CardSubtitle";
import {connect} from "react-redux";
import * as actions from "../../store/actions";

export class Geolocation extends React.Component {

  state = {
    loading: false,
    listDrugStores: null,
    isEnabled: false,
    filter: ''
  };

  componentDidMount() {

    // navigator.permissions.query({ name: 'geolocation' })
    //   .then(console.log);
    this.onClickRefresh();
  }

  onClickRefresh = () => {
    navigator.geolocation.getCurrentPosition(this.getDrugStores);
  };

  getDrugStores = position => {
    console.log( 'Latitude: ' + position.coords.latitude +
      '<br />Longitude: ' + position.coords.longitude);
  };

  onChangeHandler= e =>{
    this.setState({
      input: e.target.value,
    })
  };

  render() {
    const listDrugStores = this.state.listDrugStores
      .filter(d => this.state.input === '' || d.includes(this.state.input))
      .map((drugStore, index) => (
        <Card key={`drugStore-${index}`}>
          <CardBody>
            <CardTitle>{drugStore.name}</CardTitle>
            <CardSubtitle>{drugStore.distance}</CardSubtitle>
          </CardBody>
        </Card>
        )
      );
    const displayed = this.state.listDrugStores !== null ? (
      <div id="cards">
        <input value={this.state.input} type="text" onChange={this.onChangeHandler} />
        {listDrugStores}
      </div>
    ) : null;
    const buttonRefresh = this.state.isEnabled ? <button onClick={this.onClickRefresh}>Rafraîchir</button> : null;
    return (
      <div>
        {buttonRefresh}
        {displayed}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.geo.loading,
    listDrugStores: state.geo.listDrugStores,
    errorMessage: state.geo.errorMessage
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, pass, isSignup) => dispatch(actions.auth(email, pass, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Geolocation);
