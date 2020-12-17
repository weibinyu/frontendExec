import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter,Route,Switch} from "react-router-dom";
import {Provider} from 'react-redux'

import Register from "./containers/register/register";
import Main from "./containers/main/main";
import Login from "./containers/login/login";
import store from "./redux/store";
import './assets/css/index.less'

import './test/socketio_test'

ReactDOM.render(
    //Not using the Strict mode since InputItem from antd-mobil probably uses
    //deprecated findDOMNode API from react-transition-group and that would cause
    //this "Warning: Legacy context API has been detected within a strict-mode tree"
    //But since this project is based on antd-mobil I had to live with it
    //<React.StrictMode>
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/register' component={Register}></Route>
                <Route path='/login' component={Login}></Route>
                <Route component={Main}></Route>
            </Switch>
        </HashRouter>
    </Provider>
    //</React.StrictMode>
    ,document.getElementById('root'))