import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

export const signup = async (req, res, next) => {
     const { username, email, password } = req.body;

     // Hashing the password
     const hashedPassword = await bcrypt.hash(password, 10);

     if (!username || !email || !password || username === "" || email === "" || password === "") {
          return res.status(400).json({ message: "All fields are required" });
     }

     const newUser = new User({ username, email, password: hashedPassword });
    
     try{
          await newUser.save();
          res.status(201).json({ message: "User created successfully" });
     }catch(error){
          next(error)
     }
    
}
