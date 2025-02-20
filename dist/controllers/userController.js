"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const userServices_1 = require("../services/userServices");
const userService = new userServices_1.UserService();
const createUser = async (req, res) => {
    try {
        const userDto = req.body;
        const user = await userService.create(userDto);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createUser = createUser;
const getAllUsers = async (req, res) => {
    try {
        const user = await userService.getAll();
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    try {
        const user = await userService.getOne(parseInt(req.params.id));
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const userDto = req.body;
        const user = await userService.update(id, userDto);
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        }
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const user = await userService.delete(parseInt(req.params.id));
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map