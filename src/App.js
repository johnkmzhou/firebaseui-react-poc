import React from 'react';
import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';

import { config } from './firebase.config';

firebase.initializeApp(config);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false
    };
  }

  uiConfig = {
    signInFlow: 'redirect',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => {
        this.setState({ signedIn: true });
        return true; // Avoid redirects after sign-in.
      }
    }
  };

  render() {
    if (!this.state.signedIn) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
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

export default App;