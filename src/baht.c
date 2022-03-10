#include <emscripten.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

#define export EMSCRIPTEN_KEEPALIVE

// * Max Size is "หนึ่ง" at 15 bytes
const char *DIGITS[] = {"หนึ่ง", "สอง", "สาม", "สี่",  "ห้า",
                        "หก",  "เจ็ด", "แปด", "เก้า"};

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

char *numberToRevStr(int32_t n) {
    char *res = malloc(sizeof(res) * 15);

    int i = 0;
    while (n > 0) {
        res[i] = n % 10 + '0';
        n /= 10;
        i++;
    }

    return res;
}

char *baht(int32_t n);
char *bahtStr(char *str);

export char *baht(int32_t n) {
    return bahtStr(numberToRevStr(n));
}

export char *bahtStr(char *str) {
    reverseMutStr(str, strlen(str));
    return str;
}
