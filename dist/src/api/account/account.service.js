"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../role/entities");
const entities_2 = require("./entities");
const bcrypt = require("bcrypt");
const bluebird_1 = require("bluebird");
const utils_1 = require("../../utils");
const common_2 = require("../../common");
const entities_3 = require("../branches/entities");
const entities_4 = require("../media/entities");
let AccountService = class AccountService {
    constructor(branchRepository, accountRepository, roleRepository, mediaRepository) {
        this.branchRepository = branchRepository;
        this.accountRepository = accountRepository;
        this.roleRepository = roleRepository;
        this.mediaRepository = mediaRepository;
    }
    async create(req, body) {
        var _a, _b, _c;
        const userCreate = req.user;
        const branchDependencyUserCreate = (_b = (_a = userCreate.branch) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : body.branch_id;
        try {
            const currentEmail = await this.accountRepository.findOneBy({ email: body.email });
            if (currentEmail)
                throw new common_1.ForbiddenException(`Email belong to another account`);
            const currentTelephone = await this.accountRepository.findOneBy({ telephone: body.telephone });
            if (currentTelephone)
                throw new common_1.ForbiddenException(`Telephone belong to another account`);
            const salt = await bcrypt.genSalt(10);
            const password_hashed = await bcrypt.hash(body.password, salt);
            const account = new entities_2.Account();
            account.telephone = body.telephone;
            account.email = body.email;
            account.fullname = body.fullname;
            account.password = password_hashed;
            account.full_address = body.full_address;
            account.sex = body.sex;
            account.ccid = body.ccid;
            const roles = await bluebird_1.Promise.map((_c = body.roles) !== null && _c !== void 0 ? _c : [], async (role_id) => {
                const role = await this.
                    roleRepository.
                    findOneBy({ id: role_id, status: true, deleted: false });
                return role;
            }).filter(Boolean);
            account.roles = roles;
            const resBranch = await this.branchRepository
                .createQueryBuilder('tb_branch')
                .where({ id: branchDependencyUserCreate })
                .getOne();
            if (!resBranch) {
                throw new common_1.NotFoundException('Not found');
            }
            account.branch = resBranch;
            const response = await this.accountRepository.save(account);
            delete response.password;
            return response;
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
    async createInitial(body) {
        const count = await this.accountRepository.count();
        if (count > 0)
            throw new common_1.NotFoundException('Not found');
        const role = await this.roleRepository.findOneBy({ code: (0, utils_1.encode)('Super Admin') });
        const initialAccount = new entities_2.Account();
        const salt = await bcrypt.genSalt(10);
        const password_hashed = await bcrypt.hash(body.password, salt);
        initialAccount.fullname = body.fullname;
        initialAccount.email = body.email;
        initialAccount.password = password_hashed;
        initialAccount.telephone = body.telephone;
        initialAccount.description = body.description;
        initialAccount.full_address = body.full_address;
        initialAccount.sex = body.sex;
        initialAccount.roles = [role];
        const response = await this.accountRepository.save(initialAccount);
        delete response.password;
        delete response.roles;
        return response;
    }
    async findAll(req, query) {
        var _a, _b, _c, _d, _e;
        try {
            const branch_id = (_c = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.branch) === null || _b === void 0 ? void 0 : _b.id) !== null && _c !== void 0 ? _c : query.filter_branch_id;
            const page = parseInt(`${(_d = query.page) !== null && _d !== void 0 ? _d : 1}`);
            const limit = parseInt(`${(_e = query.limit) !== null && _e !== void 0 ? _e : 15}`);
            const status = (0, utils_1.convertBoolean)(query.status);
            const response = await this.accountRepository
                .createQueryBuilder('tb_account')
                .select([
                'tb_account.id',
                'tb_account.telephone',
                'tb_account.email',
                'tb_account.fullname',
                'tb_account.ccid',
                'tb_account.status',
                'tb_account.description',
                'tb_account.full_address',
                'tb_account.sex',
                'tb_account.deleted',
                'tb_account.created_at',
                'tb_account.updated_at',
                'tb_account.media'
            ])
                .leftJoinAndSelect('tb_account.roles', 'tb_role')
                .leftJoinAndSelect('tb_account.branch', 'tb_branch')
                .leftJoin('tb_account.media', 'tb_media')
                .addSelect(['tb_media.original_url'])
                .offset((page * limit) - limit)
                .where({ deleted: false })
                .andWhere(new typeorm_2.Brackets((qb) => qb.where(query.status ? { status: status } : {})))
                .andWhere(new typeorm_2.Brackets((qb) => {
                var _a, _b, _c, _d;
                qb.where({ fullname: (0, typeorm_2.Like)(`%${(_a = query.search) !== null && _a !== void 0 ? _a : ''}%`) })
                    .orWhere({ telephone: (0, typeorm_2.Like)(`%${(_b = query.search) !== null && _b !== void 0 ? _b : ''}`) })
                    .orWhere({ email: (0, typeorm_2.Like)(`%${(_c = query.search) !== null && _c !== void 0 ? _c : ''}`) })
                    .orWhere({ ccid: (0, typeorm_2.Like)(`%${(_d = query.search) !== null && _d !== void 0 ? _d : ''}`) });
            }))
                .andWhere(new typeorm_2.Brackets((qb) => {
                qb.where(branch_id ? 'tb_branch.id =:id' : '', branch_id ? { id: branch_id } : {});
            }))
                .limit(limit)
                .getManyAndCount();
            return (0, common_2.transformResponse)(response[0], response[1], page, limit);
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
    async findOne(id) {
        const response = await this.accountRepository
            .createQueryBuilder('tb_account')
            .leftJoinAndSelect('tb_account.roles', 'tb_role')
            .leftJoinAndSelect('tb_account.branch', 'tb_branch')
            .leftJoin('tb_account.media', 'tb_media')
            .addSelect(['tb_media.original_url'])
            .where({ id: id })
            .andWhere({ deleted: false })
            .getOne();
        if (!response) {
            throw new common_1.NotFoundException(`Cannot not found`);
        }
        delete response.password;
        return { data: response };
    }
    async update(req, id, updateAccountDto) {
        const currentTelephone = await this.accountRepository
            .createQueryBuilder('tb_account')
            .where({ telephone: updateAccountDto.telephone })
            .getOne();
        if (currentTelephone && updateAccountDto.telephone) {
            throw new common_1.ForbiddenException(`Telephone belong to another account`);
        }
        const response = await this.accountRepository
            .createQueryBuilder('tb_account')
            .leftJoinAndSelect('tb_account.roles', 'tb_role')
            .where({ id: id })
            .getOne();
        if (!response) {
            throw new common_1.NotFoundException(`Cannot not found`);
        }
        const media = await this.mediaRepository
            .createQueryBuilder('tb_media')
            .where({ id: updateAccountDto.mediaId })
            .getOne();
        if (response && response.roles.map(role => role.code).includes((0, utils_1.encode)(common_2.key.SUPER_ADMIN))) {
            await this.accountRepository
                .createQueryBuilder('tb_account')
                .where({ id: id })
                .update(entities_2.Account)
                .set({
                fullname: updateAccountDto.fullname,
                telephone: updateAccountDto.telephone,
                description: updateAccountDto.description,
                sex: updateAccountDto.sex,
                full_address: updateAccountDto.full_address,
                media: media,
                ccid: updateAccountDto.ccid
            })
                .execute();
            return { message: 'Update account success' };
        }
        if (updateAccountDto.roles) {
            const roles = await bluebird_1.Promise.map(updateAccountDto.roles, async (role_id) => {
                const role = await this.roleRepository
                    .createQueryBuilder('tb_role')
                    .where({ id: role_id })
                    .getOne();
                if (!role) {
                    throw new common_1.NotFoundException('Can not found');
                }
                if (role.code === (0, utils_1.encode)(common_2.key.SUPER_ADMIN)) {
                    return null;
                }
                return role;
            });
            response.roles = roles;
            await this.accountRepository.save(response);
        }
        if ((0, utils_1.isSPAdmin)(req.user)) {
            const branch = await this.branchRepository
                .createQueryBuilder('tb_branch')
                .where({ id: updateAccountDto.branch_id })
                .getOne();
            response.branch = branch;
            await this.accountRepository.save(response);
        }
        await this.accountRepository
            .createQueryBuilder('tb_account')
            .where({ id: id })
            .update(entities_2.Account)
            .set({
            telephone: updateAccountDto.telephone,
            fullname: updateAccountDto.fullname,
            description: updateAccountDto.description,
            status: updateAccountDto.status,
            full_address: updateAccountDto.full_address,
            sex: updateAccountDto.sex,
            media: media,
            ccid: updateAccountDto.ccid
        })
            .execute();
        return { message: 'Update account success' };
    }
    async remove(id) {
        const response = await this.accountRepository
            .createQueryBuilder('tb_account')
            .leftJoinAndSelect('tb_account.roles', 'tb_role')
            .where({ id: id })
            .getOne();
        if (!response) {
            throw new common_1.NotFoundException(`Cannot not found`);
        }
        if (response && response.roles.map(role => role.code).includes((0, utils_1.encode)(common_2.key.SUPER_ADMIN))) {
            throw new common_1.ForbiddenException('Cannot delete this account');
        }
        await this.accountRepository
            .createQueryBuilder('tb_account')
            .where({ id: id })
            .update(entities_2.Account)
            .set({ deleted: true })
            .execute();
        return {
            message: 'Delete account success'
        };
    }
};
AccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_3.Branch)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_2.Account)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.Role)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_4.Media)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map