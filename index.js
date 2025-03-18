import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

import courseRoute from "./routes/course.route.js"
import userRoute from "./routes/user.route.js"
import adminRoute from "./routes/admin.routes.js"
import orderRoute from "./routes/order.route.js"

import fileUpload from "express-fileupload"
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
dotenv.config()

//middleware  
app.use(express.json());
app.use(cookieParser())
app.use(
  fileUpload ({
    useTempFiles: true,
    tempFileDir: "/tmp/"
  })
);
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
  method:["GET","POST","PUT","DELETE"],
  allowedHeaders:["Content-Type","Authorization"],
  }))

const port = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI

try{
   await mongoose.connect(DB_URI)
    console.log("connected to mongoDB")
}catch(error){
console.log(error)
}

// define routes
app.use("/api/v1/course", courseRoute)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/admin", adminRoute )
app.use("/api/v1/order", orderRoute)


    // Cloudinary Configuration code
    cloudinary.config({ 
      cloud_name: process.env.cloud_name, 
      api_key: process.env.api_key, 
      api_secret: process.env.api_secret, 
  });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})