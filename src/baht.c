#include <emscripten.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

#define export EMSCRIPTEN_KEEPALIVE

// * Max Size is "หนึ่ง" at 15 bytes
const char *DIGITS[] = {"ศูนย์", "หนึ่ง", "สอง", "สาม", "สี่",
                        "ห้า",  "หก",  "เจ็ด", "แปด", "เก้า"};

// * Max Size is "หมื่น" at 15 bytes
const char *TENS[] = {"", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน"};

#define BAHT "บาท"
#define SATANG "สตางค์"

void swap(char *a, char *b) {
    char tmp = *a;
    *a = *b;
    *b = tmp;
}

// * Reverse String (Mutates String)
void reverseMutStr(char *str, int n) {
    for (int p = 0; p < n - n / 2; p++) {
        swap(str + p, str + n - 1 - p);
    }
}

char *numberToRevStr(int64_t n) {
    char *res = malloc(sizeof(res) * 25);

    int i = 0;
    while (n > 0) {
        res[i] = n % 10 + '0';
        n /= 10;
        i++;
    }

    return res;
}

char *concatStr(char *dest, char *src) {
    for (char *p = src; *p; p++) {
        *dest++ = *p;
    }
    return dest;
}

char *baht_i64(int64_t n);
char *baht_str(char *str);

export char *baht_i64(int64_t n) {
    return baht_str(numberToRevStr(n));
}

export char *baht_str(char *str) {
    int strLen = strlen(str);
    reverseMutStr(str, strLen);

    char *result = malloc(sizeof(result) * (strLen + 1) * 15);
    char *curr = result;

    for (int i = 0; i < strLen; i++) {
        curr = concatStr(curr, (char *)DIGITS[str[i] - '0']);
    }

    return result;
}

export char *allocate(int size) {
    return malloc(size);
}

export void freeMemory(char *loc) {
    free(loc);
}
