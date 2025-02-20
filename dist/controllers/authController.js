"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const authServices_1 = require("../services/authServices");
const authService = new authServices_1.AuthService();
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        if (!token) {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
        res.json({ token });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.login = login;
//# sourceMappingURL=authController.js.map