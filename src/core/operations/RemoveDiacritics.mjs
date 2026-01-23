/**
 * @author Klaxon [klaxon@veyr.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";

/**
 * Remove Diacritics operation
 */
class RemoveDiacritics extends Operation {

    /**
     * RemoveDiacritics constructor
     */
    constructor() {
        super();

        this.name = "Remove Diacritics";
        this.module = "Default";
        this.description = "将重音字符替换为其拉丁字符等效项。重音字符由 Unicode 组合字符组成，因此删除线和下划线等 Unicode 文本格式也将被删除。";
        this.infoURL = "https://wikipedia.org/wiki/Diacritic";
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
        // reference: https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript/37511463
        return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

}

export default RemoveDiacritics;
