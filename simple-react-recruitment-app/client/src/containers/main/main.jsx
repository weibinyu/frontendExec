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
import Chat from "../chat/chat";

import React,{useEffect} from 'react'

function Main(props){
    const navList = [
        {
            path: '/employee',
            component: Employee,
            title: 'Employers list',
            icon: 'employee',
            text: 'Employers',
        },
        {
            path: '/employer',
            component: Employer,
            title: 'Employees list',
            icon: 'employer',
            text: 'Employees',
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
    useEffect(() => {
        const userid = Cookies.get('userid')
        const {_id} = props.user
        if(userid && !_id){
            props.getUserInfo()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const userid = Cookies.get('userid')
    if(!userid){
        return <Redirect to='/login'/>
    }

    const {user,unReadMessages} = props
    console.log(unReadMessages)
    if(!user._id){
        return null
    }else{
        let path = props.location.pathname
        if(path === '/'){
            path = getRedirectTo(user.userType,user.avatar)
            return  <Redirect to={path}/>
        }
    }

    const path = props.location.pathname
    const currentNav = navList.find(nav => nav.path === path)

    if(currentNav){
        if( user.userType === 'employer' ){
            navList[0].hide = true
        }else {
            navList[1].hide = true
        }
    }
    return(
        <>
            {currentNav? <NavBar className='stick-at-top'>{currentNav.title}</NavBar> : null}
            <Switch>
                {
                    navList.map((nav,index) => <Route key = {index} path={nav.path} component={nav.component}/>)
                }
                <Route path='/employer_info' component={EmployerInfo} />
                <Route path='/employee_info' component={EmployeeInfo} />
                <Route path='/chat/:userid' component={Chat} />

                <Route component = { NotFound } />
            </Switch>
            {currentNav? <FooterNav navList={navList} unReadMessages={unReadMessages}/> : null}
        </>
    )
}
export default connect(
    state =>({user:state.user,unReadMessages:state.chat.unReadMessages}),
    {getUserInfo}
)(Main)