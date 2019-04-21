import firebase from "firebase";
var config = {
  apiKey: "AIzaSyAQAGQQ1LkdehlRhpTnmvQCw0EWGaX4OC4",
  authDomain: "fir-login-94db4.firebaseapp.com",
  databaseURL: "https://fir-login-94db4.firebaseio.com",
  projectId: "fir-login-94db4",
  storageBucket: "fir-login-94db4.appspot.com",
  messagingSenderId: "216318061133"
};

const Fire = firebase.initializeApp(config);
export default Fire;