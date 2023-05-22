export function convertBoolean(type: any) {
  let result
  if (type === 'false') return result = false
  if (type === 'true') return result = true
  return result
}