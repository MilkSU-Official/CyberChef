/**
 * @author tlwr [toby@toby.codes]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import kbpgp from "kbpgp";
import { ASP, importPrivateKey, importPublicKey } from "../lib/PGP.mjs";
import OperationError from "../errors/OperationError.mjs";
import * as es6promisify from "es6-promisify";
const promisify = es6promisify.default ? es6promisify.default.promisify : es6promisify.promisify;

/**
 * PGP Encrypt and Sign operation
 */
class PGPEncryptAndSign extends Operation {

    /**
     * PGPEncryptAndSign constructor
     */
    constructor() {
        super();

        this.name = "PGP Encrypt and Sign";
        this.module = "PGP";
        this.description = [
            "输入：您想要签名的明文。",
            "<br><br>",
            "参数：签名者的 ASCII 装甲私钥（如果必要，还需要私钥密码）",
            "和接收者的 ASCII 装甲 PGP 公钥。",
            "<br><br>",
            "此操作使用 PGP 生成加密的数字签名。",
            "<br><br>",
            "Pretty Good Privacy 是用于加密、解密和签名消息的加密标准（OpenPGP）。",
            "<br><br>",
            "此函数使用 Keybase 的 PGP 实现。",
        ].join("\n");
        this.infoURL = "https://wikipedia.org/wiki/Pretty_Good_Privacy";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Private key of signer",
                "type": "text",
                "value": ""
            },
            {
                "name": "Private key passphrase",
                "type": "string",
                "value": ""
            },
            {
                "name": "Public key of recipient",
                "type": "text",
                "value": ""
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     *
     * @throws {OperationError} if failure to sign message
     */
    async run(input, args) {
        const message = input,
            [privateKey, passphrase, publicKey] = args;
        let signedMessage;

        if (!privateKey) throw new OperationError("Enter the private key of the signer.");
        if (!publicKey) throw new OperationError("Enter the public key of the recipient.");
        const privKey = await importPrivateKey(privateKey, passphrase);
        const pubKey = await importPublicKey(publicKey);

        try {
            signedMessage = await promisify(kbpgp.box)({
                "msg": message,
                "encrypt_for": pubKey,
                "sign_with": privKey,
                "asp": ASP
            });
        } catch (err) {
            throw new OperationError(`Couldn't sign message: ${err}`);
        }

        return signedMessage;
    }

}

export default PGPEncryptAndSign;
