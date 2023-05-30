import { Role } from 'src/api/role/entities';
import { Repository } from 'typeorm';
export declare class AppService {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Role>);
    getHello(): Promise<string>;
    initial(): Promise<void>;
}
