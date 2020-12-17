import React,{useState} from 'react'
import {List,Grid} from "antd-mobile";
import PropTypes from "prop-types";

AvatarSelector.propTypes = {
    setAvatar: PropTypes.func.isRequired
}

export default function AvatarSelector(props){

    const [listHeader,setListHeader] = useState(((
        <div>
            Select your avatar
        </div>
        )))

    const avatarList = Array.from(new Array(20)).map((val,i)=>({
        icon: require(`@/assets/avatars/Avatar${i + 1}.png`).default,
        text:`Avatar${i+1}`,
    }))

    //using icon as name instead of avatar because otherwise Grid can't understand it
    const handleClick = ({text,icon}) => {
        setListHeader(
            (<div>
                Selected Avatar:<img src={icon} alt="user avatar"/>
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