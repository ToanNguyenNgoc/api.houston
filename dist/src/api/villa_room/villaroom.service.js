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
exports.VillaRoomService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const entities_1 = require("./entities");
const typeorm_2 = require("@nestjs/typeorm");
const entities_2 = require("../media/entities");
const entities_3 = require("../villa/entities");
const utils_1 = require("../../utils");
const common_2 = require("../../common");
let VillaRoomService = class VillaRoomService {
    constructor(roomRe, mediaRe, villaRe) {
        this.roomRe = roomRe;
        this.mediaRe = mediaRe;
        this.villaRe = villaRe;
    }
    async create(body) {
        const villa = await this.villaRe.createQueryBuilder('tb_villa')
            .where({ id: body.villa_id, deleted: false })
            .getOne();
        if (!villa)
            throw new common_1.NotFoundException('Cannot found villa');
        const room = new entities_1.VillaRoom();
        room.name = body.name;
        room.description = body.description;
        room.thumbnail = body.media_id ? await this.mediaRe
            .createQueryBuilder('tb_media')
            .where({ id: body.media_id }).getOne() : null;
        room.villa = villa;
        const response = await this.roomRe.save(room);
        return { data: response };
    }
    async findAll(qr) {
        try {
            const page = parseInt(`${qr.page || 1}`);
            const limit = parseInt(`${qr.limit || 15}`);
            const status = (0, utils_1.convertBoolean)(qr.status);
            const qb = this.roomRe
                .createQueryBuilder('tb_villa_room')
                .leftJoin('tb_villa_room.villa', 'tb_villa')
                .addSelect(['tb_villa.id', 'tb_villa.name'])
                .leftJoin('tb_villa_room.thumbnail', 'tb_media')
                .addSelect(['tb_media.original_url'])
                .where({ deleted: false, villa: qr.villa_id })
                .andWhere(new typeorm_1.Brackets(qb => qb.where(qr.status ? { status: status } : {})))
                .skip((page * limit) - limit)
                .limit(limit);
            const [response, total] = await qb.getManyAndCount();
            return (0, common_2.transformResponse)(response, total, page, limit);
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
    async findOne(id) {
        try {
            const qb = this.roomRe
                .createQueryBuilder('tb_villa_room')
                .leftJoin('tb_villa_room.villa', 'tb_villa')
                .addSelect(['tb_villa.id', 'tb_villa.name'])
                .leftJoin('tb_villa_room.thumbnail', 'tb_media')
                .addSelect(['tb_media.original_url'])
                .where({ deleted: false, id: id });
            const response = await qb.getOne();
            if (!response)
                throw new common_1.NotFoundException('Cannot found');
            return { data: response };
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
    async update(id, body) {
        try {
            const villa = await this.villaRe
                .createQueryBuilder('tb_villa')
                .where({ id: body.villa_id, deleted: false })
                .getOne();
            await this.villaRe.createQueryBuilder('tb_villa_room')
                .where({ id: id, deleted: false })
                .update(entities_1.VillaRoom)
                .set({
                name: body.name,
                description: body.description,
                thumbnail: body.media_id ? await this.mediaRe
                    .createQueryBuilder('tb_media')
                    .where({ id: body.media_id })
                    .getOne() : undefined,
                villa: villa ? villa : undefined,
                status: body.status
            })
                .execute();
            return { message: 'Update success' };
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
    async delete(id) {
        await this.roomRe.createQueryBuilder('tb_villa_room')
            .where({ id: id })
            .update(entities_1.VillaRoom)
            .set({ deleted: true })
            .execute();
        return { message: 'Deleted success' };
    }
};
VillaRoomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(entities_1.VillaRoom)),
    __param(1, (0, typeorm_2.InjectRepository)(entities_2.Media)),
    __param(2, (0, typeorm_2.InjectRepository)(entities_3.Villa)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], VillaRoomService);
exports.VillaRoomService = VillaRoomService;
//# sourceMappingURL=villaroom.service.js.map