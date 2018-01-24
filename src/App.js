import React from 'react';
import { FirebaseAuth } from 'react-firebaseui';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import { createUserProfile } from './actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false
    };
  }

  uiConfig = {
    signInFlow: 'redirect',
    signInOptions: [
      this.props.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      this.props.firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: (currentUser, credential) => {
        this.props.createUserProfile(currentUser);
        this.setState({ signedIn: true });
        return true;
      }
    }
  };

  render() {
    if (!this.state.signedIn) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={this.props.firebase.auth()} />
        </div>
      );
    }
    return (
      <div>
        <h1>My App</h1>
        <p>Welcome! You are now signed-in!</p>
      </div>
    );
  }
}

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth, profile } }) => ({ auth, profile }), { createUserProfile })
)(App);