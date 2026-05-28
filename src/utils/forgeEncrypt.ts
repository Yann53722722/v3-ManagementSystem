// 新方案，使用node-forge库进行RSA加密
import forge from 'node-forge'
// 针对mock解密时可能出现报错，将导出模块改为forge.default或forge，保证能找到pki
// 原因：在导入forge模块时可能是一个对象，也可能包含一个default属性，该属性才是真正的forge库。（node-forge本身是一个CommonJS模块，使用ESM导入可能存在兼容性问题）
// 这种情况通常发生在使用ES模块导入时，而在CommonJS环境中直接导入则可以直接使用forge。因此，为了兼容不同的环境，我们需要检查是否存在default属性，并根据情况选择正确的导出方式。
const forgeLib = (forge as any).default ?? forge

// 设置公钥
const publicKeyPem =
  `-----BEGIN PUBLIC KEY-----` +
  `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtcKMQsN7KAHJbKgrJJs8` +
  `ZbMaeXbtuCkncKXKST+KXpAhjs3kuU40NR4N9IcgKtyCjwXoWzb+r748mwu5g5cG` +
  `CNOf1niN8ggJhj5m3jQh7Bz9j1R3vLMquXDpIJZmiLPE1Ts6hrcHQvZ/obBnxz/k` +
  `Af/v4F8ydfhZgRBD/TWQzIWIEMh3rOKxis1eibt122rY3Ijs/pc/nxAtaDJwy3fW` +
  `Ju3y4o1IVsTYyZFaYz0U2dJf2ecUfQxsnRKvFG82gLWhFTvyL0mTG9YCBp8PrF9U` +
  `SC+x2woceE5eIvkqx4IHWoyukkwqfGpuoIZ0qJWQlV3V8mCQtac+MOkEjsMEqyJC` +
  `LwIDAQAB` +
  `-----END PUBLIC KEY-----`

// 设置私钥
const privateKeyPem =
  `-----BEGIN RSA PRIVATE KEY-----` +
  `MIIEpQIBAAKCAQEAtcKMQsN7KAHJbKgrJJs8ZbMaeXbtuCkncKXKST+KXpAhjs3k` +
  `uU40NR4N9IcgKtyCjwXoWzb+r748mwu5g5cGCNOf1niN8ggJhj5m3jQh7Bz9j1R3` +
  `vLMquXDpIJZmiLPE1Ts6hrcHQvZ/obBnxz/kAf/v4F8ydfhZgRBD/TWQzIWIEMh3` +
  `rOKxis1eibt122rY3Ijs/pc/nxAtaDJwy3fWJu3y4o1IVsTYyZFaYz0U2dJf2ecU` +
  `fQxsnRKvFG82gLWhFTvyL0mTG9YCBp8PrF9USC+x2woceE5eIvkqx4IHWoyukkwq` +
  `fGpuoIZ0qJWQlV3V8mCQtac+MOkEjsMEqyJCLwIDAQABAoIBAE0ZsZXAhkV6PI8y` +
  `5tooX35kcx6DLGOqUWifayeXJILocNO60wMoAU1m6lSH3UVRNLCmuOG4emDiOaMr` +
  `Xg5LyeuEmZDIoq3Aawne/pPTWXBm+8gI9KG+/qibFMkWA3iJiT1KWpE6ooHtPkbA` +
  `JcWHfJi8kGyE9UrFhnIRDEYkqr+WTaO3R4bpKlyfJ6Dvp8hRBXXBLKLni5FBX3Jt` +
  `aUgt85fMh5NUronJZ/NCly3l/ZuvedDnwke4SGHKTOJ3UP8TX+HanbjIyW1khcCW` +
  `7Dc0SByAezq89ktKMLgQzAd827by1JAToSFvIlgJWkFuhSM1dUAU8Z5B+sQDcdV7` +
  `CXlOt8ECgYEA53cK3jI5y1OIIBbeA8nZBbb09zJYLsTbWJU+zZoq95A68h3dBP8a` +
  `qcqxNRMeWQsqwbNHVsNK7WpIcdnCyJ7HFPHEmaUSTZuo85vAdHmp3vSYnwCc1Sno` +
  `5Hq7hBO5/4IOp5iSijkjRWlq9UM+G2bBrv2m5lQzJUE9jJoNQQm2YpMCgYEAyQa5` +
  `vSbRZ9H2KGu5yHuSb0NHeDpqsSYdGnrfWCVfeRfp5Ggx1Gky0t3GVtBnaaabCxqZ` +
  `9zE5NUoLctD+UT12VD/OR320taRK798Th7FqP51T0Paj7nWCnHtcxoZRwyarJ2/Q` +
  `mYMliHocupmjt+kK319N3z7enQsXVwRuKt/kF3UCgYEAxNbKij0iQxRNXiS0N3qP` +
  `MbnuRs4sidFlS8bX+tcRlSi1yDK3Q8mCLkSuQJl6pHTHrqQ8lb9M1+wboZ5zdFL6` +
  `sIgODi+ACjnHCyw4FZVlbbKKnCVUOj8CzFLHZsGz2mMK/WHVtPB0W1IT4HGHvpu7` +
  `OIqDRbrzJ8p8gjZ78QRGczsCgYEAoReYpHGFAbOJlV6uZHBSKoM5tKjrcsZeMCgi` +
  `7poUZg+5yOWOeO9MYRqDpHIhTNLMEBvjIen6NC//+KRuCGA+gMkY3sVnmN/thUe4` +
  `eNa9k/jZf+0F9UOJxSg+coCU6NQF9/ZsrXghDbr9ZrNUNT61DcdruejBsAuBSqQs` +
  `PINqXzkCgYEAzyAYffW4NkVu+T86VN4GDXf5fFdG1ne3nSltsJV5/vPvfbu8XYML` +
  `HM8KN832HbUN6JV3yeO7MBXktETa2JlXCTM57W7p7LTF3jBLtgmYZ2hMFPddB5QT` +
  `Kh9aq/MbR0Xydq9nzhppoGOoS1VK0YjYowfIiXYgOzyeW5FWB5FjlTM=` +
  `-----END RSA PRIVATE KEY-----`

// 另一种方式获取密钥
// const keys = forge.pki.rsa.generateKeyPair({bits: 2048})
// const privateKeyPem = forge.pki.privateKeyToPem(keys.privateKey)
// const publicKeyPem = forge.pki.publicKeyToPem(keys.publicKey)

// 加密
export function encrypt(txt: string): string {
  const encryptor = forgeLib.pki.publicKeyFromPem(publicKeyPem) // 使用公钥加密
  return forgeLib.util.encode64(encryptor.encrypt(txt))
}
// 解密
export function decrypt(txt: string): string {
  const decryptor = forgeLib.pki.privateKeyFromPem(privateKeyPem) // 使用私钥解密
  return decryptor.decrypt(forgeLib.util.decode64(txt))
}
