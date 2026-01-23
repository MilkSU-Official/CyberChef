/**
 * @author arnydo [github@arnydo.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";

/**
 * FangURL operation
 */
class FangURL extends Operation {

    /**
     * FangURL constructor
     */
    constructor() {
        super();

        this.name = "Fang URL";
        this.module = "Default";
        this.description = "处理一个“阐割”的通用资源定位符（URL）并“去阐割”它。即，它移除使其无法使用的更改（阐割），以便可以再次使用。";
        this.infoURL = "https://isc.sans.edu/forums/diary/Defang+all+the+things/22744/";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "Restore [.]",
                type: "boolean",
                value: true
            },
            {
                name: "Restore hxxp",
                type: "boolean",
                value: true
            },
            {
                name: "Restore ://",
                type: "boolean",
                value: true
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [dots, http, slashes] = args;

        input = fangURL(input, dots, http, slashes);

        return input;
    }

}


/**
 * Defangs a given URL
 *
 * @param {string} url
 * @param {boolean} dots
 * @param {boolean} http
 * @param {boolean} slashes
 * @returns {string}
 */
function fangURL(url, dots, http, slashes) {
    if (dots) url = url.replace(/\[\.\]/g, ".");
    if (http) url = url.replace(/hxxp/g, "http");
    if (slashes) url = url.replace(/\[:\/\/\]/g, "://");

    return url;
}

export default FangURL;
