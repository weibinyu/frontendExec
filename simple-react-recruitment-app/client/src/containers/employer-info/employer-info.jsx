import React, {useState} from 'react'
import {
    NavBar,
    InputItem,
    Button,
    TextareaItem
} from "antd-mobile";
import{connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import AvatarSelector from "../../components/avatar-selector/avatar-selector";
import {updateUser} from "../../redux/actions";

function EmployerInfo(props){

    const [userInfo,setUserInfo] = useState({
        avatar:'',
        postedPosition:'',
        positionRequirement:'',
        companyName:'',
        offerSalary:'',
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
            <NavBar>Employer Info</NavBar>
            <AvatarSelector setAvatar={setAvatar}/>
            <InputItem labelNumber={10} onChange={value => {handleChange('postedPosition',value)}}
                       placeholder='Position you offer'>Offering positions: </InputItem>
            <InputItem labelNumber={10} onChange={value => {handleChange('companyName',value)}}
                       placeholder='Name of you company'>Company name: </InputItem>
            <InputItem labelNumber={10} onChange={value => {handleChange('offerSalary',value)}}
                       placeholder='Amount of salary you offer'>Offering salary: </InputItem>
            <TextareaItem labelNumber={10} onChange={value => {handleChange('positionRequirement',value)}}
                          title='Position requirement:' rows={3}/>
            <Button type='primary' onClick={saveInfo}>Save</Button>
        </>
    )
}

export default connect(
    state=>({user:state.user}),
    {updateUser}
)(EmployerInfo)