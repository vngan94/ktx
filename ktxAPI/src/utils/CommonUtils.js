import JWT from 'jsonwebtoken'
require('dotenv').config();

let encodeToken = (userId) =>{
    return JWT.sign({
        iss: 'vngan2489',
        sub: userId,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() +3) // co thoi han trong 3 ngay
    },process.env.JWT_SECRET)
}
module.exports = {
    encodeToken:encodeToken
}