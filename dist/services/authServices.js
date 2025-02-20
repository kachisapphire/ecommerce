"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const datasource_1 = require("../config/datasource");
const userEntities_1 = require("../entities/userEntities");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class AuthService {
    constructor() {
        this.UserRepository = datasource_1.AppDataSource.getRepository(userEntities_1.User);
    }
    async login(email, password) {
        const user = await this.UserRepository.findOneBy({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const IsValid = await bcrypt.compare(password, user.password);
        if (!IsValid) {
            throw new Error("Invalid Password");
        }
        const token = jwt.sign({ id: user.id, email: user.email }, "SECRET_KEY", { expiresIn: "1h" });
        return token;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=authServices.js.map