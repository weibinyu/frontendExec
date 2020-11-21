import React,{useState} from 'react'
import {List,Grid} from "antd-mobile";
import PropTypes from "prop-types";

export default function AvatarSelector(props){
    //probably not needed, used to state that function is needed
    const propTypes = {
        setAvatar: PropTypes.func.isRequired
    }

    const [listHeader,setListHeader] = useState(((
        <div>
            Select your avatar
        </div>
        )))

    const avatarList = Array.from(new Array(20)).map((val,i)=>({
        //icon: require('./avatars/Avatar1.png'), this method doesn't work. so i put all avatars in public instead
        icon:'./avatars/Avatar'+(i+1)+'.png',
        text:'Avatar'+(i+1),
    }))

    //using icon as name instead of avatar because otherwise Grid can't understand it
    const handleClick = ({text,icon}) => {
        setListHeader(
            (<div>
                Selected Avatar:<img src={icon} />
            </div>)
        )

        props.setAvatar('avatar',text)
    }

    return (
        <List renderHeader={()=> listHeader}>
            <Grid data={avatarList} columnNum={5} onClick={handleClick}/>
        </List>
    )
}