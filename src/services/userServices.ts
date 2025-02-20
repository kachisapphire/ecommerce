import { Role } from "../enums/userEnums";
import { AppDataSource } from "../config/datasource";
import { UserDto } from "../dto/userDto";
import { User } from "../entities/userEntities";
const bcrypt = require ("bcryptjs")

export class UserService{
    private UserRepository = AppDataSource.getRepository(User)

    async create(userDto: UserDto, role: Role, requester?: Role):Promise<User> {
        if((role === Role.SUPER_ADMIN || role === Role.ADMIN) && requester !== Role.SUPER_ADMIN){
            throw new Error("Request failed")
        }
        const existingUser = await this.UserRepository.findOneBy({email: userDto.email})
        if(existingUser){
            throw new Error("user already exists")
        }
        userDto.password = await bcrypt.hash(userDto.password, 10)
        const user = this.UserRepository.create({...userDto, role})
        return await this.UserRepository.save(user)
    }

    async getAll(): Promise<User[]> {
        const users = await this.UserRepository.find()
        return users
    }

    async getOne(id: number): Promise<User> {
        const user = await this.UserRepository.findOne({
            where: {id,}
        })
        if (!user) {
            throw new Error('User not found')
        }
        return user
    }

    async update(id: number, userDto: UserDto): Promise<User> {
        const user = await this.UserRepository.findOne({
            where: {id,}
        })
        if (!user) {
            throw new Error('User not found')
        }
        Object.assign(user, userDto)
        return await this.UserRepository.save(user)
    }

    async delete(id: number): Promise<User> {
        const user = await this.UserRepository.findOne({
            where: {id,}
        })
        if(!user){
            throw new Error("Not found")
        }
        await this.UserRepository.delete(user)
        return user
    }
}
