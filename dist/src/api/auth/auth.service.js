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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../account/entities");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const entities_2 = require("../branches/entities");
const bluebird_1 = require("bluebird");
const entities_3 = require("../media/entities");
const mailer_1 = require("@nestjs-modules/mailer");
const entities_4 = require("../otp/entities");
const moment = require("moment");
const utils_1 = require("../../utils");
let AuthService = class AuthService {
    constructor(accountRepository, jwtService, branchRepository, mediaRepository, otpRepository, mailerService) {
        this.accountRepository = accountRepository;
        this.jwtService = jwtService;
        this.branchRepository = branchRepository;
        this.mediaRepository = mediaRepository;
        this.otpRepository = otpRepository;
        this.mailerService = mailerService;
    }
    async onLogin(body) {
        var _a, _b;
        const responseUser = await this.accountRepository
            .createQueryBuilder('tb_account')
            .leftJoinAndSelect('tb_account.branch', 'tb_branch')
            .where({ email: body.email })
            .getOne();
        if (!responseUser)
            throw new common_1.NotFoundException(`Can not find account with email:${body.email}`);
        if (!responseUser.status)
            throw new common_1.ForbiddenException('Account has been blocked!');
        if (responseUser.deleted)
            throw new common_1.NotFoundException('Account has been deleted!');
        const passwordMatched = await bcrypt.compare(body.password, responseUser.password);
        if (!passwordMatched)
            throw new common_1.ForbiddenException('Password is wrong!');
        const token = await this.generateToken(responseUser.id, responseUser.email, (_b = (_a = responseUser.branch) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : 0);
        delete responseUser.password;
        return {
            data: Object.assign(Object.assign({}, responseUser), { token: token })
        };
    }
    async generateToken(id, email, branch_id) {
        const code = JSON.stringify({ id: id, email: email, type: 'AUTHENTICATE' });
        return this.jwtService.signAsync({ code: (0, utils_1.aesEncode)(code) }, {
            expiresIn: '10d',
            secret: '141'
        });
    }
    async onProfile(req) {
        try {
            const { user } = req;
            const response = await this.accountRepository
                .createQueryBuilder('tb_account')
                .where({ id: user.id })
                .leftJoinAndSelect('tb_account.branch', 'tb_branch')
                .leftJoin('tb_account.media', 'tb_media')
                .addSelect(['tb_media.original_url'])
                .getOne();
            delete response.password;
            return { data: response };
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
    async onUpdateProfile(req, body) {
        const id = req.user.id;
        const alreadyTelephone = await this.accountRepository
            .createQueryBuilder('tb_account')
            .where({ telephone: body.telephone })
            .getOne();
        if (alreadyTelephone) {
            throw new common_1.ForbiddenException(`Telephone belong to another account`);
        }
        const media = await this.mediaRepository
            .createQueryBuilder('tb_media')
            .where({ id: body.mediaId })
            .getOne();
        await this.accountRepository
            .createQueryBuilder('tb_account')
            .update(entities_1.Account)
            .set({
            fullname: body.fullname,
            telephone: body.telephone,
            description: body.description,
            full_address: body.full_address,
            sex: body.sex,
            ccid: body.ccid,
            media: media
        })
            .where({ id: id })
            .execute();
        const newProfile = Object.assign(Object.assign({}, req.user), body);
        delete newProfile.password;
        delete newProfile.roles;
        return { data: newProfile };
    }
    async findAllRoleByUser(req) {
        const user = req.user;
        const account = await this.accountRepository
            .createQueryBuilder('tb_account')
            .where({ id: user.id })
            .leftJoinAndSelect('tb_account.roles', 'tb_role')
            .leftJoinAndSelect('tb_role.permissions', 'tb_permission')
            .getOne();
        const roles = await bluebird_1.Promise.filter(account.roles, async (role) => (role.status && !role.deleted));
        return { data: roles };
    }
    async findBranchByUser(req) {
        var _a;
        const user = req.user;
        if (user.type !== "AUTHENTICATE")
            throw new common_1.UnauthorizedException();
        const branch_id = (_a = req.user.branch) === null || _a === void 0 ? void 0 : _a.id;
        const response = await this.branchRepository
            .createQueryBuilder('tb_branch')
            .where({ deleted: false })
            .where(branch_id ? { id: branch_id } : {})
            .getManyAndCount();
        return {
            data: response[0],
            total: response[1]
        };
    }
    async forgot(req, body) {
        const responseEmail = await this.accountRepository.createQueryBuilder('tb_account')
            .where({ email: body.email }).getOne();
        if (!responseEmail) {
            throw new common_1.NotFoundException('This email is not exist');
        }
        if (!body.code && !body.new_password) {
            const code = (0, utils_1.randomCode)(6).trim();
            await this.mailerService.sendMail({
                to: body.email,
                from: process.env.MAILER_ORIGINAL,
                subject: 'Houston - Forgot Password ✔',
                template: 'otp',
                context: {
                    data: {
                        email: body.email,
                        code: code
                    }
                }
            });
            const otp = new entities_4.OtpEntity();
            otp.email = body.email;
            otp.code = code;
            await this.otpRepository.save(otp);
            return { message: 'Send code success' };
        }
        else {
            const resOtp = await this.otpRepository
                .createQueryBuilder('tb_otp')
                .where({ email: body.email, code: body.code })
                .getOne();
            if (!resOtp) {
                throw new common_1.NotFoundException('Code is invalid !');
            }
            const otpTime = moment(resOtp === null || resOtp === void 0 ? void 0 : resOtp.created_at).format('YYYYMMDDHHmm');
            const currentTime = moment().format('YYYYMMDDHHmm');
            if (parseInt(currentTime) - parseInt(otpTime) > 2) {
                await this.otpRepository
                    .createQueryBuilder('tb_otp')
                    .delete()
                    .from(entities_4.OtpEntity)
                    .where({ email: body.email, code: body.code })
                    .execute();
                throw new common_1.BadRequestException('This code is expired');
            }
            const salt = await bcrypt.genSalt(10);
            const password_hashed = await bcrypt.hash(body.new_password, salt);
            await this.accountRepository
                .createQueryBuilder('tb_account')
                .update(entities_1.Account)
                .where({ email: body.email })
                .set({ password: password_hashed })
                .execute();
            await this.otpRepository
                .createQueryBuilder('tb_otp')
                .delete()
                .from(entities_4.OtpEntity)
                .where({ email: body.email, code: body.code })
                .execute();
            return { message: 'Update password success' };
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Account)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_2.Branch)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_3.Media)),
    __param(4, (0, typeorm_1.InjectRepository)(entities_4.OtpEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mailer_1.MailerService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map