import React from 'react'
import Search from '../search/search'
import Content from '../content/content'

export default class App extends React.Component {
    state = {
        searchName:""
    }

    setSearchName =(searchName)=>{
        this.setState({searchName})
    }
    render() {
        return (
            <div className="container">
                <Search />
                <Content />
            </div>
        )
    }

}
