import { UserDto } from "../dto/userDto";
import { UserService } from "../services/userServices";
import { Request, Response } from "express";

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
    try{
        const userDto: UserDto = req.body;
        const user = await userService.create(userDto);
        res.status(201).json(user);
    }
    catch(error:any) {
        res.status(400).json({message: error.message})
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try{
        const user = await userService.getAll()
        res.status(200).json(user);
    }
    catch(error:any) {
        res.status(400).json({message:error.message})
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try{
        const user = await userService.getOne(parseInt(req.params.id))
        if (!user){
            res.status(404).json({message: 'User not found'})
        }
        res.status(200).json(user)
    }
    catch(error:any){
        res.status(400).json({message: error.message})
    }
}

export const updateUser = async (req: Request, res: Response) =>{
    try{
        const id = parseInt(req.params.id);
        const userDto: UserDto = req.body;
        const user = await userService.update(id, userDto);
        if (!user){
            res.status(404).json({message: 'user not found'})
        }
        res.status(201).json(user)
    }
    catch(error:any){
        res.status(400).json({message: error.message})
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try{
        const user = await userService.delete(parseInt(req.params.id))
        if (!user){
            res.status(404).json({message: 'user not found'})
        }
        res.status(200).json(user)
    }
    catch(error:any) {
        res.status(400).json({message: error.message})
    }
}