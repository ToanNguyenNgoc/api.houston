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
exports.BranchesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("./entities");
const utils_1 = require("../../utils");
const common_2 = require("../../common");
const entities_2 = require("../province/entities");
const entities_3 = require("../media/entities");
const entities_4 = require("../villa/entities");
const entities_5 = require("../villa_gallery/entities");
let BranchesService = class BranchesService {
    constructor(branchRepository, mediaRepository, provinceRepository, districtRepository, wardRepository, villaRepository, villaGalleryRe) {
        this.branchRepository = branchRepository;
        this.mediaRepository = mediaRepository;
        this.provinceRepository = provinceRepository;
        this.districtRepository = districtRepository;
        this.wardRepository = wardRepository;
        this.villaRepository = villaRepository;
        this.villaGalleryRe = villaGalleryRe;
    }
    async create(body) {
        const province = await this.provinceRepository
            .createQueryBuilder('tb_province')
            .where({ code: body.province_code })
            .getOne();
        if (!province)
            throw new common_1.NotFoundException('Cannot found province');
        const district = await this.districtRepository
            .createQueryBuilder('tb_district')
            .where({ code: body.district_code })
            .getOne();
        if (!province)
            throw new common_1.NotFoundException('Cannot found district');
        const ward = await this.wardRepository
            .createQueryBuilder('tb_ward')
            .where({ code: body.ward_code })
            .getOne();
        if (!province)
            throw new common_1.NotFoundException('Cannot found ward');
        const media = await this.mediaRepository
            .createQueryBuilder('tb_media')
            .where({ id: body.media_id }).getOne();
        const branch = new entities_1.Branch();
        branch.name = body.name;
        branch.image = media;
        branch.content = body.content;
        branch.description = body.description;
        branch.address = body.address;
        branch.province = province;
        branch.district = district;
        branch.ward = ward;
        branch.latitude = body.lat;
        branch.longitude = body.lng;
        const response = await this.branchRepository.save(branch);
        return { data: response };
    }
    async findAll(query) {
        var _a, _b;
        const page = parseInt(`${(_a = query.page) !== null && _a !== void 0 ? _a : 1}`);
        const limit = parseInt(`${(_b = query.limit) !== null && _b !== void 0 ? _b : 15}`);
        const response = await this.branchRepository
            .createQueryBuilder('tb_branch')
            .leftJoin('tb_branch.image', 'tb_media')
            .addSelect(['tb_media.original_url'])
            .leftJoinAndSelect('tb_branch.ward', 'tb_ward')
            .leftJoinAndSelect('tb_branch.district', 'tb_district')
            .leftJoinAndSelect('tb_branch.province', 'tb_province')
            .where(query.status ? { status: (0, utils_1.convertBoolean)(query.status) } : {})
            .andWhere({ deleted: false })
            .andWhere(new typeorm_2.Brackets((qb) => qb.where(query.province_code ? 'tb_province.code =:code' : '', query.province_code ? { code: query.province_code } : {})))
            .andWhere(new typeorm_2.Brackets((qb) => qb.where(query.district_code ? 'tb_district.code =:code' : '', query.district_code ? { code: query.district_code } : {})))
            .andWhere(new typeorm_2.Brackets((qb) => qb.where(query.ward_code ? 'tb_ward.code =:code' : '', query.ward_code ? { code: query.ward_code } : {})))
            .andWhere(new typeorm_2.Brackets((qb) => {
            var _a;
            qb.where({ name: (0, typeorm_2.Like)(`%${(_a = query.search) !== null && _a !== void 0 ? _a : ''}%`) });
        }))
            .offset((page * limit) - limit)
            .limit(limit)
            .getManyAndCount();
        return (0, common_2.transformResponse)(response[0], response[1], page, limit);
    }
    async findOne(id) {
        try {
            const response = await this.branchRepository
                .createQueryBuilder('tb_branch')
                .where({ id: id })
                .andWhere({ deleted: false })
                .andWhere({ status: true })
                .leftJoin('tb_branch.image', 'tb_media')
                .addSelect(['tb_media.original_url'])
                .leftJoinAndSelect('tb_branch.ward', 'tb_ward')
                .leftJoinAndSelect('tb_branch.district', 'tb_district')
                .leftJoinAndSelect('tb_branch.province', 'tb_province')
                .getOne();
            if (!response) {
                throw new common_1.NotFoundException('Can not found');
            }
            return { data: response };
        }
        catch (error) {
            throw new common_1.NotFoundException('Can not found');
        }
    }
    async update(id, body) {
        let province;
        if (body.province_code) {
            const provinceResponse = await this.provinceRepository
                .createQueryBuilder('tb_province')
                .where({ code: body.province_code })
                .getOne();
            if (!provinceResponse)
                throw new common_1.NotFoundException('Cannot found province');
            province = provinceResponse;
        }
        let district;
        if (body.district_code) {
            const districtResponse = await this.districtRepository
                .createQueryBuilder('tb_district')
                .where({ code: body.district_code })
                .getOne();
            if (!districtResponse)
                throw new common_1.NotFoundException('Cannot found district');
            district = districtResponse;
        }
        let ward;
        if (body.ward_code) {
            const wardResponse = await this.wardRepository
                .createQueryBuilder('tb_ward')
                .where({ code: body.ward_code })
                .getOne();
            if (!wardResponse)
                throw new common_1.NotFoundException('Cannot found ward');
            ward = wardResponse;
        }
        const media = await this.mediaRepository
            .createQueryBuilder('tb_media')
            .where({ id: body.media_id }).getOne();
        await this.branchRepository.createQueryBuilder('tb_branch')
            .update(entities_1.Branch)
            .where({ id: id })
            .set({
            name: body.name,
            image: media ? media : undefined,
            content: body.content,
            description: body.description,
            status: body.status,
            address: body.address,
            province: province,
            district: district,
            ward: ward,
            latitude: body.lat,
            longitude: body.lng
        })
            .execute();
        return { message: 'Update success !' };
    }
    async remove(id) {
        await this.branchRepository
            .createQueryBuilder('tb_branch')
            .update(entities_1.Branch)
            .where({ id: id })
            .set({ deleted: true })
            .execute();
        return { message: 'Delete success !' };
    }
    async findGalleriesById(id) {
        try {
            const branchMedia = await this.branchRepository
                .createQueryBuilder('tb_branch')
                .where({ id: id, status: true, deleted: false })
                .select(['tb_branch.id'])
                .leftJoinAndSelect('tb_branch.image', 'tb_media')
                .getOne();
            const villas = await this.villaRepository
                .createQueryBuilder('tb_villa')
                .where({ status: true, deleted: false })
                .leftJoinAndSelect('tb_villa.branch', 'tb_branch')
                .leftJoinAndSelect('tb_villa.thumbnail', 'tb_media')
                .andWhere(new typeorm_2.Brackets((qb) => qb.where('tb_branch.id =:branch_id', { branch_id: id })))
                .getMany();
            const villas_id = villas.map(i => i.id);
            let galleries = [];
            if (villas_id.length > 0) {
                const villasGalleries = await this.villaGalleryRe
                    .createQueryBuilder('tb_villa_gallery')
                    .leftJoin('tb_villa_gallery.villa', 'tb_villa')
                    .addSelect('tb_villa.id')
                    .where('tb_villa.id IN (:...villas_id)', { villas_id: villas_id })
                    .leftJoinAndSelect('tb_villa_gallery.image', 'tb_media')
                    .getMany();
                galleries = villasGalleries;
            }
            const data = [
                branchMedia,
                ...villas.map(i => {
                    return {
                        id: i.id,
                        type: 'IMAGE_VILLA',
                        image: i.thumbnail
                    };
                }).filter(i => i.image !== null),
                ...galleries.map(i => { return Object.assign({ type: 'GALLERY_VILLA' }, i); })
            ];
            return { data: data.filter(Boolean) };
        }
        catch (error) {
            throw new common_1.BadGatewayException(`${error}`);
        }
    }
};
BranchesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Branch)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_3.Media)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_2.Province)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_2.District)),
    __param(4, (0, typeorm_1.InjectRepository)(entities_2.Ward)),
    __param(5, (0, typeorm_1.InjectRepository)(entities_4.Villa)),
    __param(6, (0, typeorm_1.InjectRepository)(entities_5.VillaGallery)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BranchesService);
exports.BranchesService = BranchesService;
//# sourceMappingURL=branches.service.js.map