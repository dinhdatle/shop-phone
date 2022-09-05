import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../Constants/CartConstant";


// ADD PRODUCT 
export const addToCart = (id,qty) => async(dispath, getState) => {
    const {data} = await axios(`/api/products/${id}`);

    dispath({
        type:CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock:data.countInStock,
            qty,

        }
    })

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

// REMOVE PRODUCT FROM CART

export const removFromCart = (id) => (dispath,getState) => {
    dispath({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))

}

