import { Button } from "bootstrap";
import React,{useReducer} from "react"
import "./style.css"
import DigitButton from "./DigitButton";
import Operation from "./Operation";
import Evaluate from "./Evaluate";
import Clear from "./Clear";
import Delete from "./Delete";


export const ACTIONS ={
  ADD_DIGIT : "add-digit",
  CHOOSE_OPERAITON:'choose-operation',
  CLEAR:'clear',
  DELETE_DIGIT:'delete-digit',
  EVALUATE :'evaluate'
}

function findDot(string){
  for(var i= 0 ; i< string.length ;i++){
    //console.log(string.substring(i))
    if(string.substring(i) == ".") return true ;
  }
  return false; 
}

function reducer (state ,{type,payload}){
  
    switch(type){
      case ACTIONS.ADD_DIGIT:
        if(state.overwrite == true){
          return { 
            ...state,
            currentOperand :payload.digit,
            overwrite :false
          }
        }

        if(state.currentOperand == "0" && payload.digit == "0"){
          return state;
        }
        if(payload.digit =="." && (state.currentOperand).includes(".") ) return state;


        return{
          ...state,
          currentOperand: state.currentOperand==null?payload.digit:state.currentOperand+payload.digit
        }
        
      

        
      case ACTIONS.CHOOSE_OPERAITON:

        if(state.currentOperand == null && state.previousOperand == null) return state

        if(state.currentOperand == null){
          return{
            ...state,
            operation : payload.operation
          }
        }
        if(state.previousOperand == null ) {
          return {
            ...state,
            operation : payload.operation,
            previousOperand:state.currentOperand,
            currentOperand : null,
          }
        }
        return{
          ...state, 
          previousOperand : evaluate(state) , 
          operation: payload.operation,
          currentOperand : null
          
        }
      
      case ACTIONS.EVALUATE:
        if(state.currentOperand ==null || state.previousOperand==null || state.operation ==null) return state
        
        return{
          ...state,
          overwrite:true,
          previousOperand : null,
          currentOperand :evaluate(state),
          operation: null,
        }


      case ACTIONS.CLEAR:
        return { }

      case ACTIONS.DELETE_DIGIT:

        if(state.overwrite){
          return{
            ...state,
            overwrite:false,
            currentOperand :null
          }
        }

        if(state.currentOperand == null) return state ; 
        if(state.currentOperand.length === 1){
          return {...state ,currentOperand : null}
        }
        return{
          ...state,
          currentOperand : state.currentOperand.slice(0,-1)
        }

    }
}


function evaluate({currentOperand,previousOperand,operation}){
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand) ;
  if(isNaN(prev)|| isNaN(current)) return ""
  let computation = ""
  switch(operation){
    case "+":
      computation = prev+current
      break
    case "-":
      computation = prev-current
      break
    case "*":
      computation = prev*current
      break
    case "/":
      computation = prev/current
      break
  }
  return computation.toString()
  

}

function App() {
  
  const [{currentOperand , previousOperand , operation  },dispatch] = useReducer(reducer,{currentOperand:""});


  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>

        <div className="current-operand">
          {currentOperand} 
        </div>

      </div>
      <Clear dispatch={dispatch} />
      <Delete dispatch={dispatch}/>
      <Operation dispatch={dispatch} operation={"/"}/>
      <DigitButton  dispatch={dispatch} digit="1"/>
      <DigitButton  dispatch={dispatch} digit="2"/>
      <DigitButton  dispatch={dispatch} digit="3"/>
      <Operation dispatch={dispatch} operation={"*"}/>
      <DigitButton  dispatch={dispatch} digit="4"/>
      <DigitButton  dispatch={dispatch} digit="5"/>
      <DigitButton  dispatch={dispatch} digit="6"/>
      <Operation dispatch={dispatch} operation={"+"}/>
      <DigitButton  dispatch={dispatch} digit="7"/>
      <DigitButton  dispatch={dispatch} digit="8"/>
      <DigitButton  dispatch={dispatch} digit="9"/>
      <Operation dispatch={dispatch} operation={"-"}/>
      <DigitButton  dispatch={dispatch} digit="."/>
      <DigitButton  dispatch={dispatch} digit="0"/>
      <Evaluate  dispatch={dispatch}/>
    </div>
  );
}

export default App;
