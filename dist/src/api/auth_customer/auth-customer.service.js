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
exports.AuthCustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../customer/entities");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const entities_2 = require("../otp/entities");
const moment = require("moment");
const services_1 = require("../../services");
const entities_3 = require("../media/entities");
const utils_1 = require("../../utils");
const entities_4 = require("../refresh_token/entities");
const common_2 = require("../../common");
let AuthCustomerService = class AuthCustomerService {
    constructor(customerRe, otpRe, mediaRe, refreshTokenRe, jwtService, sendMailService) {
        this.customerRe = customerRe;
        this.otpRe = otpRe;
        this.mediaRe = mediaRe;
        this.refreshTokenRe = refreshTokenRe;
        this.jwtService = jwtService;
        this.sendMailService = sendMailService;
    }
    async login(req, body, res) {
        const response = await this.customerRe
            .createQueryBuilder('tb_customer')
            .leftJoin('tb_customer.avatar', 'tb_media')
            .addSelect(['tb_media.original_url'])
            .where({ email: body.email })
            .getOne();
        if (!response)
            throw new common_1.NotFoundException(`Can not find account with email:${body.email}`);
        if (!response.status)
            throw new common_1.ForbiddenException('Account has been blocked!');
        if (response.deleted)
            throw new common_1.NotFoundException('Account has been deleted!');
        const passwordMatched = await bcrypt.compare(body.password, response.password);
        if (!passwordMatched)
            throw new common_1.ForbiddenException('Password is wrong!');
        delete response.password;
        delete response.email_transfer;
        const { token, token_expired_at } = await this.generateToken(response.id, response.email);
        const refresh_token = await this.generateRefreshToken(req, response.id, response.email);
        res
            .cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: common_2.name.AGE_RE_TOKEN
        })
            .send({
            data: Object.assign(Object.assign({}, response), { token: token, token_expired_at: token_expired_at, refresh_token: refresh_token })
        });
    }
    async refreshToken(req, res) {
        const user = req.user;
        const { token, token_expired_at } = await this.generateToken(user.id, user.email);
        res
            .send({
            data: { token: token, token_expired_at: token_expired_at }
        });
    }
    async generateToken(id, email) {
        const code = JSON.stringify({ id: id, email: email, type: 'CUSTOMER' });
        const token = await this.jwtService.signAsync({ code: (0, utils_1.aesEncode)(code) }, {
            expiresIn: '2m',
            secret: process.env.JWT_KEY
        });
        const currentTime = new Date();
        const newTime = currentTime.getTime() + (60 * 1000 * 2) + (60 * 1000 * 60 * parseInt(process.env.TIME_ZONE_UTC));
        const token_expired_at = moment(newTime).format('YYYY-MM-DD HH:mm:ss');
        return { token, token_expired_at };
    }
    async generateRefreshToken(req, id, email) {
        const date = new Date();
        const refresh_token = await this.jwtService.signAsync({
            id: id,
            email: email,
            eTime: date.getTime(),
            type: 'CUSTOMER'
        }, {
            expiresIn: '15 days',
            secret: process.env.JWT_KEY
        });
        return refresh_token;
    }
    async profile(req) {
        try {
            const response = await this.customerRe
                .createQueryBuilder('tb_customer')
                .where({ id: req.user.id, email: req.user.email })
                .leftJoin('tb_customer.avatar', 'tb_media')
                .addSelect(['tb_media.original_url'])
                .leftJoin('tb_customer.customer_original', 'tb_customer_original')
                .addSelect(['tb_customer_original.name'])
                .getOne();
            if (!response)
                throw new common_1.UnauthorizedException('Unauthorized');
            delete response.password;
            delete response.email_transfer;
            return { data: response };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Unauthorized');
        }
    }
    async register(body) {
        var _a;
        if (body.email && !body.code) {
            const code = (0, utils_1.randomCode)(6).trim();
            await this.sendMailService.onSendMail({
                to: body.email,
                subject: 'Houston - Register ✔',
                template: 'otp',
                context: {
                    data: {
                        email: body.email,
                        code: code
                    }
                }
            });
            const otp = new entities_2.OtpEntity();
            otp.email = body.email, otp.code = code;
            await this.otpRe.save(otp);
            return { message: `An email send to ${body.email}` };
        }
        if (body.email && body.code) {
            const resOtp = await this.otpRe
                .createQueryBuilder('tb_otp')
                .where({ email: body.email, code: body.code })
                .getOne();
            if (!resOtp) {
                throw new common_1.NotFoundException('Code is invalid !');
            }
            const otpTime = moment(resOtp === null || resOtp === void 0 ? void 0 : resOtp.created_at).format('YYYYMMDDHHmm');
            const currentTime = moment().format('YYYYMMDDHHmm');
            if (parseInt(currentTime) - parseInt(otpTime) > 10) {
                await this.removeOtp(body.email, body.code);
                throw new common_1.BadRequestException('This code is expired');
            }
            if (body.dob && !(0, utils_1.isDateDobFormat)(body.dob)) {
                throw new common_1.BadRequestException('Date is must be format YYYY-MM-DD');
            }
            if (await this.customerRe
                .createQueryBuilder('tb_customer')
                .where({ email: body.email })
                .getOne()) {
                throw new common_1.BadRequestException('`Email belong to another account`');
            }
            if (await this.customerRe
                .createQueryBuilder('tb_customer')
                .where({ telephone: body.telephone })
                .getOne()) {
                throw new common_1.BadRequestException('`Telephone belong to another account`');
            }
            const newCustomer = new entities_1.Customer();
            newCustomer.email = body.email;
            newCustomer.password = body.password ? await (0, utils_1.generatePassword)(body.password) : undefined;
            newCustomer.fullname = (_a = body.fullname) !== null && _a !== void 0 ? _a : '';
            newCustomer.telephone = body.telephone;
            newCustomer.full_address = body.full_address;
            newCustomer.dob = body.dob;
            newCustomer.country = body.country;
            newCustomer.email_transfer = body.email;
            const response = await this.customerRe.save(newCustomer);
            delete response.password;
            delete response.email_transfer;
            await this.removeOtp(body.email, body.code);
            await this.sendMailService.onSendMail({
                to: body.email,
                subject: 'Welcome to Houston ✔',
                template: 'welcome',
                context: {
                    data: {
                        fullname: body.fullname || body.email,
                    }
                }
            });
            return { data: response };
        }
    }
    async updateProfile(req, body) {
        var _a, _b;
        const { user } = req;
        if (body.dob && !(0, utils_1.isDateDobFormat)(body.dob)) {
            throw new common_1.BadRequestException('Date is must be format YYYY-MM-DD');
        }
        if (await this.customerRe.createQueryBuilder('tb_customer')
            .where({ id: !user.id, email: body.telephone }).getOne()) {
            throw new common_1.BadRequestException('`Telephone belong to another account`');
        }
        if (await this.customerRe.createQueryBuilder('tb_customer')
            .where({ id: !user.id, ccid: body.ccid }).getOne()) {
            throw new common_1.BadRequestException('`CCID belong to another account`');
        }
        const media = await this.mediaRe
            .createQueryBuilder('tb_media')
            .where({ id: body.media_id })
            .getOne();
        const response = await this.customerRe.createQueryBuilder('tb_customer')
            .where({ id: user.id, email: user.email })
            .leftJoin('tb_customer.avatar', 'tb_media')
            .addSelect(['tb_media.original_url'])
            .getOne();
        delete response.password;
        delete response.email_transfer;
        await this.customerRe.createQueryBuilder('tb_customer')
            .update(entities_1.Customer)
            .where({ id: user.id, email: user.email })
            .set({
            fullname: body.fullname,
            telephone: body.telephone !== response.telephone ? body.telephone : undefined,
            sex: body.sex,
            full_address: body.full_address,
            dob: body.dob,
            ccid: body.ccid !== response.ccid ? body.ccid : undefined,
            job: body.job,
            avatar: media !== null && media !== void 0 ? media : undefined,
            country: body.country
        })
            .execute();
        return {
            data: Object.assign(Object.assign(Object.assign({}, response), body), { avatar: { original_url: (_a = media === null || media === void 0 ? void 0 : media.original_url) !== null && _a !== void 0 ? _a : (_b = response.avatar) === null || _b === void 0 ? void 0 : _b.original_url } })
        };
    }
    async forgot(body) {
        if (!await this.customerRe.createQueryBuilder('tb_email').where({ email: body.email }).getOne()) {
            throw new common_1.BadRequestException('This email is not register');
        }
        if (!body.code && !body.new_password) {
            const code = (0, utils_1.randomCode)(6).trim();
            await this.sendMailService.onSendMail({
                to: body.email,
                subject: 'Houston - Forgot password',
                template: 'otp',
                context: { data: { code: code } }
            });
            const otp = new entities_2.OtpEntity();
            otp.email = body.email, otp.code = code;
            await this.otpRe.save(otp);
            return { message: `An email send to ${body.email}` };
        }
        if (body.code && body.new_password) {
            const resOtp = await this.otpRe
                .createQueryBuilder('tb_otp')
                .where({ email: body.email, code: body.code })
                .getOne();
            if (!resOtp) {
                throw new common_1.NotFoundException('Code is invalid !');
            }
            const otpTime = moment(resOtp === null || resOtp === void 0 ? void 0 : resOtp.created_at).format('YYYYMMDDHHmm');
            const currentTime = moment().format('YYYYMMDDHHmm');
            if (parseInt(currentTime) - parseInt(otpTime) > 10) {
                await this.removeOtp(body.email, body.code);
                throw new common_1.BadRequestException('This code is expired');
            }
            else {
                await this.customerRe.createQueryBuilder('tb_customer')
                    .update(entities_1.Customer)
                    .where({ email: body.email })
                    .set({
                    password: await (0, utils_1.generatePassword)(body.new_password)
                })
                    .execute();
                await this.removeOtp(body.email, body.code);
                return { message: 'Update password success!' };
            }
        }
    }
    async removeOtp(email, code) {
        await this.otpRe
            .createQueryBuilder('tb_otp')
            .delete()
            .from(entities_2.OtpEntity)
            .where({ email: email, code: code })
            .execute();
    }
};
AuthCustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Customer)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_2.OtpEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_3.Media)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_4.RefreshToken)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        services_1.SendMailService])
], AuthCustomerService);
exports.AuthCustomerService = AuthCustomerService;
//# sourceMappingURL=auth-customer.service.js.map