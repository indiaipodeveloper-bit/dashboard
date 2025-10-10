import jwt from "jsonwebtoken";
const maxage = 3 * 24 * 60 * 60 * 1000;
const secretkey = "password";

export function setUser(user) {
  return jwt.sign(user, secretkey, {
    expiresIn: maxage,
  });
}

export function getUser(token, secretkey) {
  return jwt.verify(token, secretkey);
}
