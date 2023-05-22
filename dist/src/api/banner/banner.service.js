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
exports.BannerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("./entities");
const entities_2 = require("../media/entities");
const common_2 = require("../../common");
let BannerService = class BannerService {
    constructor(bannerRe, mediaRe) {
        this.bannerRe = bannerRe;
        this.mediaRe = mediaRe;
    }
    async create(body) {
        try {
            const media = await this.mediaRe.createQueryBuilder('tb_media').where({ id: body.media_id }).getOne();
            const banner = new entities_1.Banner();
            banner.name = body.name;
            banner.media = media;
            banner.type = body.type;
            banner.content = body.content;
            banner.url = body.url;
            banner.original_id = body.original_id;
            const response = await this.bannerRe.save(banner);
            return { data: response };
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
    async findAll(query) {
        try {
            const page = parseInt(`${query.page || 1}`);
            const limit = parseInt(`${query.limit || 15}`);
            const queryBuilder = this.bannerRe
                .createQueryBuilder('tb_banner')
                .where({ status: true, deleted: false })
                .leftJoin('tb_banner.media', 'tb_media')
                .addSelect(['tb_media.original_url'])
                .orderBy('tb_banner.created_at', 'DESC');
            if (query.type) {
                queryBuilder.andWhere(new typeorm_2.Brackets(qb => qb.where('tb_banner.type =:type', { type: query.type })));
            }
            const [data, total] = await queryBuilder.offset((page * limit) - limit).limit(limit).getManyAndCount();
            return (0, common_2.transformResponse)(data, total, page, limit);
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
    async findOne(id) {
        try {
            const response = await this.bannerRe
                .createQueryBuilder('tb_banner')
                .where({ status: true, deleted: false, id: id })
                .leftJoin('tb_banner.media', 'tb_media')
                .addSelect(['tb_media.original_url'])
                .getOne();
            if (!response)
                throw new common_1.NotFoundException('Cannot found');
            return { data: response };
        }
        catch (error) {
            throw new common_1.NotFoundException('Cannot found');
        }
    }
    async update(id, body) {
        var _a;
        try {
            const media = body.media_id ?
                await this.mediaRe.createQueryBuilder('tb_media').where({ id: body.media_id }).getOne() : undefined;
            const banner = await this.bannerRe.createQueryBuilder('tb_banner')
                .where({ status: true, deleted: false, id: id })
                .leftJoinAndSelect('tb_banner.media', 'tb_media').getOne();
            if (!banner)
                throw new common_1.NotFoundException('Cannot found');
            await this.bannerRe.createQueryBuilder('tb_banner')
                .update(entities_1.Banner)
                .where({ id: id })
                .set({
                name: body.name,
                media: media,
                type: body.type,
                content: body.content,
                url: body.url,
                original_id: body.original_id,
                status: body.status
            })
                .execute();
            return {
                data: Object.assign(Object.assign(Object.assign({}, banner), body), { media: { original_url: body.media_id ? media.original_url : (_a = banner.media) === null || _a === void 0 ? void 0 : _a.original_url } })
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
    async remove(id) {
        try {
            await this.bannerRe.createQueryBuilder('tb_banner')
                .update(entities_1.Banner)
                .where({ id: id, deleted: false, status: true })
                .set({ deleted: true })
                .execute();
            return { message: 'Delete success' };
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
};
BannerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Banner)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_2.Media)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BannerService);
exports.BannerService = BannerService;
//# sourceMappingURL=banner.service.js.map