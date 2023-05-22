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
exports.PermissionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const permission_entity_1 = require("./entities/permission.entity");
let PermissionService = class PermissionService {
    constructor(permissionRepository) {
        this.permissionRepository = permissionRepository;
    }
    async create(createPermissionDto) {
        try {
            const paths = createPermissionDto
                .permission_path
                .map(path => {
                const path_item = [
                    `api.${path}.GET`,
                    `api.${path}.POST`,
                    `api.${path}.:id.GET`,
                    `api.${path}.:id.PUT`,
                    `api.${path}.:id.DELETE`,
                ];
                return path_item;
            })
                .flat();
            const values = paths.map(i => {
                return { permission_path: i };
            });
            await this.permissionRepository
                .createQueryBuilder('tb_permission')
                .insert()
                .into(permission_entity_1.Permission)
                .values(values)
                .execute();
            return { message: 'Create success' };
        }
        catch (error) {
            throw new common_1.BadRequestException('An error');
        }
    }
    async findAll() {
        const response = await this
            .permissionRepository
            .createQueryBuilder('tb_permission')
            .getManyAndCount();
        return {
            data: response[0],
            total: response[1]
        };
    }
    findOne(id) {
        return `This action returns a #${id} permission`;
    }
};
PermissionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PermissionService);
exports.PermissionService = PermissionService;
//# sourceMappingURL=permission.service.js.map