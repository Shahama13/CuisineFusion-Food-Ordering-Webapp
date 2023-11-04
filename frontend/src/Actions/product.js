import axios from "axios"
import { allProductFailure, allProductRequest, allProductSuccess, productDetailsFailure, productDetailsRequest, productDetailsSuccess, reviewFailure, reviewRequest, reviewSuccess } from "../Reducers/product"

export const getProduct = (keyword = "", currentPage = 1, price = [0, 5000], category, ratings = 0) => async (dispatch) => {
    try {
        dispatch(allProductRequest())
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        }

        const { data } = await axios(link)
        dispatch(allProductSuccess({
            // productCount: data.productCount,
            products: data.products,
            resultPerPage: data.resultPerPage,
            filteredProductCount: data.filteredProductCount,
        }))
    } catch (error) {
        dispatch(allProductFailure({
            error: error.response.data.message
        }))
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch(productDetailsRequest())
        const { data } = await axios.get(`/api/v1/product/${id}`)
        dispatch(productDetailsSuccess({
            product: data.product
        }))
    } catch (error) {
        dispatch(productDetailsFailure({
            error: error.response.data.message
        }))
    }
}

export const addReview = (rating, comment, productId) => async (dispatch) => {
    try {
        dispatch(reviewRequest())
        const { data } = await axios.post("/api/v1/review",{
            rating, comment, productId
        })
        dispatch(reviewSuccess(data.successs))
    } catch (error) {
        dispatch(reviewFailure(
            error.response.data.message
        ))
    }
}