
import { Request, Response } from "express";
import { AuthService } from "../services/authServices";

const authService = new AuthService();

export const login = async(req:Request, res: Response) => {
    try{
        const {email, password} = req.body;
        const token = await authService.login(email, password)
        if (!token) {
            res.status(401).json({message: 'Invalid Credentials'})
        }
        res.json({token})
    }
    catch(error:any){
        res.status(400).json({message: error.message})
    }
}