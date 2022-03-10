const { baht, baht32, bahtStr } = require("../dist");
const { performance } = require("perf_hooks");

const { assert } = require("chai");

describe("Test Function", () => {
    it("Test Function", () =>
        (async () => {
            const now = performance.now();
            console.log(`Total Usage: ${performance.now() - now} ms`);

            console.log(await baht(12345423));
            console.log(await baht32(12345423));
            console.log(await bahtStr("14389141"));

            console.log(`Total Usage: ${performance.now() - now} ms`);
        })());
});
