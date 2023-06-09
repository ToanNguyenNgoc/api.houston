import { Role } from 'src/api/role/entities';
import { Repository } from 'typeorm';
export declare class AppService {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Role>);
    getHello(): Promise<{
        time: string;
        clientHost: string;
        serverHost: string;
        mail: string;
    }>;
    initial(): Promise<void>;
}
