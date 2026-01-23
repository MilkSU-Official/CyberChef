/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import moment from "moment-timezone";
import {DATETIME_FORMATS, FORMAT_EXAMPLES} from "../lib/DateTime.mjs";

/**
 * Parse DateTime operation
 */
class ParseDateTime extends Operation {

    /**
     * ParseDateTime constructor
     */
    constructor() {
        super();

        this.name = "Parse DateTime";
        this.module = "Default";
        this.description = "解析指定格式的日期时间字符串，并在您选择的时区中显示以下信息：<ul><li>日期</li><li>时间</li><li>时段（AM/PM）</li><li>时区</li><li>UTC 偏移</li><li>夏令时</li><li>闰年</li><li>本月天数</li><li>年中第几天</li><li>周数</li><li>季度</li></ul>如需查看格式字符串示例，请在没有输入的情况下运行。";
        this.infoURL = "https://momentjs.com/docs/#/parsing/string-format/";
        this.inputType = "string";
        this.outputType = "html";
        this.args = [
            {
                "name": "Built in formats",
                "type": "populateOption",
                "value": DATETIME_FORMATS,
                "target": 1
            },
            {
                "name": "Input format string",
                "type": "binaryString",
                "value": "DD/MM/YYYY HH:mm:ss"
            },
            {
                "name": "Input timezone",
                "type": "option",
                "value": ["UTC"].concat(moment.tz.names())
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {html}
     */
    run(input, args) {
        const inputFormat = args[1],
            inputTimezone = args[2];
        let date,
            output = "";

        try {
            date = moment.tz(input, inputFormat, inputTimezone);
            if (!date || date.format() === "Invalid date") throw Error;
        } catch (err) {
            return `Invalid format.\n\n${FORMAT_EXAMPLES}`;
        }

        output += "Date: " + date.format("dddd Do MMMM YYYY") +
            "\nTime: " + date.format("HH:mm:ss") +
            "\nPeriod: " + date.format("A") +
            "\nTimezone: " + date.format("z") +
            "\nUTC offset: " + date.format("ZZ") +
            "\n\nDaylight Saving Time: " + date.isDST() +
            "\nLeap year: " + date.isLeapYear() +
            "\nDays in this month: " + date.daysInMonth() +
            "\n\nDay of year: " + date.dayOfYear() +
            "\nWeek number: " + date.week() +
            "\nQuarter: " + date.quarter();

        return output;
    }

}

export default ParseDateTime;
