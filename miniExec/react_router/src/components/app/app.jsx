import React, {Component} from 'react'
import {NavLink, Route, Switch,Redirect} from 'react-router-dom'

import Home from "../../views/home";
import About from "../../views/about";
export default class App extends Component{
  render() {
    return(
        <div className="container">
            <div className="row">
                <div className='col-8'>
                    <h2 className="page-header">React router</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <div className="list-group">
                        <NavLink className='list-group-item' to='/about'>About</NavLink>
                        <NavLink className='list-group-item' to='/home'>Home</NavLink>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='panel'>
                        <div className='panel-body'>
                            <Switch>
                                <Route path='/about' component={About}/>
                                <Route path='/home' component={Home}/>
                                <Redirect to='/about'/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
  }
}