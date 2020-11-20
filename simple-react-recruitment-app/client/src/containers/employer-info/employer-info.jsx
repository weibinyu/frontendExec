import React from 'react'
import {
    NavBar,
    InputItem,
    Button,
    TextareaItem
} from "antd-mobile";
import{connect} from 'react-redux'
import AvatarSelector from "../../components/avatar-selector/avatar-selector";

function EmployerInfo(props){
    return (
        <>
            <NavBar>Employer Info</NavBar>
            <AvatarSelector />
            <InputItem labelNumber={10} placeholder='Position you offer'>Offering positions: </InputItem>
            <InputItem labelNumber={10}  placeholder='Name of you company'>Company name: </InputItem>
            <InputItem labelNumber={10}  placeholder='Amount of salary you offer'>Offering salary: </InputItem>
            <TextareaItem labelNumber={10}  title='Position requirement' rows={3}/>
            <Button type='primary'>Save</Button>
        </>
    )
}

export default connect(
    state=>({}),
    {}
)(EmployerInfo)