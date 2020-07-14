import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

//install firebase for this to work
const firebaseConfig = {
  apiKey: "AIzaSyDhDnP7pqVKVmC_gOKfs2nQenuXWuFiC5g",
  authDomain: "openly-too.firebaseapp.com",
  databaseURL: "https://openly-too.firebaseio.com",
  projectId: "openly-too",
  storageBucket: "openly-too.appspot.com",
  messagingSenderId: "1040555860253",
  appId: "1:1040555860253:web:850f43e68ad3ddb6e581f4",
  measurementId: "G-E94F78NDYY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
