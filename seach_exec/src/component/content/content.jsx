import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class Content extends Component{
    static propTypes ={
        searchName: PropTypes.string.isRequired
    }
    state = {
        initView: true,
        loading: false,
        users:null,
        errorMessage:null
    }

    componentWillReceiveProps(newProps,nextContent ) {
        const searchName= newProps.searchName.toString()
        this.setState({
            initView:false,
            loading:true
        })
        const url ='https://api.github.com/search/users?q='+searchName
        axios.get(url)
            .then(response =>{
                const result = response.data
                console.log(url)
                const users = result.items.map(item =>({
                    name: item.login,
                    url:item.url,
                    avatarUrl:item.avatar_url
                }))
                this.setState({loading:false,users})
            })
            .catch(error =>{
                this.setState({loading:false,errorMsg:error.message})
            })
    }

    render() {
        const {initView,loading,users,errorMessage}= this.state
        const {searchName} = this.props
        if(initView){
            return <h2>Enter username to search:{searchName}</h2>
        }else if(loading)
            return <h2>Loading...</h2>
        else if(errorMessage){
            return <h2>{errorMessage}</h2>
        }
        return(
            <div className="row">
                {
                    users.map((user,index) => (
                        <div className="card" key={index}>
                            <a href={user.url} target="_blank">
                            <img src={user.avatarUrl} style={{width:100}} alt=""/>
                            </a>
                            <p className="card-text">{user.name}</p>
                        </div>
                    ))
                }

            </div>
        )
    }

}