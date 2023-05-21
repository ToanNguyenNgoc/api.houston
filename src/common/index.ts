import { TransformData } from "../interface"

const onHours = 60 * 60 * 1000

export const name = {
  JWT: 'json_web_token',
  API_KEY: 'x-api-key',
  JWT_COOKIE: 'json_web_token_cookie',
  JWT_REFRESH: 'json_web_token_refresh',
  AGE_TOKEN: 60 * 1000 * 2,
  AGE_RE_TOKEN: onHours * 24 * 30
}
export const key = {
  SUPER_ADMIN: 'Super Admin'
}

export const transformResponse = <Data>(
  data: Data, total: number, page: number, limit: number
): TransformData<Data> => {
  return {
    data: data,
    total: total,
    total_page: Math.ceil(total / limit),
    prev_page: page - 1 > 0 ? page - 1 : 0,
    current_page: page,
    next_page: page + 1 > Math.ceil(total / limit) ? Math.ceil(total / limit) : page + 1
  }
}