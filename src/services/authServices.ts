import { UserDto } from "dto/userDto";
import { AppDataSource } from "../config/datasource";
import { User } from "../entities/userEntities";
import { Role } from "../enums/userEnums";
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
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, "Kachi5599" as string, { expiresIn: "1h" });
        return (token);
    }

    async seedAdmin(userDto: UserDto) {
        const admin = await this.UserRepository.findOneBy({email: userDto.email});
        if(admin) {
            console.log("Admin already exists");
            return;
        }
        const hashedPassword = await bcrypt.hash(userDto.password, 10);
        const superAdmin = new User();
        superAdmin.email = userDto.email;
        superAdmin.firstname = userDto.firstname;
        superAdmin.lastname = userDto.lastname;
        superAdmin.password = hashedPassword;
        superAdmin.role = Role.SUPER_ADMIN

        await this.UserRepository.save(superAdmin);
    }
}