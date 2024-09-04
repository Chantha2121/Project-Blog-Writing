import bcrypt from "bcryptjs";
import { db } from "../db.js";
import jwt from 'jsonwebtoken';

export const register = (req, res) => {
    const { username, email, password } = req.body;

    // CHECK User Existing
    const q = "SELECT * FROM user WHERE email = ? OR username = ?";
    db.query(q, [email, username], (err, data) => {
        if (err) return res.status(500).json({ message: "Database query error" });
        if (data.length) return res.status(409).json({ message: "User already exists" });

        // Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const q = "INSERT INTO user(`username`, `email`, `password`) VALUES (?)";
        const values = [username, email, hash];
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json({ message: "Database query error" });
            return res.status(201).json({ message: "User has been created" });
        });
    });
}

export const login = (req, res) => {
    // Login logic here
    const q = "SELECT * FROM user WHERE username = ?";
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.json(err);
        if(data.length === 0) return res.status(404).json("User not found");

        // check password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        if(!isPasswordCorrect) return res.status(400).json("Wrong username or password")
        const token = jwt.sign({id: data[0].id},"jwtkey");
        const {password, ...other} = data[0] 
        res.cookie("access_token", token,{
            httpOnly:true,
        }).status(200).json(other);
    })
}

export const logout = (req, res) => {
    // Logout logic here
    res.clearCookie("access_token",{
        sameSite: 'none',
        secure: true
    }).status(200).json("User has been logged out!");
}
