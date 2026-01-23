/**
 * @author Karsten Silkenbäumer [github.com/kassi]
 * @copyright Karsten Silkenbäumer 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import fernet from "fernet";

/**
 * FernetDecrypt operation
 */
class FernetDecrypt extends Operation {
    /**
     * FernetDecrypt constructor
     */
    constructor() {
        super();

        this.name = "Fernet Decrypt";
        this.module = "Default";
        this.description = "Fernet 是一种对称加密方法，可确保加密的消息在没有密钥的情况下无法被篡改或读取。它使用 URL 安全编码来存储密钥。Fernet 使用 128 位 AES CBC 模式和 PKCS7 填充，使用 SHA256 的 HMAC 进行身份验证。IV 由 os.random() 创建。<br><br><b>密钥:</b> 密钥必须是 32 字节（256 位），使用 Base64 编码。";
        this.infoURL = "https://asecuritysite.com/encryption/fer";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Key",
                "type": "string",
                "value": ""
            },
        ];
        this.patterns = [
            {
                match: "^[A-Z\\d\\-_=]{20,}$",
                flags: "i",
                args: []
            },
        ];
    }
    /**
     * @param {String} input
     * @param {Object[]} args
     * @returns {String}
     */
    run(input, args) {
        const [secretInput] = args;
        try {
            const secret = new fernet.Secret(secretInput);
            const token = new fernet.Token({
                secret: secret,
                token: input,
                ttl: 0
            });
            return token.decode();
        } catch (err) {
            throw new OperationError(err);
        }
    }
}

export default FernetDecrypt;
