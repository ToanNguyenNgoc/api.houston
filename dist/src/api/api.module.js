"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const account_module_1 = require("./account/account.module");
const entities_1 = require("./account/entities");
const auth_module_1 = require("./auth/auth.module");
const auth_customer_module_1 = require("./auth_customer/auth-customer.module");
const banner_module_1 = require("./banner/banner.module");
const booking_module_1 = require("./booking/booking.module");
const branches_module_1 = require("./branches/branches.module");
const channel_log_module_1 = require("./channel_log/channel-log.module");
const company_module_1 = require("./company/company.module");
const customer_module_1 = require("./customer/customer.module");
const entities_2 = require("./customer/entities");
const customer_original_module_1 = require("./customer_original/customer_original.module");
const media_module_1 = require("./media/media.module");
const otp_module_1 = require("./otp/otp.module");
const permission_module_1 = require("./permission/permission.module");
const province_module_1 = require("./province/province.module");
const refreshtoken_module_1 = require("./refresh_token/refreshtoken.module");
const revenue_module_1 = require("./revenue/revenue.module");
const role_module_1 = require("./role/role.module");
const send_mail_module_1 = require("./sendmail/send-mail.module");
const villa_module_1 = require("./villa/villa.module");
const villa_cate_module_1 = require("./villa_cate/villa_cate.module");
const villagallery_module_1 = require("./villa_gallery/villagallery.module");
const villaroom_module_1 = require("./villa_room/villaroom.module");
const strategy_1 = require("../middlewares/strategy");
const serializer_1 = require("../middlewares/serializer");
const payment_method_module_1 = require("./payment_method/payment_method.module");
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            permission_module_1.PermissionModule,
            role_module_1.RoleModule,
            account_module_1.AccountModule,
            channel_log_module_1.ChannelLogModule,
            account_module_1.AccountModule,
            auth_module_1.AuthModule,
            customer_module_1.CustomerModule,
            jwt_1.JwtModule.register({}),
            typeorm_1.TypeOrmModule.forFeature([entities_1.Account, entities_2.Customer]),
            branches_module_1.BranchesModule,
            media_module_1.MediaModule,
            send_mail_module_1.SendMailModule,
            otp_module_1.OtpModule,
            customer_original_module_1.CustomerOriginalModule,
            auth_customer_module_1.AuthCustomerModule,
            villa_cate_module_1.VillaCateModule,
            villa_module_1.VillaModule,
            villagallery_module_1.VillaGalleryModule,
            villaroom_module_1.VillaRoomModule,
            province_module_1.ProvinceModule,
            booking_module_1.BookingModule,
            revenue_module_1.RevenueModule,
            refreshtoken_module_1.RefreshTokenModule,
            banner_module_1.BannerModule,
            company_module_1.CompanyModule,
            payment_method_module_1.PaymentMethodModule,
        ],
        controllers: [],
        providers: [
            strategy_1.JwtSysStrategy,
            strategy_1.JwtCookieStrategy,
            strategy_1.JwtRefreshStrategy,
            strategy_1.GoogleStrategy,
            serializer_1.SessionSerializer
        ],
    })
], ApiModule);
exports.ApiModule = ApiModule;
//# sourceMappingURL=api.module.js.map