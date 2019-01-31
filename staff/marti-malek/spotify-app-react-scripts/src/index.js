import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import spotifyApi from './spotify-api/index';

spotifyApi.token= 'BQDirEp46SznIkAjVE0M5F96cqsKT54u7TN2q_89DbkNBuebsz2TcnAH8y7dXC5comXhSdVSdqu72dn6hiPcVyfoXpKsRPEbcCmH0mrXq4YdoodiUrvgER1EOCRPFoJUoaT5vZCinar4AheHqiqRbLCnuOZOZRkjaw'

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
