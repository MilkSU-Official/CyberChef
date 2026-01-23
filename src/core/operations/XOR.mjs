/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import { bitOp, xor, BITWISE_OP_DELIMS } from "../lib/BitwiseOp.mjs";

/**
 * XOR operation
 */
class XOR extends Operation {

    /**
     * XOR constructor
     */
    constructor() {
        super();

        this.name = "XOR";
        this.module = "Default";
        this.description = "使用给定的密钥对输入进行 XOR 运算。<br>例如：<code>fe023da5</code><br><br><strong>选项</strong><br><u>保留空字节：</u>如果当前字节为 0x00 或与密钥相同，则跳过它。<br><br><u>方案：</u><ul><li>标准 - 每轮后密钥不变</li><li>输入差分 - 密钥设置为上一个未处理字节的值</li><li>输出差分 - 密钥设置为上一个已处理字节的值</li><li>级联 - 密钥设置为输入字节移位一位</li></ul>";
        this.infoURL = "https://wikipedia.org/wiki/XOR";
        this.inputType = "ArrayBuffer";
        this.outputType = "byteArray";
        this.args = [
            {
                "name": "Key",
                "type": "toggleString",
                "value": "",
                "toggleValues": BITWISE_OP_DELIMS
            },
            {
                "name": "Scheme",
                "type": "option",
                "value": ["Standard", "Input differential", "Output differential", "Cascade"]
            },
            {
                "name": "Null preserving",
                "type": "boolean",
                "value": false
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        input = new Uint8Array(input);
        const key = Utils.convertToByteArray(args[0].string || "", args[0].option),
            [, scheme, nullPreserving] = args;

        return bitOp(input, key, xor, nullPreserving, scheme);
    }

    /**
     * Highlight XOR
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlight(pos, args) {
        return pos;
    }

    /**
     * Highlight XOR in reverse
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlightReverse(pos, args) {
        return pos;
    }

}

export default XOR;
