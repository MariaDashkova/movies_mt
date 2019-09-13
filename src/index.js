import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import {Router, Route} from 'react-router-dom';
import rootReducer from './reducers/rootReducer';

import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from "redux";
import history from './history';
import {Provider} from 'react-redux';

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

ReactDOM.render(

    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>

    , document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
