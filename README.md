# baht.js but it is in C

[![](https://img.shields.io/npm/v/baht.c.svg?maxAge=3600)](https://www.npmjs.com/package/baht.c)
[![](https://img.shields.io/npm/dt/baht.c.svg?maxAge=3600)](https://www.npmjs.com/package/baht.c)

Inspired by [narze/baht.js](https://github.com/narze/baht.js)

_(Not sponsored)_ baht.js is fast and lightweight library for converting
number into thai baht

But my Question is, can anything faster than baht.js?

What about instead of writing it in JavaScript, I write it in WebAssembly using C?

**TL;DR** It is slow and unreliable, WebAssembly is not suitable for small things, I guess.

## Benchmark

AMD Ryzen 9 5900HS Plugged in, Performance Mode (ROG Armoury Crate)

**Loading WebAssembly**: 5.26 ms

**Note**: Each iteration has about 46 string cases and 24 int32 cases

| Iteration | baht.js (ms) | baht.c (ms) |
| --------- | ------------ | ----------- |
| VERSION   | 0.6.1        | 0.2.0       |
| x1        | 0.27         | 1.04        |
| x10       | 0.46         | 3.97        |
| x100      | 4.24         | 12.41       |
| x1000     | 14.33        | 84.01       |
| x10000    | 88.68        | Memory Full |
| x100000   | 881.19       | Memory Full |

## How to use

### Current Limitation

- It does not support double yet, (only int32 and string)

- You cannot use this too much (more than 100,000 times) otherwise memory will full, there is memory freeing but that still did not completely fix the issues

### Example

```ts
import { ready, baht_str, baht_str_unsafe } from "baht.c";

// WebAssembly needs to load, which is why function are async
// unsafe functions are sync and will return null if WebAssembly is not loaded
// You can `await ready` to ensure it is initialized
console.log(await baht_str("12345"));
console.log(baht_str_unsafe("12345"));
// หนึ่งหมื่นสองพันสามร้อยสี่สิบห้าบาทถ้วน
```

### Correctness

Based on testing (See test/baht.spec.js), for *valid input*, it passed the test,
but I cannot guarantee the correctness of this library.

PS. This library is developed by TDD, meaning I tweak it until it pass all tests 😂

*and you should not use this library, use [baht.js](https://github.com/narze/baht.js) instead*

### Browser Support

This library supports browser, however, up to your module bundler, a tweak
might required to make it work. Good luck!

- If your bundler complain about `path` and `fs`, go to build.js and replace
`require("path")` stuff with any value.

- Your bundler may not bundle the wasm, you need to manually copy it.

*and again, why you would want to use this library?*
