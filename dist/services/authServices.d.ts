import { User } from "../entities/userEntities";
export declare class AuthService {
    private UserRepository;
    login(email: any, password: any): Promise<User>;
}
