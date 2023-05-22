import { MailerService } from '@nestjs-modules/mailer';
interface SendMailType {
    to?: string;
    subject?: string;
    template?: 'otp' | 'welcome' | 'booking_confirm';
    context?: any;
}
export declare class SendMailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    onSendMail({ to, subject, template, context }: SendMailType): Promise<void>;
}
export {};
