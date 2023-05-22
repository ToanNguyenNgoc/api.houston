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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("./entities");
const bluebird_1 = require("bluebird");
const permission_entity_1 = require("../permission/entities/permission.entity");
const utils_1 = require("../../utils");
const common_2 = require("../../common");
let RoleService = class RoleService {
    constructor(roleRepository, permissionRep) {
        this.roleRepository = roleRepository;
        this.permissionRep = permissionRep;
    }
    async fillAll(query) {
        const is_super_admin = (0, utils_1.convertBoolean)(query.is_super_admin);
        try {
            const response = await this.roleRepository
                .createQueryBuilder('tb_role')
                .leftJoinAndSelect('tb_role.permissions', 'tb_permission')
                .where('tb_role.deleted =:deleted', { deleted: false })
                .where(is_super_admin === false ? { code: (0, typeorm_2.Not)((0, utils_1.encode)('Super Admin')) } : {})
                .getMany();
            return { data: response };
        }
        catch (error) {
            throw new common_1.BadGatewayException(`${error}`);
        }
    }
    async findOne(id) {
        const response = await this.roleRepository
            .createQueryBuilder('tb_role')
            .leftJoinAndSelect('tb_role.permissions', 'tb_permission')
            .where('tb_role.id=:id', { id: id })
            .getOne();
        if (!response)
            throw new common_1.NotFoundException(`Can not found`);
        return { data: response };
    }
    async create(body) {
        var _a;
        try {
            const role = new entities_1.Role();
            role.title = body.title;
            role.description = body.description;
            role.code = (0, utils_1.encode)(body.title);
            const permissions = await bluebird_1.Promise.map((_a = body.permissions) !== null && _a !== void 0 ? _a : [], async (id) => {
                const item = await this.permissionRep
                    .findOneBy({ id: id });
                return item;
            });
            role.permissions = permissions;
            const response = await this.roleRepository.save(role);
            return response;
        }
        catch (error) {
            throw new common_1.BadGatewayException(`${error}`);
        }
    }
    async update(id, body) {
        var _a;
        try {
            const role = await this.roleRepository.findOneBy({ id: id });
            if ((role === null || role === void 0 ? void 0 : role.code) === (0, utils_1.encode)(common_2.key.SUPER_ADMIN)) {
                const response = await this.roleRepository
                    .createQueryBuilder('role')
                    .update(entities_1.Role)
                    .set({
                    description: body.description
                })
                    .execute();
                return response;
            }
            const permissions = await bluebird_1.Promise.map((_a = body.permissions) !== null && _a !== void 0 ? _a : [], async (permission_id) => {
                return await this.permissionRep.findOneBy({ id: permission_id });
            });
            if (body.permissions)
                role.permissions = permissions;
            await this.roleRepository.save(role);
            const response = await this.roleRepository
                .createQueryBuilder()
                .update(entities_1.Role)
                .set({
                title: body.title,
                description: body.description,
                status: body.status
            })
                .where("id = :id", { id: id })
                .execute();
            return response;
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
};
RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Role)),
    __param(1, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map