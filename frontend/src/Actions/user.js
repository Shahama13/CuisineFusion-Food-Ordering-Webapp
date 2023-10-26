import axios from "axios";
import { loadUserFail, loadUserRequest, loadUserSuccess, loginFail, loginRequest, loginSuccess, logoutSuccess, registerFail, registerRequest, registerSuccess } from "../Reducers/user";
import toast from "react-hot-toast";
import { forgotPasswordFail, forgotPasswordRequest, forgotPasswordSuccess, resetPasswordFail, resetPasswordRequest, resetPasswordSuccess, updatePasswordFail, updatePasswordRequest, updatePasswordSuccess, updateProfileFail, updateProfileRequest, updateProfileSuccess } from "../Reducers/profile";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest())
        const { data } = await axios.post("/api/v1/login", {
            email, password
        }, {
            headers: { "Content-Type": "application/json" }
        })
        dispatch(loginSuccess({
            user: data.user
        }))
        toast.success("login Successful")


    } catch (error) {
        dispatch(loginFail({
            error: error.response.data.message
        }))
    }
}

export const register = (name, email, password, avatar) => async (dispatch) => {
    try {
        dispatch(registerRequest())
        const { data } = await axios.post("/api/v1/register", {
            name, email, password, avatar
        })
        dispatch(registerSuccess({
            user: data.user
        }))
        toast.success("User Registered")


    } catch (error) {
        dispatch(registerFail({
            error: error.response.data.message
        }))
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch(loadUserRequest())
        const { data } = await axios.get("/api/v1/me")
        dispatch(loadUserSuccess({
            user: data.user
        }))

    } catch (error) {
        dispatch(loadUserFail({
            error: error.response.data.message
        }))
    }
}

export const logout = () => async (dispatch) => {
    try {
        const { data } = await axios.get("/api/v1/logout")
        dispatch(logoutSuccess())
        toast.success(data.message)
    } catch (error) {
        dispatch(loginFail({
            error: error.response.data.message
        }))
    }
}

export const updateProfile = (name, email, avatar) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest())
        const { data } = await axios.put("/api/v1/update/me", {
            name, email, avatar
        })
        dispatch(updateProfileSuccess({
            isUpdated: data.success
        }))
        toast.success(data.message)

    } catch (error) {
        dispatch(updateProfileFail({
            error: error.response.data.message
        }))
    }
}

export const updatePassword = (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
        dispatch(updatePasswordRequest())
        const { data } = await axios.put("/api/v1/password/update", {
            oldPassword, newPassword, confirmPassword
        })
        dispatch(updatePasswordSuccess({
            isUpdated: data.success
        }))
        if (data.success === true) {
            toast.success("Your password has been changed successfully")
        }

    } catch (error) {
        dispatch(updatePasswordFail({
            error: error.response.data.message
        }))
    }
}

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch(forgotPasswordRequest())
        const { data } = await axios.post("/api/v1/password/forgot", {
           email
        })
        dispatch(forgotPasswordSuccess())
        toast.success(data.message)

    } catch (error) {
        dispatch(forgotPasswordFail({
            error: error.response.data.message
        }))
    }
}

export const resetPassword = (token, password, confirmPassword) => async (dispatch) => {
    try {
        dispatch(resetPasswordRequest())
        const { data } = await axios.put(`/api/v1/password/reset/${token}`, {
            password,confirmPassword
        })
        dispatch(resetPasswordSuccess())
        if (data.success===true){
            toast.success("Your password has been changed successfully")
        }

    } catch (error) {
        dispatch(resetPasswordFail({
            error: error.response.data.message
        }))
    }
}