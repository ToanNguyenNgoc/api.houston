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
exports.CustomerOriginalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("./entities");
let CustomerOriginalService = class CustomerOriginalService {
    constructor(cusOriRepository) {
        this.cusOriRepository = cusOriRepository;
    }
    async create(body) {
        try {
            const original = new entities_1.CustomerOriginal();
            original.name = body.name;
            const response = await this.cusOriRepository.save(body);
            return { data: response };
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
    async findAll() {
        try {
            const response = await this.cusOriRepository
                .createQueryBuilder('tb_customer_original')
                .where({ deleted: false })
                .getManyAndCount();
            return { data: response[0], total: response[1] };
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
    async findOne(id) {
        const response = await this.cusOriRepository
            .createQueryBuilder('tb_customer_original')
            .where({ id: id, deleted: false })
            .getOne();
        if (!response)
            throw new common_1.NotFoundException('Cannot found');
        return { data: response };
    }
    async update(id, body) {
        const response = await this.cusOriRepository
            .createQueryBuilder('tb_customer_original')
            .where({ id: id, deleted: false })
            .getOne();
        if (!response)
            throw new common_1.NotFoundException('Cannot found');
        await this.cusOriRepository
            .createQueryBuilder('tb_customer_original')
            .update(entities_1.CustomerOriginal)
            .set({
            name: body.name,
            status: body.status
        })
            .where({ id: id, deleted: false })
            .execute();
        return { message: 'Update success' };
    }
};
CustomerOriginalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.CustomerOriginal)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomerOriginalService);
exports.CustomerOriginalService = CustomerOriginalService;
//# sourceMappingURL=customer_original.service.js.map