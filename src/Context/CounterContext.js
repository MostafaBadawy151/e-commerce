// import { createContext, useState } from "react";

// export let CounterContext =createContext();

// export default function CounterContextProvider(props) {
//     const [counter, setcounter] = useState(0)
//     const [userName, setuserName] = useState("mostafa")
//     function changeCounter() {
//         setcounter(Math.random())
//     }
//     return<CounterContext.Provider value={{counter, userName, changeCounter}}>
//         {props.children}
//     </CounterContext.Provider> 
// }