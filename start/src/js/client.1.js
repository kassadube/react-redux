import { applyMiddleware, createStore } from "redux"


const reducer = (state = 0,action)=>{

  switch(action.type)
   {
     case "INC":
     return state + action.payload;
      
     break;
     case "DEC":
      return state + action.payload;
     break;
     case "E":
      throw new Error("AAHHHH!!!!")
     break;
   }
return state;
}


const logger = (store)=>(next)=>(action)=>{
  console.log("action fired",action);
  next(action);
}

const error = (store)=>(next)=>(action)=>{
  try
  {
  console.log("action fired from error",action);
  next(action);
  }
  catch(e)
  {
    console.log("AAHH!!!!!!!!!!!!!!!!",e);
  }
}


const middleware = applyMiddleware(logger,error);

const store = createStore(reducer,1,middleware);

store.subscribe(() => {
  console.log("Store changed", store.getState());
})

store.dispatch({ type: "INC", payload: 1 });
store.dispatch({ type: "INC", payload: 7 });
store.dispatch({ type: "INC", payload: 5 });
store.dispatch({ type: "INC", payload: 1 });
store.dispatch({ type: "E", payload: 40 });