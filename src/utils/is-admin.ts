import { key } from "../common"
import { encode } from "./encode"

export function isSPAdmin(account: any) {
  let result = false
  const roles = account.roles.map(item => item.code)
  if (roles.includes(encode(key.SUPER_ADMIN))) {
    result = true
  }
  return result
}