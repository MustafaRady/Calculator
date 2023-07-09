import { ACTIONS } from "./App";

export default function Clear({dispatch}){

    return (
        <button 
        className="span-two"
        onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
    )
}