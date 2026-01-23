/**
 * @author n1073645 [n1073645@gmail.com]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import * as LS47 from "../lib/LS47.mjs";

/**
 * LS47 Decrypt operation
 */
class LS47Decrypt extends Operation {

    /**
     * LS47Decrypt constructor
     */
    constructor() {
        super();

        this.name = "LS47 Decrypt";
        this.module = "Crypto";
        this.description = "这是 Alan Kaminsky 所描述的 ElsieFour 密码的轻微改进。我们使用 7x7 字符代替原来（勉强适合的）6x6，以便能够加密一些结构化信息。我们还描述了一个简单的密钥扩展算法，因为记忆密码很常见。与 ElsieFour 类似的安全考虑仍然适用。<br>LS47 字母表由以下字符组成：<code>_abcdefghijklmnopqrstuvwxyz.0123456789,-+*/:?!'()</code><br>LS47 密钥是字母表的一个排列，然后表示为用于加密或解密的 7x7 网格。";
        this.infoURL = "https://github.com/exaexa/ls47";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "Password",
                type: "string",
                value: ""
            },
            {
                name: "Padding",
                type: "number",
                value: 10
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        this.paddingSize = parseInt(args[1], 10);

        LS47.initTiles();

        const key = LS47.deriveKey(args[0]);
        return LS47.decryptPad(key, input, this.paddingSize);
    }

}

export default LS47Decrypt;
