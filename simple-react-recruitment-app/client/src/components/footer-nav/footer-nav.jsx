import React,{useState} from 'react'
import {TabBar} from "antd-mobile";
import {withRouter} from 'react-router-dom'

const Item = TabBar.Item

function FooterNav (props){
    //TODO:useReducer navList

    let {navList} = props
    navList = navList.filter(nav => !nav.hide)
    const path = props.location.pathname

    return (
        <TabBar>
            {
                navList.map((nav, index)=>(

                     <Item key = {nav.path} title={nav.text}
                           icon={{uri: require(`./images/${nav.icon}.png`).default}}
                           selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`).default}}
                           selected={path === nav.path} onPress={()=>props.history.replace(nav.path)}
                     />
                ))
            }
        </TabBar>
    )
}

export default withRouter(FooterNav)