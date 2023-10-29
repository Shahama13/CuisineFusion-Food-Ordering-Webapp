import axios from "axios";
import { addToCart } from "../Reducers/cart";

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/v1/product/${id}`)

    dispatch(addToCart({
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        quantity
    }))

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}