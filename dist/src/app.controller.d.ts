import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    initial(): Promise<{
        time: string;
        clientHost: string;
        serverHost: string;
        mail: string;
    }>;
}
