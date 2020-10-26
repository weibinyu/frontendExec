import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Counter extends Component{
    static propTypes={
        count: PropTypes.number.isRequired,
        increment:PropTypes.func.isRequired,
        decrement:PropTypes.func.isRequired
    }

    increment = () =>{
        const number = this.select.value * 1
        this.props.increment(number)
    }

    decrement = () =>{
        const number = this.select.value * 1
        this.props.decrement(number)
    }

    incrementIfOdd = ()=>{
        const number = this.select.value * 1
        const {count}  = this.props
        if(count%2 ===1){
            this.props.increment(number)
        }
    }

    incrementAsync = () => {
        const number = this.select.value * 1
        setTimeout(()=>{
            this.props.increment(number)
        },1000)
    }

    render() {
        const {count} = this.props
        return(
            <div>
                <h1>redux test</h1>
                <p>click {count} times</p>
                <div>
                    <select ref={select => this.select = select}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                    </select>
                    <button onClick={this.increment}>+</button>
                    <button onClick={this.decrement}>-</button>
                    <button onClick={this.incrementIfOdd}>inc if odd</button>
                    <button onClick={this.incrementAsync}>async inc</button>
                </div>
            </div>
        )
      }
}