const wasmModule = require("./build");

const commands = {
    baht: undefined,
    bahtStr: undefined,
    toStr: undefined,
    toCStr: undefined,
};

let initialized = false;

async function loadModules() {
    console.log("Module is loaded");
    const mod = await wasmModule();
    commands.baht = mod._baht;
    commands.bahtStr = mod._bahtStr;
    commands.toStr = mod.UTF8ToString;
    commands.toCStr = mod.stringToUTF8;
    initialized = true;
}

function run(key) {
    return async (...args) => {
        if (initialized) return commands.toStr(commands[key](...args));

        await loadModules();

        return commands.toStr(commands[key](...args));
    };
}

function runFromStr(key) {
    return async (str) => {
        if (initialized)
            return commands.toStr(commands[key](commands.toCStr(str)));

        await loadModules();

        return commands.toStr(commands[key](commands.toCStr(str)));
    };
}

loadModules();

module.exports = {
    load: loadModules,
    baht: run("baht"),
    baht32: run("baht"),
    bahtStr: runFromStr("bahtStr"),
};
