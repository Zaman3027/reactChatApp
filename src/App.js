import React, { Component } from 'react';
import './App.css';
import fire from './config/Fire';
import Login from './components/Login'
import PlayerComp from './components/PlayerComp'
import firebase from 'firebase';
import "bootstrap/dist/css/bootstrap.min.css"

class App extends Component {
  authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ User: user })
      } else {
        this.setState({ User: null })
      }
    })
  }

  handelGoogleSiginIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    fire.auth().signInWithPopup(provider).then(data => {
      fire.firestore().collection("User").doc(data.user.uid).set({
        displayName: data.user.displayName,
        email: data.user.email,
        photoUrl: data.user.photoURL,
        uid: data.user.uid,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    })
  }

  componentDidMount() {
    this.authListener();
  }

  state = {
    User: {},
  }
  render() {
    return (
      <div className="App">
        {this.state.User == null ? <Login handleGoogleSiginIn={this.handelGoogleSiginIn} /> : <PlayerComp />}
      </div>
    );
  }
}

export default App;
