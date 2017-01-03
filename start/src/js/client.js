import { applyMiddleware, createStore } from "redux"
import axios from "axios";
import logger from "redux-logger"
import thunk from "redux-thunk"


const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_START":
      return { ...state, fetching: true };
      break;
    case "RECIVE_USERS":
      return { ...state, feched: true, users: action.payload };
      break;
    case "FETCH_USERS_ERR":
      return { ...state, fetching: false, error: action.payload };
      break;
  }
  return state;
}



const middleware = applyMiddleware(thunk, logger());

const store = createStore(reducer, middleware);

/*
store.subscribe(() => {
  console.log("Store changed", store.getState());
})
*/

store.dispatch((dispatch) => {
  dispatch({ type: "FETCH_USERS_START" });
  axios.get("http://rest.learncode.academy/api/wstern/users")
    .then((response) => {
      dispatch({ type: "RECIVE_USERS", payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: "FETCH_USERS_ERR", payload: err });
    })

}
);
