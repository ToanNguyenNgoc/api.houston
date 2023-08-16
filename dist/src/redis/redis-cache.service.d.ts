import Cache from 'cache-manager';
export declare class RedisCacheService {
    private cacheManager;
    constructor(cacheManager: Cache);
    set<T>(key: string, value: T): Promise<any>;
    get(key: string): Promise<any>;
    del(key: string): Promise<any>;
}
