/**
 * @author Danh4 [dan.h4@ncsc.gov.uk]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Cbor from "cbor";

/**
 * CBOR Decode operation
 */
class CBORDecode extends Operation {

    /**
     * CBORDecode constructor
     */
    constructor() {
        super();

        this.name = "CBOR Decode";
        this.module = "Serialise";
        this.description = "简洁二进制对象表示（CBOR）是一种松散基于 JSON 的二进制数据序列化格式。与 JSON 一样，它允许传输包含名称-值对的数据对象，但方式更简洁。这以牺牲人类可读性为代价提高了处理和传输速度。它在 IETF RFC 8949 中定义。";
        this.infoURL = "https://wikipedia.org/wiki/CBOR";
        this.inputType = "ArrayBuffer";
        this.outputType = "JSON";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {JSON}
     */
    run(input, args) {
        return Cbor.decodeFirstSync(Buffer.from(input).toString("hex"));
    }

}

export default CBORDecode;
