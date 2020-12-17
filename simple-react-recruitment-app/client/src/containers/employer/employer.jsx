import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {getUserList} from "../../redux/actions";
import UserList from "../../components/user-list/user-list";

function Employer(props){

    useEffect(()=>{
        props.getUserList("employee")

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
            <UserList userList = {props.userList}/>
        </>
    )
}

export default connect(
    state => ({userList:state.userList}),
    {getUserList}
)(Employer)