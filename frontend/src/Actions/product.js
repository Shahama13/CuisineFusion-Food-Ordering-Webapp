import axios from "axios"
import { allProductFailure, allProductRequest, allProductSuccess, productDetailsFailure, productDetailsRequest, productDetailsSuccess } from "../Reducers/product"

export const getProduct = (keyword="",currentPage=1) => async (dispatch) => {
    try {
        dispatch(allProductRequest())
        const { data } = await axios(`/api/v1/products?keyword=${keyword}&page=${currentPage}`)
        dispatch(allProductSuccess({
            // productCount: data.productCount,
            products: data.products,
            resultPerPage:data.resultPerPage,
            filteredProductCount:data.filteredProductCount,
        }))
    } catch (error) {
        dispatch(allProductFailure({
            error: error.response.data.message
        }))
    }
}

export const getProductDetails=(id)=>async(dispatch)=>{
try {
    dispatch(productDetailsRequest())
    const {data}= await axios.get(`/api/v1/product/${id}`)
    dispatch(productDetailsSuccess({
        product:data.product
    }))
} catch (error) {
    dispatch(productDetailsFailure({
        error:error.response.data.message
    }))
}
}