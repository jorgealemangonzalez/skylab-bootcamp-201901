import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import spotifyApi from './spotify-api-1.0.0';

spotifyApi.token= 'BQAomOgCUNhHrnkYirSW7uIJIxgBSR-GgdHVf50dlmgH4mFh3cF-kU12c4HYeuUG3WqV4g4nIgjJvqlkfHQRPhHSswhAfXDkipYGPF7CsLag2Zp1rKHXAq2CIWMpPXiWi_4AuWCxcWj_nYXDT99UZ2sYw2IQhu5Ymg'

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
