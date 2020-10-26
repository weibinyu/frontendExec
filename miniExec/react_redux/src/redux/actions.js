import {DEC, INC} from "./action-types";

export const increment = (number) => ({type:INC,data:number})

export const decrement = (number) => ({type:DEC,data:number})

export const incrementAsync = (number) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(increment(number))
        },1000)
    }
}