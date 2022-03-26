// @ts-check

const { ready, baht_i32_unsafe, baht_str_unsafe } = require("../dist");

const { convert } = require("baht");

const { numStr, i32_cases } = require("./case");

/**
 * @param {number} iter
 * @param {(s: any) => any} funcNum
 * @param {(s: any) => any} funcStr
 * @param {string} name
 */
function run(iter, funcNum, funcStr, name) {
    const now = performance.now();
    try {
        for (let i = 0; i < iter; i++) {
            for (const number of numStr) funcStr(number);
            for (const number of i32_cases) funcNum(number);
        }
        console.log(
            `PASS ${name}, ${iter} iterations: ${performance.now() - now} ms`
        );
    } catch (err) {
        console.log(
            `FAIL ${name} ${iter} iterations: Error in ${
                performance.now() - now
            } ms`
        );
    }
}

async function main() {
    const now = performance.now();
    await ready;
    console.log(`Cold Start finished in ${performance.now() - now} ms\n`);

    for (const it of [1, 10, 100, 1_000, 10_000, 100_000]) {
        run(it, convert, convert, "baht.js");
        run(it, baht_i32_unsafe, baht_str_unsafe, "baht.c");
        console.log();
    }
}

main();
