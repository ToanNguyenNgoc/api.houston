import { MailerAsyncOptions } from "@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface";
import { ParseFilePipe } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GoogleRecaptchaModuleAsyncOptions } from "@nestlab/google-recaptcha/interfaces/google-recaptcha-module-options";
export declare const cloudinaryConfig: {
    imports: (typeof ConfigModule)[];
    useFactory: (configService: ConfigService) => {
        cloud_name: any;
        api_key: any;
        api_secret: any;
    };
    inject: (typeof ConfigService)[];
};
export declare const mailerConfig: MailerAsyncOptions;
export declare const validatorsFile: ParseFilePipe;
export declare const recaptchaConfig: GoogleRecaptchaModuleAsyncOptions;
