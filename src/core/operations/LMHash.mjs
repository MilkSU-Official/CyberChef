/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {smbhash} from "ntlm";

/**
 * LM Hash operation
 */
class LMHash extends Operation {

    /**
     * LMHash constructor
     */
    constructor() {
        super();

        this.name = "LM Hash";
        this.module = "Crypto";
        this.description = "LM Hash 或 LAN Manager Hash 是一种在旧版 Microsoft 操作系统上存储密码的已废弃方法。它特别脆弱,在现代硬件上使用彩虹表可以在几秒钟内被破解。";
        this.infoURL = "https://wikipedia.org/wiki/LAN_Manager#Password_hashing_algorithm";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return smbhash.lmhash(input);
    }

}

export default LMHash;
