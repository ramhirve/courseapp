import bcrypt from "bcryptjs"
import { z } from "zod"
import jwt from "jsonwebtoken"
import config from "../config.js";
import { Admin } from "../models/admin.model.js";

export const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const adminSchema = z.object({
        firstName: z.string().min(3, { message: "firstname must be atleast 3 char long" }),
        lastName: z.string().min(3, { message: "lastname must be atleast 3 char long" }),
        email: z.string().email(),
        password: z.string().min(6, { message: "password must be atleast 6 char long" }),
    })

    const validatedData = adminSchema.safeParse(req.body);
    if (!validatedData.success) {
        return res.status(400).json({ errors: validatedData.error.issues.map(err => err.message) });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const existingAdmin = await Admin.findOne({ email: email })
        if (existingAdmin) {
            return res.status(400).json({ errors: "Admin already exists" })
        }
        const newAdmin = new Admin({ firstName, lastName, email, password: hashedPassword })
        await newAdmin.save();
        res.status(200).json({ message: "Signup succeed", newAdmin })
    } catch (error) {
        res.status(500).json({ errors: "Error in signup" })
        console.log("Error in signUp", error);
    }
}



export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email: email });
        const isPasswordCorrect = await bcrypt.compare(password, admin.password)

        if (!admin || !isPasswordCorrect) {
            return res.status(403).json({ errors: "Invalid credentials" });
        }

        // jwt code
        const token = jwt.sign(
            {
                id: admin._id,
            },
            config.JWT_ADMIN_PASSWORD,
            { expiresIn: "1d" }
        ); //generate jwt token
        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //1 day
            httpOnly: true,  //can't be access via js diirectly
            secure: process.env.NODE_ENV === "production", //true for http only
            sameSide: "Strict" //prevent from CSRF attack 
        }

        res.cookie("jwt", token, cookieOptions) //store token in cookies

        res.status(201).json({ message: "Login successful", admin, token });
    } catch (error) {
        res.status(500).json({ error: "Error in login" });
        console.log("error in login", error)
    }
}


export const logout = async (req, res) => {
    try {
        if(!req.cookies.jwt){
            return res.status(401).json({errors: "Kindly login first"})
        }
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        res.status(500).json({ errors: "Error in logout" });
        console.log("Error in logout", error);
    }
}