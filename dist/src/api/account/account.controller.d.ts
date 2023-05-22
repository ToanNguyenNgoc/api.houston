import { AccountService } from './account.service';
import { QueryAccountDTO } from './dto';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    findAll(req: any, query: QueryAccountDTO): Promise<import("../../interface").TransformData<import("./entities").Account[]>>;
    findOne(id: number): Promise<import("../../interface").TransformData<import("./entities").Account>>;
    create(req: any, createAccountDto: CreateAccountDto): Promise<import("./entities").Account>;
    createInitial(body: CreateAccountDto): Promise<import("./entities").Account>;
    update(req: any, id: string, updateAccountDto: UpdateAccountDto): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<import("../../interface").TransformMessage>;
}
