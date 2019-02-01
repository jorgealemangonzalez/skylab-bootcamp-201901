import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import spotifyApi from './spotify-api/index';

spotifyApi.token= 'BQAT8RlNGxg671f213DU7T-EBPjluvl6NayvF-RX-ox_oginWL1J8kkbnVFBr8dG4C1xi6aDpf2GDkdn6MywBO_xBTs7kOP3-M30y7L59DVjKvn6kRzjeeBIkvuOeTHAui4hHH3FSUvIGDOoNcBUm-osw8-fLU3Xzg'

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
