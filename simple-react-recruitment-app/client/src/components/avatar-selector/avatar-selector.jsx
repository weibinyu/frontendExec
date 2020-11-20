import React,{useState} from 'react'
import {List,Grid} from "antd-mobile";

export default function AvatarSelector(props){
    const listHeader = 'Select your Avatar'
    const avatarList = Array.from(new Array(20)).map((val,i)=>({
        //icon: require('./avatars/Avatar1.png'), this method doesn't work. so i put all avatars in public instead
        icon:'./avatars/Avatar'+(i+1)+'.png',
        text:'Avatar'+(i+1),
    }))

    return (
        <List renderHeader={()=> listHeader}>
            <Grid data={avatarList} columnNum={5} />
        </List>
    )
}