import React, {Component} from 'react'
import {Switch,Route} from "react-router-dom";

import EmployerInfo from "../employer-info/employer-info";
import EmployeeInfo from "../employee-info/employee-info";
export default class Main extends Component{
  render() {
    return(
        <>
            <Switch>
                <Route path='/employer_info' component={EmployerInfo} />
                <Route path='/employee_info' component={EmployeeInfo} />
            </Switch>
        </>
    )
  }
}