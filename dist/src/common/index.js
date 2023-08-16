"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformResponse = exports.payKey = exports.key = exports.name = void 0;
const onHours = 60 * 60 * 1000;
exports.name = {
    JWT: 'json_web_token',
    API_KEY: 'x-api-key',
    JWT_COOKIE: 'json_web_token_cookie',
    JWT_REFRESH: 'json_web_token_refresh',
    AGE_TOKEN: 60 * 1000 * 2,
    AGE_RE_TOKEN: onHours * 24 * 30,
    GOOGLE_OAUTH_2: 'google_oauth_2',
    FACEBOOK_AUTH: 'facebook_auth',
    REDIS_TTL: 24 * 60 * 60
};
exports.key = {
    SUPER_ADMIN: 'Super Admin',
};
exports.payKey = {
    CASH: "CASH",
    VNPAY: "VNPAY"
};
const transformResponse = (data, total, page, limit) => {
    return {
        data: data,
        total: total,
        total_page: Math.ceil(total / limit),
        prev_page: page - 1 > 0 ? page - 1 : 0,
        current_page: page,
        next_page: page + 1 > Math.ceil(total / limit) ? Math.ceil(total / limit) : page + 1
    };
};
exports.transformResponse = transformResponse;
//# sourceMappingURL=index.js.map