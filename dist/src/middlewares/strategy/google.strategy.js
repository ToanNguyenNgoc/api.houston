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
exports.GoogleStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const common_1 = require("@nestjs/common");
const common_2 = require("../../common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../../api/customer/entities");
const typeorm_2 = require("typeorm");
const utils_1 = require("../../utils");
const services_1 = require("../../services");
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, common_2.name.GOOGLE_OAUTH_2) {
    constructor(customerRep, sendmailService) {
        super({
            clientID: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            callbackURL: process.env.OAUTH_CALLBACK_URL,
            scope: ['profile', 'email']
        });
        this.customerRep = customerRep;
        this.sendmailService = sendmailService;
    }
    async validate(accessToken, refreshToken, profile) {
        var _a;
        const customer = await this.customerRep
            .createQueryBuilder('tb_customer')
            .where({ email: profile._json.email })
            .getOne();
        if (customer) {
            return customer;
        }
        else {
            const newCustomer = new entities_1.Customer();
            newCustomer.fullname = profile.displayName;
            newCustomer.password = await (0, utils_1.generatePassword)(profile.id);
            newCustomer.email = profile._json.email;
            newCustomer.email_transfer = profile._json.email;
            newCustomer.social_id = `G${profile.id}`;
            newCustomer.social_platform = "GOOGLE";
            newCustomer.social_avatar = profile.photos ? (_a = profile.photos[0]) === null || _a === void 0 ? void 0 : _a.value : null;
            const customerCreated = await this.customerRep.save(newCustomer);
            await this.sendmailService.onSendMail({
                template: 'welcome',
                to: profile._json.email,
                context: {
                    data: {
                        fullname: profile.displayName,
                    }
                }
            });
            return customerCreated;
        }
    }
};
GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        services_1.SendMailService])
], GoogleStrategy);
exports.GoogleStrategy = GoogleStrategy;
//# sourceMappingURL=google.strategy.js.map