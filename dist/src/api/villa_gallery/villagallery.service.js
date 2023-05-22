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
exports.VillaGalleryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../villa/entities");
const typeorm_2 = require("typeorm");
const entities_2 = require("./entities");
const entities_3 = require("../media/entities");
const bluebird_1 = require("bluebird");
const common_2 = require("../../common");
let VillaGalleryService = class VillaGalleryService {
    constructor(villaRe, villaGalleryRe, mediaRe) {
        this.villaRe = villaRe;
        this.villaGalleryRe = villaGalleryRe;
        this.mediaRe = mediaRe;
    }
    async create(body) {
        const villa = await this.villaRe
            .createQueryBuilder('tb_villa')
            .where({ id: body.villa_id, deleted: false })
            .getOne();
        if (!villa)
            throw new common_1.NotFoundException(`Cannot found villa with id: ${body.villa_id}`);
        const medias = await bluebird_1.Promise.map(body.media_ids, async (media_id) => {
            const media = await this.mediaRe.createQueryBuilder('tb_media').where({ id: media_id }).getOne();
            return media;
        }).filter(Boolean);
        const values = medias.map(item => {
            return {
                villa: villa,
                image: item
            };
        });
        try {
            await this.villaGalleryRe.createQueryBuilder('tb_villa_gallery')
                .insert()
                .into(entities_2.VillaGallery)
                .values(values)
                .execute();
            return { data: values };
        }
        catch (error) {
            const oldMedias = await this.villaGalleryRe
                .createQueryBuilder('tb_villa_gallery')
                .where({ villa: body.villa_id })
                .getMany();
            const oldMediasId = oldMedias.map(i => i.id);
            await this.villaGalleryRe.createQueryBuilder('tb_villa_gallery')
                .delete()
                .from(entities_2.VillaGallery)
                .where('id In(:id)', {
                id: oldMediasId,
            })
                .execute();
            await this.villaGalleryRe.createQueryBuilder('tb_villa_gallery')
                .insert()
                .into(entities_2.VillaGallery)
                .values(values)
                .execute();
            return { data: values };
        }
    }
    async findAll(query) {
        var _a, _b;
        const page = parseInt(`${(_a = query.page) !== null && _a !== void 0 ? _a : 1}`);
        const limit = parseInt(`${(_b = query.limit) !== null && _b !== void 0 ? _b : 15}`);
        const response = await this.villaGalleryRe
            .createQueryBuilder('tb_villa_gallery')
            .where({ villa: query.villa_id })
            .leftJoinAndSelect('tb_villa_gallery.image', 'tb_media')
            .offset((page * limit) - limit)
            .limit(limit)
            .getManyAndCount();
        return (0, common_2.transformResponse)(response[0], response[1], page, limit);
    }
    async update(id, body) {
        return;
    }
};
VillaGalleryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Villa)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_2.VillaGallery)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_3.Media)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], VillaGalleryService);
exports.VillaGalleryService = VillaGalleryService;
//# sourceMappingURL=villagallery.service.js.map