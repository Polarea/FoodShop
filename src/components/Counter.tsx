/* eslint-disable react-refresh/only-export-components */
import { forwardRef, Ref, useImperativeHandle, useState } from "react"

export type CounterRef = {
  reset : () => void; 
}

function Counter(ref : Ref<CounterRef>) {
  const [counter, setCounter] = useState(0);
  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter - 1);
  const reset = () => setCounter(0);
  useImperativeHandle(ref, () => ({reset}));
  return (
    <div className="mt-5">
      <div className="d-flex justify-content-center">
        <button className="btn btn-danger" onClick={()=> increment()}>Increment</button>
        <span className="m-2 fw-bold">Counter : {counter}</span>
        <button className="btn btn-danger" onClick={() => decrement()}>Decrement</button>
      </div>
    </div>
  )
}

export default forwardRef(Counter)

// import { useReducer } from "react";
// interface State{
//   count:number;
//   error: string | null;
// }
// interface Action{
//   type : 'increment' | 'decrement';
// }
// function reducer(state:State, action:Action){
//   const {type} = action;

//   switch (type){
//     case "increment":{
//       const newCount = state.count + 1;
//       const hasError = newCount > 5;
//       return {...state, count: hasError ? state.count : newCount, error: hasError ? "Maximum reached" : null};
//     }
//     case "decrement":{
//       const newCount = state.count - 1;
//       const hasError = newCount < 0 ;
//       return {...state, count: hasError ? state.count : newCount, error : hasError ? "Minimum reached" : null};
//     }
//     default:
//       return state;
//   }
// }
// function Counter() {
//   const [state, dispatch] = useReducer(reducer, {count:0, error:null});

//   return <div className="d-flex justify-content-between mt-5">
//     <div>Count: {state.count}</div>
//     {state.error && <div>{state.error}</div>}
//     <button className="btn btn-dark" onClick={()=> dispatch({type:"increment"})}>Increment</button>
//     <button className="btn btn-secondary" onClick={()=> dispatch({type:"decrement"})}>Decrement</button>
//   </div>;
// }

// export default Counter;