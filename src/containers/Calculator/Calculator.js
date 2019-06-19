import React from 'react';
import Container from "reactstrap/es/Container";
import {Col, Form, Row} from "reactstrap";
import {connect} from "react-redux";
import * as actions from "../../store/actions";

export class Calculator extends React.Component {
  state = {
    product: null,
    prixReelVendu: 0,
    tauxRemise: 0,
    coefficientMultiplicateur: 0
  };

  componentDidMount() {
    this.props.onLoadProducts();
  }

  onChangeSelect = event => {
    const id = event.target.value;
    this.props.listProduct.forEach( product => {
      if (product.id === id) {
        this.setState({product: product})
      }
    })
  };

  onChangeInput = event => {
    switch (event.target.id) {
      case 1: this.setState({prixReelVendu: event.target.value});break;
      case 2: this.setState({tauxRemise: event.target.value});break;
      case 3: this.setState({coefficientMultiplicateur: event.target.value});break;
      default: break;
    }
  };

  calculerPVR = () => {

  };

  calculerCM = () => {

  };

  calculerTR = () => {

  };

  render() {
    const selectProduct = this.props.listProduct !== null ? (
      <select onChange={this.onChangeSelect} name="select-product">
        <option disabled>Veuillez sélectionner le produit à utiliser dans la calculatrice</option>
        { this.props.listProduct.map( product => (
          <option key={product.id} value={product.id}>{product.name}</option>
        ))}
      </select>
    ) : null;
    return this.props.listProduct !== null ? (
      <Container>
        <h1>Calculator</h1>
        {selectProduct}
        <Row>{this.state.product.name}</Row>
        <Row>
          <Col>Prix de production (achat net) : {this.state.product.prixproduction}</Col>
          <Col>Prix de vente préféré : {this.state.product.prixventevoulu}</Col>
          <Form>
            <label>Prix réel vendu : </label>
            <input onChange={this.onChangeInput} type="number" id="1" value={this.state.prixReelVendu}/>
            <label>Taux de remise : </label>
            <input onChange={this.onChangeInput} type="number" id="2" value={this.state.tauxRemise}/>
            <label>Coefficient multiplicateur : </label>
            <input onChange={this.onChangeInput} type="number" id="3" value={this.state.coefficientMultiplicateur}/>
          </Form>
        </Row>
      </Container>
    ) : <div>oui</div>;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.calculator.loading,
    error: state.calculator.error,
    listProduct: state.calculator.listProduct
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadProducts: () => dispatch(actions.fetchProducts)
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Calculator)