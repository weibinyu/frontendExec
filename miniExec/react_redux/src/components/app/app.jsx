import React, {Component} from 'react'


export default class App extends Component{
  render() {
    return(
        <div>
            <h1>redux test</h1>
            <p>click 0 times</p>
            <div>
                <select>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                </select>
                <button>+</button>
                <button>-</button>
                <button>inc if odd</button>
                <button>async inc</button>
            </div>
        </div>
    )
  }
}