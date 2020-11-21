import React, {Component} from 'react'
import {Switch,Route,Redirect} from "react-router-dom";
import{connect} from 'react-redux'
import Cookies from 'js-cookie'

import EmployerInfo from "../employer-info/employer-info";
import EmployeeInfo from "../employee-info/employee-info";
import {getRedirectTo} from "../../utils";
import {getUserInfo} from "../../redux/actions";

class Main extends Component{

    componentDidMount() {
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if(userid && !_id){
            this.props.getUserInfo()
        }
    }

    render() {

      const userid = Cookies.get('userid')
      if(!userid){
          return <Redirect to='/login'/>
      }
      const {user} = this.props
      if(!user._id){
          return null
      }else{
          let path = this.props.location.pathname
          if(path==='/'){
              path = getRedirectTo(user.userType,user.avatar)
              return  <Redirect to={path}/>
          }
      }

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

export default connect(
    state =>({user:state.user}),
    {getUserInfo}
)(Main)