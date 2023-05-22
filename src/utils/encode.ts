import * as base64 from 'base-64'
import * as utf8 from 'utf8'

export function encode(text: string) {
  const bytes = utf8.encode(text);
  const code = base64.encode(bytes);
  return code
}
export function decode(code: string) {
  const types = base64.decode(code)
  const text = utf8.decode(types)
  return text
}