import { UserDto } from "../dto/userDto";
import { User } from "../entities/userEntities";
export declare class UserService {
    private UserRepository;
    create(userDto: UserDto): Promise<User>;
    getAll(): Promise<User[]>;
    getOne(id: number): Promise<User>;
    update(id: number, userDto: UserDto): Promise<User>;
    delete(id: number): Promise<User>;
}
