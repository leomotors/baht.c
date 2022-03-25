# baht.js but it is in C

[![](https://img.shields.io/npm/v/baht.c.svg?maxAge=3600)](https://www.npmjs.com/package/baht.c)
[![](https://img.shields.io/npm/dt/baht.c.svg?maxAge=3600)](https://www.npmjs.com/package/baht.c)

Inspired by [narze/baht.js](https://github.com/narze/baht.js)

_(Not sponsored)_ baht.js is fast and lightweight library for converting
number into thai baht

But my Question is, can anything faster than baht.js?

What about instead of writing it in JavaScript, I write it in WebAssembly using C?

**TL;DR** It is slow and unreliable

## Benchmark

AMD Ryzen 9 5900HS Plugged in, Performance Mode (ROG Armoury Crate)

**Loading WebAssembly**: 6.02 ms

**Note**: Using `String` as input because number is not done yet

| Iteration | baht.js (ms) | baht.c (ms) |
| --------- | ------------ | ----------- |
| x1        | 0.25         | 0.97        |
| x10       | 0.37         | 2.67        |
| x100      | 4.20         | 8.63        |
| x1000     | 10.37        | Memory Full |
| x10000    | 73.32        | Memory Full |
| x100000   | 736.56       | Memory Full |

### My Assumption

WebAssembly is not suitable for small things

## How to use

### Current Limitation

- It works only for valid string currently, number soon (or may not if I am lazy)

- You cannot use this too much otherwise memory will full
(Note: I have tried `free`ing the memory, it results in **_SEGmentation Fault_**)

### Example

```ts
import { ready, baht_str, baht_str_unsafe } from "baht.c";

// WebAssembly needs to load, which is why function are async
// unsafe functions are sync and will return null if WebAssembly
// You can `await ready` to ensure it is initialized
console.log(await baht_str("12345"));
console.log(baht_str_unsafe("12345"));
// หนึ่งหมื่นสองพันสามร้อยสี่สิบห้าบาทถ้วน
```

### Correctness

For valid string, based on testing (See test/baht.spec.js), it passed the test,
but I cannot guarantee the correctness of this library.

PS v0.1 is developed by TDD, meaning I tweak it until it pass all tests 😂

*and you should not use this library, use [baht.js](https://github.com/narze/baht.js) instead*
