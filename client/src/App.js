import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dashboard from './views/Dashboard'
import SignInForm from './views/SignInForm';
import PrivateRoute from './PrivateRoute';
import Auth from './Auth';
import axios from 'axios';

class SignIn extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      username: '',
      password: '',
      redirectToReferrer: false,
      successMessage: 'Enter your username and password to login.'
    };

    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
    this.handleSignInChange = this.handleSignInChange.bind(this);
  }

  handleSignInChange (event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSignInSubmit (event) {
    console.log('Username: ', this.state.username);
    console.log('Password: ', this.state.password);
    this.login(this.state.username, this.state.password)
  }

  login = async (username, password) => {
    console.log()
    const response = await axios.post (
      '/login',
      { username: username, password: password },
      { headers: { 'Content-Type': 'application/json' } }
    )
    console.log(response);
    this.setState({
      successMessage: response.data.success
    });
    if (response.data.success === 'Login Sucessfull.') {
      Auth.authenticate();
      this.setState({
        redirectToReferrer: true
      });
    }
    else {
      Auth.signOut();
    }
  }

  render () {
    let { redirectToReferrer, successMessage } = this.state;
    let { from } = this.props.location.pathname || { from: { pathname: '/dashboard' }};

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <div className="SignInForm">
        <SignInForm
          successMessage={successMessage} 
          onHandleChange={this.handleSignInChange}
          onHandleSubmit={this.handleSignInSubmit} />
      </div>
    );
  }
}

class App extends React.Component {
  render () {
    return (
      <div className="Dashboard">
        <header className="Dashboard-header">
        </header>

        <Switch>
          <Route path='/sign-in' component={SignIn} />
          <PrivateRoute path='/' component={Dashboard} />
          <Route component={SignIn} />
        </Switch>
      </div>
    );
  }
}

export default App;
