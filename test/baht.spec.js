const { ready, baht_str_unsafe } = require("../dist");
const { performance } = require("perf_hooks");

const { convert } = require("baht");

const numbers = require("./case");

describe("Works", () => {
    it("Can startup", async () => {
        const now = performance.now();
        await ready;
        console.log(`Start: ${performance.now() - now} ms`);
    });

    describe(`Using narze's test case (${numbers.length} test cases)`, () => {
        for (const number of numbers.map((n) => `${n}`)) {
            it(number, () => {
                expect(baht_str_unsafe(number)).toBe(convert(number));
            });
        }
    });

    describe("Using Randomized Test Case", () => {
        const cases = [];

        for (let i = 0; i < 100; i++) {
            cases.push(
                Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER / 10)) / 100
            );
        }

        for (const number of cases.map((n) => `${n}`)) {
            it(number, () => {
                expect(baht_str_unsafe(number)).toBe(convert(number));
            });
        }
    });
});
