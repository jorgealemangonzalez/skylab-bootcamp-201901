import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter } from "react-router-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


// function bindEvent(e, eventName, callback) {
//     if (e.addEventListener) // new browsers
//       e.addEventListener(eventName, callback, false);
//     else if (e.attachEvent) // IE
//       e.attachEvent('on' + eventName, callback);
//   };
  
//   bindEvent(document.body, 'scroll', function (e) {
//     document.body.scrollLeft = 0;
//   })
