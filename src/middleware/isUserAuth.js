import decodeToken from "../utils/token/decodeToken.js"

// A middleware to check if the user is authenticated or not, before any action
const isUserAuth = (req, res, next) => {
  const token = req.cookies["token"]

  if (!token) {
    return res.status(401).json({ message: "User not LoggedIn" })
  }

  try {
    // Verify the token
    const authTokenData = decodeToken(token)

    // Adding token data to req
    req.body.authTokenData = authTokenData

    return next()
  } catch (err) {
    return res.status(401).json({ message: "User not LoggedIn" })
  }
}

export default isUserAuth
