// @ts-check

/// <reference types="emscripten" />

// @ts-ignore
const unloadedWasmModule = require("./build");

const ready = loadModules();

/** @type {EmscriptenModule} */
let wasmModule;

/** @type {typeof UTF8ToString} */
let toString;
/** @type {typeof stringToUTF8} */
let toUTF8;

let initialized = false;

async function loadModules() {
    console.log("Module is loaded");

    wasmModule = await unloadedWasmModule();
    console.log({ wasmModule });
    toString = wasmModule["UTF8ToString"];
    toUTF8 = wasmModule["stringToUTF8"];

    initialized = true;
}

/**
 * Get String from Pointer and Free the Memory
 *
 * @param {number} ptr
 * @returns {string}
 */
function safeGetString(ptr) {
    const str = toString(ptr);
    wasmModule["_freeMemory"](ptr);
    return str;
}

function run(key) {
    return async (...args) => {
        if (!initialized) await ready;

        return safeGetString(wasmModule["_" + key](...args));
    };
}

function runFromStr(key) {
    return async (str) => {
        if (!initialized) await ready;

        let alloced = wasmModule["_allocate"](str.length * 4 + 1);

        toUTF8(str, alloced, str.length * 4 + 1);

        return safeGetString(wasmModule["_" + key](alloced));
    };
}

function unsafeRun(key) {
    return (...args) => {
        if (!initialized) return null;

        return safeGetString(wasmModule["_" + key](...args));
    };
}

module.exports = {
    ready,
    baht: run("baht_i64"),
    baht_i64: run("baht_i64"),
    baht_str: runFromStr("baht_str"),
    baht_unsafe: unsafeRun("baht_i64"),
    baht_i64_unsafe: unsafeRun("baht_i64"),
};
