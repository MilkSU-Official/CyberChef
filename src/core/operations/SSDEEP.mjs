/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import ssdeepjs from "ssdeep.js";

/**
 * SSDEEP operation
 */
class SSDEEP extends Operation {

    /**
     * SSDEEP constructor
     */
    constructor() {
        super();

        this.name = "SSDEEP";
        this.module = "Crypto";
        this.description = "SSDEEP 是一个用于计算上下文触发分段哈希(CTPH)的程序。也称为模糊哈希,CTPH 可以匹配具有同源性的输入。此类输入以相同顺序具有相同字节序列,尽管这些序列之间的字节在内容和长度上可能不同。<br><br>SSDEEP 哈希现在广泛用于简单识别目的(例如 VirusTotal 中的 'Basic Properties' 部分)。尽管有 '更好的' 模糊哈希可用,但 SSDEEP 仍然是主要选择之一,因为它速度快且是事实上的标准。<br><br>此操作与 CTPH 操作基本相同,但它们的输出格式不同。";
        this.infoURL = "https://forensics.wiki/ssdeep";
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
        return ssdeepjs.digest(input);
    }

}

export default SSDEEP;
