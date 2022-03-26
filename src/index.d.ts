// * Asynchronous Functions
/**
 * @param n **32 bit** Integer
 * @returns Promise of result string, empty string if invalid
 */
export declare function baht(n: number): Promise<string>;

/**
 * @param n **32 bit** Integer
 * @returns Promise of result string, empty string if invalid
 */
export declare function baht_i32(n: number): Promise<string>;

/**
 * @param n Number String
 * @returns Promise of result string, empty string if invalid
 */
export declare function baht_str(n: string): Promise<string>;

// * Unsafe Functions
/**
 * @param n **32 bit** Integer
 * @returns Result string, empty string if invalid,
 * **`null` if WebAssembly is not ready**
 */
export declare function baht_unsafe(n: number): string | null;

/**
 * @param n **32 bit** Integer
 * @returns Result string, empty string if invalid,
 * **`null` if WebAssembly is not ready**
 */
export declare function baht_i32_unsafe(n: number): string | null;

/**
 * @param n Number String
 * @returns Result string, empty string if invalid,
 * **`null` if WebAssembly is not ready**
 */
export declare function baht_str_unsafe(n: string): string | null;

/** A Promise that resolves when WebAssembly is Ready */
export declare const ready: Promise<void>;
