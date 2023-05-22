import { Repository } from 'typeorm';
import { Role } from '../role/entities';
import { CreateAccountDto, QueryAccountDTO, UpdateAccountDto } from './dto';
import { Account } from './entities';
import { TransformData, TransformMessage, RequestHeader } from '../../interface';
import { Branch } from '../branches/entities';
import { Media } from '../media/entities';
export declare class AccountService {
    private readonly branchRepository;
    private readonly accountRepository;
    private readonly roleRepository;
    private readonly mediaRepository;
    constructor(branchRepository: Repository<Branch>, accountRepository: Repository<Account>, roleRepository: Repository<Role>, mediaRepository: Repository<Media>);
    create(req: RequestHeader<Account>, body: CreateAccountDto): Promise<Account>;
    createInitial(body: CreateAccountDto): Promise<Account>;
    findAll(req: RequestHeader<Account>, query: QueryAccountDTO): Promise<TransformData<Account[]>>;
    findOne(id: number): Promise<TransformData<Account>>;
    update(req: RequestHeader<Account>, id: number, updateAccountDto: UpdateAccountDto): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<TransformMessage>;
}
