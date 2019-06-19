import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import { updateObject,checkValidity } from "../../shared/utility";
import * as actions from '../../store/actions/index';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

class Auth extends Component {
  state = {
    controlsLOG: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail address'
        },
        value: '',
        name: 'username',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        name: 'password',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    controlsSIGN: {
      firstName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'First name'
        },
        value: '',
        name: 'firstName',
        validation: {
          required: true,
          isEmail: false
        },
        valid: false,
        touched: false
      },
      lastName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Last name'
        },
        value: '',
        name: 'lastName',
        validation: {
          required: true,
          isEmail: false
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail address'
        },
        value: '',
        name: 'email',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        name: 'password',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  inputChangedHandler = (event, controlName) => {
    if (this.state.isSignup) {
    const updatedControls = updateObject(this.state.controlsSIGN,{
      [controlName]: updateObject(this.state.controlsSIGN[controlName],{
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controlsSIGN[controlName].validation),
        touched: true
      })
    });
    this.setState({controlsSIGN : updatedControls});
    } else {
      const updatedControls = updateObject(this.state.controlsLOG,{
        [controlName]: updateObject(this.state.controlsLOG[controlName],{
          value: event.target.value,
          valid: checkValidity(event.target.value, this.state.controlsLOG[controlName].validation),
          touched: true
        })
      });
      this.setState({controlsLOG : updatedControls});
    }
  };

  submitHandler = event => {
    event.preventDefault();
    if (this.state.isSignup) {
      this.props.onSignUp(
        this.state.controlsSIGN.firstName.value,
        this.state.controlsSIGN.lastName.value,
        this.state.controlsSIGN.email.value,
        this.state.controlsSIGN.password.value,
        );
    } else {
      this.props.onAuth(this.state.controlsLOG.email.value, this.state.controlsLOG.password.value);
    }
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isSignup: !prevState.isSignup};
    })
  };

  componentDidMount() {
    if (this.props.authRedirectPath !== '/login'){
      this.props.onSetAuthRedirectPath();
    }
  }

  render() {
    const formElementsArray = [];
    let key = 0;
    if (!this.state.isSignup) {
      for (key in this.state.controlsLOG) {
        formElementsArray.push({
          id: key,
          config: this.state.controlsLOG[key],
        });
      }
    } else {
      for (key in this.state.controlsSIGN) {
        formElementsArray.push({
          id: key,
          config: this.state.controlsSIGN[key],
        });
      }
    }
    let form = formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          inputtype={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          name={formElement.config.name}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}
        />
      ));


    if (this.props.loading){
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error){
      errorMessage = (<p>{this.props.error.message}</p>);
    }

    let headerMessage = null;

    if(this.state.isSignup) {
      headerMessage = <p>SIGNING UP</p>;
    }

    if(!this.state.isSignup) {
      headerMessage = <p>SIGNING IN</p>;
    }

    let authRedirect = null;
    if(this.props.isAuthenticated){
      authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        {headerMessage}
        <form method="POST" onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button
          clicked={this.switchAuthModeHandler}
          btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, pass) => dispatch(actions.auth(email, pass)),
    onSignUp: (firstName, lastName, email, pass) => dispatch(actions.signUp(firstName, lastName, email, pass)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Auth, axios));