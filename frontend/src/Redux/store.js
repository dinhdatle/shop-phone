import {createStore, combineRedux, applyMiddleware, combineReducers} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { productDetailsReducer, productListReducer } from "./Reducers/ProductReducers.js"
import { cartReducer } from "./Reducers/CartReducers.js"
import { userLoginReducer } from "./Reducers/userReducers"


const reducer = combineReducers({
     productList : productListReducer,
     productDetails : productDetailsReducer,
     cart: cartReducer,
     userLogin: userLoginReducer


})

// CART

const cartItemsFromLocalStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []

// LOGIN

const userInfoFromLocalStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null


const initialState = {
     cart: {
          cartItems: cartItemsFromLocalStorage,
     },
     userLogin:{
          userInfo:userInfoFromLocalStorage}
    
}

const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;