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
exports.ProvinceService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const typeorm_2 = require("typeorm");
const redis_1 = require("../../redis");
let ProvinceService = class ProvinceService {
    constructor(provinceRe, districtRe, wardRe, cache) {
        this.provinceRe = provinceRe;
        this.districtRe = districtRe;
        this.wardRe = wardRe;
        this.cache = cache;
    }
    async findAll() {
        if (await this.cache.get('PROVINCES')) {
            return { data: await this.cache.get('PROVINCES') };
        }
        const response = await this.provinceRe
            .createQueryBuilder('tb_province')
            .getManyAndCount();
        await this.cache.set('PROVINCES', response[0]);
        if (response[1] === 0) {
            const provincesApi = await axios_1.default.get('https://provinces.open-api.vn/api/?depth=1');
            await this.provinceRe
                .createQueryBuilder('tb_branch')
                .insert()
                .into(entities_1.Province)
                .values(provincesApi.data)
                .execute();
            return { data: provincesApi.data };
        }
        return { data: response[0] };
    }
    async findDistrictsByProvince(id) {
        const districtsCount = await this.districtRe
            .createQueryBuilder('tb_districts')
            .getCount();
        if (districtsCount === 0) {
            const provincesApi = await axios_1.default.get('https://provinces.open-api.vn/api/?depth=2');
            const districts = provincesApi.data.map((item) => item.districts).flat();
            await this.districtRe.createQueryBuilder('tb_district')
                .insert()
                .into(entities_1.District)
                .values(districts)
                .execute();
            return { data: districts.filter((item) => item.province_code == id) };
        }
        const response = await this.districtRe.createQueryBuilder('tb_district')
            .where({ province_code: id })
            .getMany();
        return { data: response };
    }
    async findWards(district_code) {
        const wardCount = await this.wardRe.createQueryBuilder('tb_ward').getCount();
        if (wardCount === 0) {
            const wardsApi = await axios_1.default.get('https://provinces.open-api.vn/api/w/');
            await this.wardRe.createQueryBuilder('tb_ward')
                .insert()
                .into(entities_1.Ward)
                .values(wardsApi.data)
                .execute();
            return { data: wardsApi.data };
        }
        return {
            data: await this.wardRe
                .createQueryBuilder('tb_ward')
                .where({ district_code: district_code })
                .getMany()
        };
    }
    async getPlaces(query) {
        var _a, _b, _c, _d, _e;
        try {
            if (query.search_type === 'address') {
                const response = await axios_1.default
                    .get(`${process.env.MAP_BOX_API_URL}/${query.search}.json?access_token=${process.env.MAP_BOX_ACCESS_TOKEN}&language=vi&country=vn`).then(res => res.data);
                const data = (_a = response === null || response === void 0 ? void 0 : response.features) === null || _a === void 0 ? void 0 : _a.map((f) => {
                    var _a, _b, _c, _d;
                    return Object.assign(Object.assign({}, f), { center: (_a = f.center) === null || _a === void 0 ? void 0 : _a.reverse(), geometry: { type: (_b = f.geometry) === null || _b === void 0 ? void 0 : _b.type, coordinates: (_d = (_c = f.geometry) === null || _c === void 0 ? void 0 : _c.coordinates) === null || _d === void 0 ? void 0 : _d.reverse() } });
                });
                return { data: data };
            }
            if (query.search_type === 'coord') {
                const coords = (_d = (_c = (_b = query.search) === null || _b === void 0 ? void 0 : _b.split(',')) === null || _c === void 0 ? void 0 : _c.reverse()) === null || _d === void 0 ? void 0 : _d.join(',');
                const response = await axios_1.default
                    .get(`${process.env.MAP_BOX_API_URL}/${coords}.json?access_token=${process.env.MAP_BOX_ACCESS_TOKEN}&language=vi&country=vn`).then(res => res.data);
                const data = (_e = response === null || response === void 0 ? void 0 : response.features) === null || _e === void 0 ? void 0 : _e.map((f) => {
                    var _a, _b, _c, _d, _e;
                    const place_name_vi_trans = (_a = f.context) === null || _a === void 0 ? void 0 : _a.map(i => Number.isNaN(parseInt(i.text_vi)) ? i.text_vi : '').filter(String).join(', ');
                    return Object.assign(Object.assign({}, f), { place_name_vi_trans: place_name_vi_trans, center: (_b = f.center) === null || _b === void 0 ? void 0 : _b.reverse(), geometry: { type: (_c = f.geometry) === null || _c === void 0 ? void 0 : _c.type, coordinates: (_e = (_d = f.geometry) === null || _d === void 0 ? void 0 : _d.coordinates) === null || _e === void 0 ? void 0 : _e.reverse() } });
                });
                return { data: data };
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
};
ProvinceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Province)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.District)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.Ward)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        redis_1.RedisCacheService])
], ProvinceService);
exports.ProvinceService = ProvinceService;
//# sourceMappingURL=province.service.js.map