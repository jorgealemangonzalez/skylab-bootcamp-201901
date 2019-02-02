import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import spotifyApi from './spotify-api/index';

spotifyApi.token= 'BQDHgtpeyTVXdGMVJjlPsnx14pkqaMzh3O3m6z5P1ceVsW0xjcmto-2feGAuIyD83O1GkHYf-IAOgYAh3lq1rfhzFeZrcaZcHKQTKfL4_Du2cciXb9Dcv6jl2EQLNcddCpUE9gvXn6yGYun2Bf8p5VJAulv-aRLCWQ'

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
