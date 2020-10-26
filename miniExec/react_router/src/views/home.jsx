import React, {Component} from 'react'
import {NavLink,Switch,Route} from "react-router-dom";

import News from "./news";
import Message from "./message";

export default class Home extends Component{
  render() {
    return(
        <div>
            <h2>Home component</h2>
            <div>
                <ul className='nav nav-tabs'>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/home/news'>News</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/home/message'>Message</NavLink>
                    </li>
                </ul>
            </div>
            <div>
                <Switch>
                    <Route path='/home/news' component={News}/>
                    <Route path='/home/message' component={Message}/>
                </Switch>
            </div>
        </div>

    )
  }
}