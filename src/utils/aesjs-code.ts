import * as aesjs from 'aes-js'

export const aesEncode = (text: string) => {
  const key = process.env.AES_JS_KEY?.split(',')?.map(i => parseInt(i))
  const textBytes = aesjs.utils.utf8.toBytes(text);
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  const encryptedBytes = aesCtr.encrypt(textBytes);
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  return encryptedHex
}
export const aesDecode = (code: string) => {
  const key = process.env.AES_JS_KEY?.split(',')?.map(i => parseInt(i))
  const encryptedBytes = aesjs.utils.hex.toBytes(code);
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  const decryptedBytes = aesCtr.decrypt(encryptedBytes);
  const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  return decryptedText
}