const { ready, baht_str_unsafe } = require("../dist");

const { convert } = require("baht");

const numbers = require("./case").map((n) => `${n}`);

/**
 * @param {number} iter
 * @param {() => void} func
 * @param {string} name
 */
function run(iter, func, name) {
    const now = performance.now();
    try {
        for (let i = 0; i < iter; i++) {
            for (const number of numbers) func(number);
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
    console.log(`Cold Start finished in ${performance.now() - now} ms`);

    for (const it of [1, 10, 100, 1_000, 10_000, 100_000]) {
        run(it, convert, "baht.js");
        run(it, baht_str_unsafe, "baht.c");
        console.log();
    }
}

main();
