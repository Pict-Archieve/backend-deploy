import decodeToken from "../utils/token/decodeToken.js"

// A middleware to check if the user is authenticated or not, before any action
const isAdminAuth = (req, res, next) => {
  const token = req.cookies["token"]

  if (!token) {
    return res.status(401).json({ message: "Not LoggedIn as Admin" })
  }

  // Verify the token
  try {
    const authTokenData = decodeToken(token)

    // Check if data exits
    if (!authTokenData.isAdmin) {
      res.clearCookie("token")
      return res.status(401).json({ message: "Not LoggedIn as Admin" })
    }

    // Adding token data to req
    req.body.authTokenData = authTokenData

    return next()
  } catch (err) {
    return res.status(401).json({ message: "Not LoggedIn as Admin" })
  }
}

export default isAdminAuth
