const { ready, baht, baht_i64, baht_str } = require("../dist");
const { performance } = require("perf_hooks");

const { assert } = require("chai");

describe("Test Function", () => {
    it("Test Function", () =>
        (async () => {
            await ready;
            const now = performance.now();
            console.log(`Total Usage: ${performance.now() - now} ms`);

            for (let i = 0; i < 10000; i++) await baht_str("123456");

            console.log("baht (baht_i64) " + (await baht(12345423)));
            console.log("baht_i64 " + (await baht_i64(12345423)));
            // console.log("baht_str " + (await baht_str("14389141")));

            console.log(`Total Usage: ${performance.now() - now} ms`);
        })());
});
