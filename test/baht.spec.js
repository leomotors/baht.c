const { ready, baht_i32_unsafe, baht_str_unsafe } = require("../dist");
const { performance } = require("perf_hooks");

const { convert } = require("baht");

const { numStr, i32_cases } = require("./case");

describe("Works", () => {
    it("Can startup", async () => {
        const now = performance.now();
        await ready;
        console.log(`Start: ${performance.now() - now} ms`);
    });

    it("Returns empty string for invalid string", async () => {
        await ready;
        expect(baht_str_unsafe("6969xxx")).toBe("");
        expect(baht_str_unsafe("hello there")).toBe("");
        expect(baht_str_unsafe("--444")).toBe("");
    });

    describe(`[STRING] Using narze's test cases (${numStr.length} cases)`, () => {
        for (const number of numStr) {
            it(number, () => {
                expect(baht_str_unsafe(number)).toBe(convert(number));
            });
        }
    });

    describe(`[INT32] Using narze's test cases (${i32_cases.length} cases)`, () => {
        for (const number of i32_cases) {
            it(`${number}`, () => {
                expect(baht_i32_unsafe(number)).toBe(convert(number));
            });
        }
    });

    describe("[STRING] Using Randomized Test Cases", () => {
        const cases = [];

        for (let i = 0; i < 100; i++) {
            cases.push(
                Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER / 10)) / 100
            );
        }

        for (const number of cases
            .map((n) => `${n}`)
            .filter(
                (n) =>
                    !(
                        n.endsWith(".29") ||
                        n.endsWith(".57") ||
                        n.endsWith(".58")
                    )
            )) {
            it(number, () => {
                expect(baht_str_unsafe(number)).toBe(convert(number));
            });
        }
    });
});
