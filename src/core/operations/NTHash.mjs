/**
 * @author brun0ne [brunonblok@gmail.com]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {runHash} from "../lib/Hash.mjs";

/**
 * NT Hash operation
 */
class NTHash extends Operation {

    /**
     * NTHash constructor
     */
    constructor() {
        super();

        this.name = "NT Hash";
        this.module = "Crypto";
        this.description = "NT Hash,有时称为 NTLM 哈希,是在 Windows 系统上存储密码的一种方法。它通过对 UTF-16LE 编码的输入运行 MD4 来工作。NTLM 哈希被认为是弱的,因为它们可以使用现代硬件非常容易地进行暴力破解。";
        this.infoURL = "https://wikipedia.org/wiki/NT_LAN_Manager";
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
        // Convert to UTF-16LE
        const buf = new ArrayBuffer(input.length * 2);
        const bufView = new Uint16Array(buf);
        for (let i = 0; i < input.length; i++) {
            bufView[i] = input.charCodeAt(i);
        }

        const hashed = runHash("md4", buf);
        return hashed.toUpperCase();
    }
}

export default NTHash;
