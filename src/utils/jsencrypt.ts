// ----------旧方案，已弃用----------

// 使用jsencrypt加密，这是一个基于rsa加解密的js库
// 安装：npm install jsencrypt
// 使用openssl命令生成密钥，注意需要在git bash中执行，cmd和powershell中无法识别命令！
// 生成私钥：openssl genrsa -out private.pem 2048
// 从私钥中提取公钥：openssl rsa -in private.pem -pubout -out public.pem
// 然后在文件夹中就会生成private.pem和public.pem两个文件，其内容就是密钥
// 另附说明：密钥长度越长，安全性越高，但加密和解密的速度也会变慢，建议使用2048位的密钥长度

// import { JSEncrypt } from 'jsencrypt'

// // // 创建密钥对象
// // const encryptor = new JSEncrypt()

// // 设置公钥
// const publicKey =
//   `-----BEGIN PUBLIC KEY-----` +
//   `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtcKMQsN7KAHJbKgrJJs8` +
//   `ZbMaeXbtuCkncKXKST+KXpAhjs3kuU40NR4N9IcgKtyCjwXoWzb+r748mwu5g5cG` +
//   `CNOf1niN8ggJhj5m3jQh7Bz9j1R3vLMquXDpIJZmiLPE1Ts6hrcHQvZ/obBnxz/k` +
//   `Af/v4F8ydfhZgRBD/TWQzIWIEMh3rOKxis1eibt122rY3Ijs/pc/nxAtaDJwy3fW` +
//   `Ju3y4o1IVsTYyZFaYz0U2dJf2ecUfQxsnRKvFG82gLWhFTvyL0mTG9YCBp8PrF9U` +
//   `SC+x2woceE5eIvkqx4IHWoyukkwqfGpuoIZ0qJWQlV3V8mCQtac+MOkEjsMEqyJC` +
//   `LwIDAQAB` +
//   `-----END PUBLIC KEY-----`

// // 设置私钥
// const privateKey =
//   `-----BEGIN RSA PRIVATE KEY-----` +
//   `MIIEpQIBAAKCAQEAtcKMQsN7KAHJbKgrJJs8ZbMaeXbtuCkncKXKST+KXpAhjs3k` +
//   `uU40NR4N9IcgKtyCjwXoWzb+r748mwu5g5cGCNOf1niN8ggJhj5m3jQh7Bz9j1R3` +
//   `vLMquXDpIJZmiLPE1Ts6hrcHQvZ/obBnxz/kAf/v4F8ydfhZgRBD/TWQzIWIEMh3` +
//   `rOKxis1eibt122rY3Ijs/pc/nxAtaDJwy3fWJu3y4o1IVsTYyZFaYz0U2dJf2ecU` +
//   `fQxsnRKvFG82gLWhFTvyL0mTG9YCBp8PrF9USC+x2woceE5eIvkqx4IHWoyukkwq` +
//   `fGpuoIZ0qJWQlV3V8mCQtac+MOkEjsMEqyJCLwIDAQABAoIBAE0ZsZXAhkV6PI8y` +
//   `5tooX35kcx6DLGOqUWifayeXJILocNO60wMoAU1m6lSH3UVRNLCmuOG4emDiOaMr` +
//   `Xg5LyeuEmZDIoq3Aawne/pPTWXBm+8gI9KG+/qibFMkWA3iJiT1KWpE6ooHtPkbA` +
//   `JcWHfJi8kGyE9UrFhnIRDEYkqr+WTaO3R4bpKlyfJ6Dvp8hRBXXBLKLni5FBX3Jt` +
//   `aUgt85fMh5NUronJZ/NCly3l/ZuvedDnwke4SGHKTOJ3UP8TX+HanbjIyW1khcCW` +
//   `7Dc0SByAezq89ktKMLgQzAd827by1JAToSFvIlgJWkFuhSM1dUAU8Z5B+sQDcdV7` +
//   `CXlOt8ECgYEA53cK3jI5y1OIIBbeA8nZBbb09zJYLsTbWJU+zZoq95A68h3dBP8a` +
//   `qcqxNRMeWQsqwbNHVsNK7WpIcdnCyJ7HFPHEmaUSTZuo85vAdHmp3vSYnwCc1Sno` +
//   `5Hq7hBO5/4IOp5iSijkjRWlq9UM+G2bBrv2m5lQzJUE9jJoNQQm2YpMCgYEAyQa5` +
//   `vSbRZ9H2KGu5yHuSb0NHeDpqsSYdGnrfWCVfeRfp5Ggx1Gky0t3GVtBnaaabCxqZ` +
//   `9zE5NUoLctD+UT12VD/OR320taRK798Th7FqP51T0Paj7nWCnHtcxoZRwyarJ2/Q` +
//   `mYMliHocupmjt+kK319N3z7enQsXVwRuKt/kF3UCgYEAxNbKij0iQxRNXiS0N3qP` +
//   `MbnuRs4sidFlS8bX+tcRlSi1yDK3Q8mCLkSuQJl6pHTHrqQ8lb9M1+wboZ5zdFL6` +
//   `sIgODi+ACjnHCyw4FZVlbbKKnCVUOj8CzFLHZsGz2mMK/WHVtPB0W1IT4HGHvpu7` +
//   `OIqDRbrzJ8p8gjZ78QRGczsCgYEAoReYpHGFAbOJlV6uZHBSKoM5tKjrcsZeMCgi` +
//   `7poUZg+5yOWOeO9MYRqDpHIhTNLMEBvjIen6NC//+KRuCGA+gMkY3sVnmN/thUe4` +
//   `eNa9k/jZf+0F9UOJxSg+coCU6NQF9/ZsrXghDbr9ZrNUNT61DcdruejBsAuBSqQs` +
//   `PINqXzkCgYEAzyAYffW4NkVu+T86VN4GDXf5fFdG1ne3nSltsJV5/vPvfbu8XYML` +
//   `HM8KN832HbUN6JV3yeO7MBXktETa2JlXCTM57W7p7LTF3jBLtgmYZ2hMFPddB5QT` +
//   `Kh9aq/MbR0Xydq9nzhppoGOoS1VK0YjYowfIiXYgOzyeW5FWB5FjlTM=` +
//   `-----END RSA PRIVATE KEY-----`

// // encryptor.setPrivateKey(privateKey)

// // 加密
// export function encrypt(txt: string): string {
//   const encryptor = new JSEncrypt()
//   encryptor.setPublicKey(publicKey) // 使用公钥加密
//   return encryptor.encrypt(txt) || ''
// }
// // 解密
// export function decrypt(txt: string): string {
//   const decryptor = new JSEncrypt()
//   decryptor.setPrivateKey(privateKey) // 使用私钥解密
//   return decryptor.decrypt(txt) || ''
// }
