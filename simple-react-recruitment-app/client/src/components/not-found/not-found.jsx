import React from "react";
import {Button} from "antd-mobile";

export default function NotFound(props){
    return (
        <>
            <div>
                <div>
                    <h2>Sorry,the page is not found</h2>
                    <Button type='primary' onClick={()=>props.history.replace('/')}>Back to main page</Button>
                </div>
            </div>
        </>
    )
}