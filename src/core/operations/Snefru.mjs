/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {runHash} from "../lib/Hash.mjs";

/**
 * Snefru operation
 */
class Snefru extends Operation {

    /**
     * Snefru constructor
     */
    constructor() {
        super();

        this.name = "Snefru";
        this.module = "Crypto";
        this.description = "Snefru 是 Ralph Merkle 于 1990 年在施乐帕克研究中心工作时发明的加密哈希函数。该函数支持 128 位和 256 位输出。它以埃及法老 Sneferu 命名，延续了 Khufu 和 Khafre 块密码的传统。<br><br>Snefru 的原始设计被 Eli Biham 和 Adi Shamir 证明是不安全的，他们能够使用差分密码分析找到哈希冲突。然后通过将算法主过程的迭代次数从两次增加到八次来修改设计。";
        this.infoURL = "https://wikipedia.org/wiki/Snefru";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "Size",
                type: "number",
                value: 128,
                min: 32,
                max: 480,
                step: 32
            },
            {
                name: "Rounds",
                type: "option",
                value: ["8", "4", "2"]
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return runHash("snefru", input, {
            length: args[0],
            rounds: args[1]
        });
    }

}

export default Snefru;
