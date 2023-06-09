import { TransformData } from "../interface";
export declare const name: {
    JWT: string;
    API_KEY: string;
    JWT_COOKIE: string;
    JWT_REFRESH: string;
    AGE_TOKEN: number;
    AGE_RE_TOKEN: number;
    GOOGLE_OAUTH_2: string;
    FACEBOOK_AUTH: string;
};
export declare const key: {
    SUPER_ADMIN: string;
};
export declare const payKey: {
    CASH: string;
    VNPAY: string;
};
export declare const transformResponse: <Data>(data: Data, total: number, page: number, limit: number) => TransformData<Data>;
