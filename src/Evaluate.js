import { ACTIONS } from "./App";

export default function Evaluate({dispatch}){
    return (
        <button 
        className="span-two"
        onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>=</button>
    )
}