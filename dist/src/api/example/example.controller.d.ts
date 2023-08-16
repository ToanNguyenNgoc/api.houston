import { RedisCacheService } from 'src/redis';
export declare class ExampleController {
    private readonly redisCacheSv;
    constructor(redisCacheSv: RedisCacheService);
    setCate(): Promise<boolean>;
    getCate(): Promise<any>;
    delCate(): Promise<void>;
}
