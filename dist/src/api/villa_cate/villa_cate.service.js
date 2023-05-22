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
exports.VillaCateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const typeorm_2 = require("typeorm");
const entities_2 = require("../branches/entities");
const entities_3 = require("../media/entities");
const utils_1 = require("../../utils");
const common_2 = require("../../common");
let VillaCateService = class VillaCateService {
    constructor(villaCateRe, branchRe, mediaRe) {
        this.villaCateRe = villaCateRe;
        this.branchRe = branchRe;
        this.mediaRe = mediaRe;
    }
    async create(body) {
        try {
            const branch = await this.branchRe
                .createQueryBuilder('tb_branch')
                .where({ id: body.branch_id, status: true }).getOne();
            if (!branch)
                throw new common_1.NotFoundException('Cannot found branch');
            const media = await this.mediaRe
                .createQueryBuilder('tb_media')
                .where({ id: body.media_id })
                .getOne();
            const villaCate = new entities_1.VillaCate();
            villaCate.villa_cate_name = body.villa_cate_name;
            villaCate.description = body.description;
            villaCate.branch = branch;
            villaCate.villa_cate_image = media;
            const response = await this.villaCateRe.save(villaCate);
            return { data: response };
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
    async findAll(query) {
        var _a, _b;
        const page = parseInt(`${(_a = query.page) !== null && _a !== void 0 ? _a : 1}`);
        const limit = parseInt(`${(_b = query.limit) !== null && _b !== void 0 ? _b : 15}`);
        const status = (0, utils_1.convertBoolean)(query.status);
        const branch_id = query.branch_id;
        const response = await this.villaCateRe
            .createQueryBuilder('tb_villa_cate')
            .where({ deleted: false })
            .leftJoin('tb_villa_cate.villa_cate_image', 'tb_media')
            .addSelect(['tb_media.original_url'])
            .leftJoinAndSelect('tb_villa_cate.branch', 'tb_branch')
            .andWhere(new typeorm_2.Brackets((qb) => qb.where(branch_id ? 'tb_branch.id =:id' : '', branch_id ? { id: branch_id } : {})))
            .andWhere(new typeorm_2.Brackets((qb) => qb.where(query.status ? { status: status } : {})))
            .andWhere(new typeorm_2.Brackets((qb) => {
            var _a;
            qb.where({ villa_cate_name: (0, typeorm_2.Like)(`%${(_a = query.search) !== null && _a !== void 0 ? _a : ''}%`) });
        }))
            .orderBy('tb_villa_cate.created_at', 'DESC')
            .skip((page * limit) - limit)
            .limit(limit)
            .getManyAndCount();
        return (0, common_2.transformResponse)(response[0], response[1], page, limit);
    }
    async findOne(id) {
        const response = await this.villaCateRe
            .createQueryBuilder('tb_villa_cate')
            .where({ id: id })
            .leftJoin('tb_villa_cate.villa_cate_image', 'tb_media')
            .addSelect(['tb_media.original_url'])
            .leftJoinAndSelect('tb_villa_cate.branch', 'tb_branch')
            .getOne();
        if (!response)
            throw new common_1.NotFoundException('Cannot found');
        return { data: response };
    }
    async update(id, body) {
        try {
            const responseBranch = await this.branchRe.
                createQueryBuilder('tb_branch').
                where({ id: body.branch_id, deleted: false })
                .getOne();
            const image = await this.mediaRe.
                createQueryBuilder('tb_media').
                where({ id: body.media_id })
                .getOne();
            await this.branchRe
                .createQueryBuilder('tb_villa_cate')
                .update(entities_1.VillaCate)
                .where({ id: id })
                .set({
                villa_cate_name: body.villa_cate_name,
                description: body.description,
                villa_cate_image: image ? image : undefined,
                branch: responseBranch ? responseBranch : undefined,
                status: body.status
            })
                .execute();
            return { message: 'Update success' };
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
    async remove(id) {
        try {
            await this.villaCateRe
                .createQueryBuilder('tb_villa_cate')
                .where({ id: id })
                .update(entities_1.VillaCate)
                .set({ deleted: true })
                .execute();
            return { message: 'Deleted success' };
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
};
VillaCateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.VillaCate)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_2.Branch)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_3.Media)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], VillaCateService);
exports.VillaCateService = VillaCateService;
//# sourceMappingURL=villa_cate.service.js.map