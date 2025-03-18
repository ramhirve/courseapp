import dotenv from "dotenv"
dotenv.config();

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;

const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;

const STRIPE_SECRET_KEY =   "sk_test_51QzzQaPqGqik9Mxaj54lfJ1qQgkrbJMVmdlTYdx4yYiJrgj9TUp97gpsrjNw7pJl7LauQEBqJvnPM8iRC3R7fcbp00yS6F4l4w" ;

export default {
    JWT_USER_PASSWORD,
    JWT_ADMIN_PASSWORD,
    STRIPE_SECRET_KEY
}