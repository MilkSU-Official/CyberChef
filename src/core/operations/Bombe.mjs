/**
 * Emulation of the Bombe machine.
 *
 * Tested against the Bombe Rebuild at Bletchley Park's TNMOC
 * using a variety of inputs and settings to confirm correctness.
 *
 * @author s2224834
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import { isWorkerEnvironment } from "../Utils.mjs";
import { BombeMachine } from "../lib/Bombe.mjs";
import { ROTORS, ROTORS_FOURTH, REFLECTORS, Reflector } from "../lib/Enigma.mjs";

/**
 * Bombe operation
 */
class Bombe extends Operation {
    /**
     * Bombe constructor
     */
    constructor() {
        super();

        this.name = "Bombe";
        this.module = "Bletchley";
        this.description = "模拟在布莱切利公园用于攻击 Enigma 的 Bombe 机器，基于波兰和英国密码学家的工作。<br><br>要运行此操作，您需要有一个'已知明文'（crib），这是目标密文块的一些已知明文，并且知道使用的转子。（如果您不知道转子，请参阅'Bombe (multiple runs)'操作。）机器将建议 Enigma 的可能配置。每个建议都有转子起始位置（从左到右）和已知的插板对。<br><br>选择已知明文：首先，请注意 Enigma 不能将字母加密为其自身，这允许您排除可能的已知明文的某些位置。其次，Bombe 不模拟 Enigma 的中间转子步进。您的已知明文越长，其中发生步进的可能性就越大，这将阻止攻击工作。但是，除此之外，较长的已知明文通常更好。攻击产生一个'菜单'，将密文字母映射到明文，目标是产生'循环'：例如，使用密文 ABC 和已知明文 CAB，我们有映射 A&lt;-&gt;C、B&lt;-&gt;A 和 C&lt;-&gt;B，这产生了一个循环 A-B-C-A。循环越多越好。该操作将输出此内容：如果您的菜单循环太少或太短，通常会产生大量不正确的输出。尝试不同的已知明文。如果菜单看起来不错但没有产生正确答案，您的已知明文可能是错误的，或者您可能重叠了中间转子步进 - 尝试不同的已知明文。<br><br>输出不足以完全解密数据。您必须通过检查恢复插板设置的其余部分。并且未考虑环位置：这会影响中间转子何时步进。如果您的输出一开始是正确的，然后出错，请一起调整右侧转子上的环位置和起始位置，直到输出改善。如有必要，对中间转子重复此操作。<br><br>默认情况下，此操作在每次停止时运行检查机器，这是一个手动过程，用于验证 Bombe 停止的质量，丢弃失败的停止。如果您想查看硬件对于给定输入实际停止多少次，请禁用检查机器。<br><br>有关 Enigma、Typex 和 Bombe 操作的更详细描述<a href='https://github.com/gchq/CyberChef/wiki/Enigma,-the-Bombe,-and-Typex'>可以在这里找到</a>。";
        this.infoURL = "https://wikipedia.org/wiki/Bombe";
        this.inputType = "string";
        this.outputType = "JSON";
        this.presentType = "html";
        this.args = [
            {
                name: "Model",
                type: "argSelector",
                value: [
                    {
                        name: "3-rotor",
                        off: [1]
                    },
                    {
                        name: "4-rotor",
                        on: [1]
                    }
                ]
            },
            {
                name: "Left-most (4th) rotor",
                type: "editableOption",
                value: ROTORS_FOURTH,
                defaultIndex: 0
            },
            {
                name: "Left-hand rotor",
                type: "editableOption",
                value: ROTORS,
                defaultIndex: 0
            },
            {
                name: "Middle rotor",
                type: "editableOption",
                value: ROTORS,
                defaultIndex: 1
            },
            {
                name: "Right-hand rotor",
                type: "editableOption",
                value: ROTORS,
                defaultIndex: 2
            },
            {
                name: "Reflector",
                type: "editableOption",
                value: REFLECTORS
            },
            {
                name: "Crib",
                type: "string",
                value: ""
            },
            {
                name: "Crib offset",
                type: "number",
                value: 0
            },
            {
                name: "Use checking machine",
                type: "boolean",
                value: true
            }
        ];
    }

    /**
     * Format and send a status update message.
     * @param {number} nLoops - Number of loops in the menu
     * @param {number} nStops - How many stops so far
     * @param {number} progress - Progress (as a float in the range 0..1)
     */
    updateStatus(nLoops, nStops, progress) {
        const msg = `Bombe run with ${nLoops} loop${nLoops === 1 ? "" : "s"} in menu (2+ desirable): ${nStops} stops, ${Math.floor(100 * progress)}% done`;
        self.sendStatusMessage(msg);
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const model = args[0];
        const reflectorstr = args[5];
        let crib = args[6];
        const offset = args[7];
        const check = args[8];
        const rotors = [];
        for (let i=0; i<4; i++) {
            if (i === 0 && model === "3-rotor") {
                // No fourth rotor
                continue;
            }
            let rstr = args[i + 1];
            // The Bombe doesn't take stepping into account so we'll just ignore it here
            if (rstr.includes("<")) {
                rstr = rstr.split("<", 2)[0];
            }
            rotors.push(rstr);
        }
        // Rotors are handled in reverse
        rotors.reverse();
        if (crib.length === 0) {
            throw new OperationError("Crib cannot be empty");
        }
        if (offset < 0) {
            throw new OperationError("Offset cannot be negative");
        }
        // For symmetry with the Enigma op, for the input we'll just remove all invalid characters
        input = input.replace(/[^A-Za-z]/g, "").toUpperCase();
        crib = crib.replace(/[^A-Za-z]/g, "").toUpperCase();
        const ciphertext = input.slice(offset);
        const reflector = new Reflector(reflectorstr);
        let update;
        if (isWorkerEnvironment()) {
            update = this.updateStatus;
        } else {
            update = undefined;
        }
        const bombe = new BombeMachine(rotors, reflector, ciphertext, crib, check, update);
        const result = bombe.run();
        return {
            nLoops: bombe.nLoops,
            result: result
        };
    }


    /**
     * Displays the Bombe results in an HTML table
     *
     * @param {Object} output
     * @param {number} output.nLoops
     * @param {Array[]} output.result
     * @returns {html}
     */
    present(output) {
        let html = `Bombe run on menu with ${output.nLoops} loop${output.nLoops === 1 ? "" : "s"} (2+ desirable). Note: Rotor positions are listed left to right and start at the beginning of the crib, and ignore stepping and the ring setting. Some plugboard settings are determined. A decryption preview starting at the beginning of the crib and ignoring stepping is also provided.\n\n`;
        html += "<table class='table table-hover table-sm table-bordered table-nonfluid'><tr><th>Rotor stops</th>  <th>Partial plugboard</th>  <th>Decryption preview</th></tr>\n";
        for (const [setting, stecker, decrypt] of output.result) {
            html += `<tr><td>${setting}</td>  <td>${stecker}</td>  <td>${decrypt}</td></tr>\n`;
        }
        html += "</table>";
        return html;
    }
}

export default Bombe;
