"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const datasource_1 = require("../config/datasource");
const userEntities_1 = require("../entities/userEntities");
const bcrypt = require("bcryptjs");
class UserService {
    constructor() {
        this.UserRepository = datasource_1.AppDataSource.getRepository(userEntities_1.User);
    }
    async create(userDto) {
        userDto.password = await bcrypt.hash(userDto.password, 5);
        const user = this.UserRepository.create(userDto);
        return await this.UserRepository.save(user);
    }
    async getAll() {
        const users = await this.UserRepository.find();
        return users;
    }
    async getOne(id) {
        const user = await this.UserRepository.findOne({
            where: { id, }
        });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    async update(id, userDto) {
        const user = await this.UserRepository.findOne({
            where: { id, }
        });
        if (!user) {
            throw new Error('User not found');
        }
        Object.assign(user, userDto);
        return await this.UserRepository.save(user);
    }
    async delete(id) {
        const user = await this.UserRepository.findOne({
            where: { id, }
        });
        if (!user) {
            throw new Error("Not found");
        }
        await this.UserRepository.delete(user);
        return user;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userServices.js.map