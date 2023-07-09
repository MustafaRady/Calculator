import { ACTIONS } from "./App";

export default function Operation({dispatch,operation}){
    return (
        <button onClick={()=>dispatch({type:ACTIONS.CHOOSE_OPERAITON,payload:{operation}})}>{operation}</button>
    )
}