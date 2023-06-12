import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from 'src/api/account/account.module';
import { Account } from 'src/api/account/entities';
import { AuthModule } from 'src/api/auth/auth.module';
import { AuthCustomerModule } from 'src/api/auth_customer/auth-customer.module';
import { BannerModule } from 'src/api/banner/banner.module';
import { BookingModule } from 'src/api/booking/booking.module';
import { BranchesModule } from 'src/api/branches/branches.module';
import { ChannelLogModule } from 'src/api/channel_log/channel-log.module';
import { CompanyModule } from 'src/api/company/company.module';
import { CustomerModule } from 'src/api/customer/customer.module';
import { Customer } from 'src/api/customer/entities';
import { CustomerOriginalModule } from 'src/api/customer_original/customer_original.module';
import { MediaModule } from 'src/api/media/media.module';
import { OtpModule } from 'src/api/otp/otp.module';
import { PermissionModule } from 'src/api/permission/permission.module';
import { ProvinceModule } from 'src/api/province/province.module';
import { RefreshTokenModule } from 'src/api/refresh_token/refreshtoken.module';
import { RevenueModule } from 'src/api/revenue/revenue.module';
import { RoleModule } from 'src/api/role/role.module';
import { SendMailModule } from 'src/api/sendmail/send-mail.module';
import { VillaModule } from 'src/api/villa/villa.module';
import { VillaCateModule } from 'src/api/villa_cate/villa_cate.module';
import { VillaGalleryModule } from 'src/api/villa_gallery/villagallery.module';
import { VillaRoomModule } from 'src/api/villa_room/villaroom.module';
import { OAuthModule } from 'src/api/oauth/oauth.module';
import { FacebookStrategy, GoogleStrategy, JwtCookieStrategy, JwtRefreshStrategy, JwtSysStrategy } from 'src/middlewares/strategy';
import { SessionSerializer } from 'src/middlewares/serializer';
import { PaymentGatewayModule } from 'src/api/payment_gateway/paymentgateway.module';
import { PaymentMethodModule } from './payment_method/payment_method.module';

@Module({
    imports: [
        OAuthModule,
        PermissionModule,
        RoleModule,
        AccountModule,
        ChannelLogModule,
        AccountModule,
        AuthModule,
        CustomerModule,
        JwtModule.register({}),
        TypeOrmModule.forFeature([Account, Customer]),
        BranchesModule,
        MediaModule,
        SendMailModule,
        OtpModule,
        CustomerOriginalModule,
        AuthCustomerModule,
        VillaCateModule,
        VillaModule,
        VillaGalleryModule,
        VillaRoomModule,
        ProvinceModule,
        BookingModule,
        RevenueModule,
        RefreshTokenModule,
        BannerModule,
        PaymentGatewayModule,
        //
        CompanyModule,
        PaymentMethodModule,
        // CompanySocialModule,
        // CompanyContactModule,
        // BlogModule
    ],
    controllers: [],
    providers: [
        JwtSysStrategy,
        JwtCookieStrategy,
        JwtRefreshStrategy,
        GoogleStrategy,
        FacebookStrategy,
        SessionSerializer
    ],
})
export class ApiModule { }
