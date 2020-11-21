import React, {useState} from 'react'
import {
    NavBar,
    InputItem,
    Button, TextareaItem,
} from "antd-mobile";
import{connect} from 'react-redux'
import AvatarSelector from "../../components/avatar-selector/avatar-selector";
import {Redirect} from "react-router-dom";
import {updateUser} from "../../redux/actions";

function EmployeeInfo(props){

    const [userInfo,setUserInfo] = useState({
        avatar:'',
        desiredPosition:'',
        personalInfo:'',
    })

    const handleChange = (stateName,value)=>{
        setUserInfo(prevUserInfo => ({
            ...prevUserInfo,
            [stateName]: value
        }));
    }

    const setAvatar = (stateName,avatar) => {
        setUserInfo(prevType =>({
            ...prevType,
            [stateName]: avatar
        }))
    }

    const saveInfo = () =>{
        props.updateUser(userInfo)
    }

    const {avatar,userType}= props.user
    if(avatar){
        const path = userType==="employer" ? '/employer' : '/employee'
        return <Redirect to={path} />
    }

    return (
        <>
            <NavBar>Employee Info</NavBar>
            <AvatarSelector setAvatar={setAvatar}/>
            <InputItem
                labelNumber={10} placeholder='Position you searching'
                onChange={value => {handleChange('desiredPosition',value)}}>Searching Position: </InputItem>
            <TextareaItem labelNumber={10} onChange={value => {handleChange('personalInfo',value)}}
                          title='Personal Information:' rows={3}/>
            <Button type='primary' onClick={saveInfo}>Save</Button>
        </>
    )
}

export default connect(
    state=>({user:state.user}),
    {updateUser}
)(EmployeeInfo)