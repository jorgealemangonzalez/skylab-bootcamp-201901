import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import spotifyApi from './spotify-api-1.0.0';

spotifyApi.token= 'BQAji1kYxVUFKbJagpshoFXAViS7f4YFdBsryUEp3nZOkajcgj4uVThpesaXvwNKqqsxnko2bcOJo95_OCBkE-OCeMHpcIWWyQyR0ckCeWWh59L3gQhHtFiITzz9hF8M1UikaUP8AW69mxm_IaDD9IoBtUaNxHEmZw'

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
