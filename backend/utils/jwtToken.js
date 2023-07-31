const sendToken = async (user, statusCode, res) => {

    const token = user.getJWTToken();

    const options = {
        httpOnly: true,
        expires: new Date(Date.now()+process.env.COOKIE_EXPIRE*1000*60*60*24)
    }

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    })
}

export default sendToken;