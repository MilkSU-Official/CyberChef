/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * Fletcher-64 Checksum operation
 */
class Fletcher64Checksum extends Operation {

    /**
     * Fletcher64Checksum constructor
     */
    constructor() {
        super();

        this.name = "Fletcher-64 Checksum";
        this.module = "Crypto";
        this.description = "Fletcher 校验和是由 John Gould Fletcher 于 20 世纪 70 年代末在劳伦斯利弗莫尔实验室设计的计算位置相关校验和的算法。<br><br>Fletcher 校验和的目标是提供接近循环冗余校验的错误检测属性，但具有与求和技术相关的较低计算工作量。";
        this.infoURL = "https://wikipedia.org/wiki/Fletcher%27s_checksum#Fletcher-64";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        let a = 0,
            b = 0;
        if (ArrayBuffer.isView(input)) {
            input = new DataView(input.buffer, input.byteOffset, input.byteLength);
        } else {
            input = new DataView(input);
        }

        for (let i = 0; i < input.byteLength - 3; i += 4) {
            a = (a + input.getUint32(i, true)) % 0xffffffff;
            b = (b + a) % 0xffffffff;
        }
        if (input.byteLength % 4 !== 0) {
            let lastValue = 0;
            for (let i = 0; i < input.byteLength % 4; i++) {
                lastValue = (lastValue << 8) | input.getUint8(input.byteLength - 1 - i);
            }
            a = (a + lastValue) % 0xffffffff;
            b = (b + a) % 0xffffffff;
        }

        return Utils.hex(b >>> 0, 8) + Utils.hex(a >>> 0, 8);
    }

}

export default Fletcher64Checksum;
