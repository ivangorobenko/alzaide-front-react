import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {mettreAJourDateHeureDuMoment} from "./store/communication/communication";
import {initStore} from "./store/initStore";
import {loadFeatureSwitches} from "./store/ui/ui";

const store = initStore()
store.dispatch(loadFeatureSwitches({alerte: false}));
setInterval(() => store.dispatch(mettreAJourDateHeureDuMoment()), 1000);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
