import { UserDto } from "dto/userDto";
import { AppDataSource } from "../config/datasource";
import { User } from "../entities/userEntities";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export class AuthService{
    private UserRepository = AppDataSource.getRepository(User)
    async login(email, password): Promise<User> {
        //const email = userDto.email;
        const user = await this.UserRepository.findOneBy({email})
        if (!user) {
            throw new Error('User not found')
        }
        const IsValid = await bcrypt.compare(password, user.password);
        if (!IsValid) {
            throw new Error("Invalid Password")
        }
        const token = jwt.sign({ id: user.id, email: user.email }, "SECRET_KEY", { expiresIn: "1h" });
        return token;
    }
}