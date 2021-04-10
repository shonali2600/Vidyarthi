require('dotenv').config();

let PORT = process.env.PORT;
let NODE_ENV = process.env.NODE_ENV;
let MONGODB_URI = process.env.MONGODB_URI;
let JWT_COOKIE_EXPIRES_IN = process.env.JWT_COOKIE_EXPIRES_IN;
let CLIENT_ID = process.env.CLIENT_ID;
let CLIENT_SECRET = process.env.CLIENT_SECRET;
let CLIENT_CALLBACK = process.env.CLIENT_CALLBACK;

module.exports = {
    PORT,
    MONGODB_URI,
    NODE_ENV,
    JWT_COOKIE_EXPIRES_IN,
    CLIENT_ID,
    CLIENT_SECRET,
    CLIENT_CALLBACK,
};