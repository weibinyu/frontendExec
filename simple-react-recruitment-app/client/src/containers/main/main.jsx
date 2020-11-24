import React, {Component} from 'react'
import {Switch,Route,Redirect} from "react-router-dom";
import{connect} from 'react-redux'
import Cookies from 'js-cookie'
import {NavBar} from "antd-mobile";

import EmployerInfo from "../employer-info/employer-info";
import EmployeeInfo from "../employee-info/employee-info";
import Employee from "../employee/employee";
import Employer from "../employer/employer";
import Message from "../message/message";
import Personal from "../personal/personal";
import NotFound from "../../components/not-found/not-found";
import {getRedirectTo} from "../../utils";
import {getUserInfo} from "../../redux/actions";
import FooterNav from "../../components/footer-nav/footer-nav"

class Main extends Component{

    navList = [
        {
            path: '/employee',
            component: Employee,
            title: 'Employee list',
            icon: 'employee',
            text: 'Employee',
        },
        {
            path: '/employer',
            component: Employer,
            title: 'Employer list',
            icon: 'employer',
            text: 'Employer',
        },
        {
            path: '/message',
            component: Message,
            title: 'Message list',
            icon: 'message',
            text: 'Message',
        },
        {
            path: '/personal',
            component: Personal,
            title: 'Personal center',
            icon: 'personal',
            text: 'Personal ',
        }
    ]



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

        const {navList} = this
        const path = this.props.location.pathname
        const currentNav = navList.find(nav => nav.path===path)

        if(user.type ==='employer'){
            navList[0].hide = true
        }else {
            navList[1].hide = true
        }

        return(
            <>
                {currentNav? <NavBar>{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                        navList.map((nav,index) => <Route key = {index} path={nav.path} component={nav.component}/>)
                    }
                    <Route path='/employer_info' component={EmployerInfo} />
                    <Route path='/employee_info' component={EmployeeInfo} />

                    <Route component={NotFound} />
                </Switch>
                {currentNav? <FooterNav navList={navList}/> : null}
            </>
        )
    }
}

export default connect(
    state =>({user:state.user}),
    {getUserInfo}
)(Main)