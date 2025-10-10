import jwt from "jsonwebtoken"
const maxage = 3 * 24 * 60 * 60 * 1000;
const secretkey = "adminsecretkey"

export function setUser(user) {
  return jwt.sign(
    {
      email: user.email,
      id: user._id,
      adminRole: user.isAdmin
    },
    secretkey,
    {
        expiresIn:maxage
    }
  );
}

export function getUser(token,secret) {
  return jwt.verify(token, secret);
}