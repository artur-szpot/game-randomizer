import React from 'react';
import ReactDOM from 'react-dom';
import AppBody from './AppBody';
import './css/main.css';
import * as serviceWorker from './serviceWorker';

/**
 * Main entry point of the application.
 */
ReactDOM.render(<AppBody />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();