#include <emscripten.h>
#include <stdbool.h>
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
#define WHOLE "ถ้วน"
#define BAHTWHOLE "บาทถ้วน"
#define L20 "ยี่สิบ"
#define ED "เอ็ด"
#define DOT "จุด"
#define NEG "ลบ"

void swap(char *a, char *b) {
    char tmp = *a;
    *a = *b;
    *b = tmp;
}

/**
 * @brief Reverse the String (mutates the original string)
 * @param str String to reverse
 * @param n Length of str
 * @returns str 
 */
char *reverseMutStr(char *str, int n) {
    for (int p = 0; p < n - n / 2; p++) {
        swap(str + p, str + n - 1 - p);
    }
    return str;
}

// * Convert Number to reverse string
char *numberToRevStr(int32_t n) {
    char *res = malloc(sizeof(res) * 15);

    int i = 0;

    bool isNeg = false;

    if (n < 0) {
        isNeg = true;
        n = -n;
    }

    while (n > 0) {
        res[i] = n % 10 + '0';
        n /= 10;
        i++;
    }

    if (isNeg) {
        res[i] = '-';
        i++;
    }

    res[i] = '\0';

    return res;
}

/**
 * @param dest Target String
 * @param src Source String
 * @returns Pointer to past the end of concatenated destination string 
 */
char *concatStr(char *dest, const char *src) {
    for (const char *p = src; *p != '\0'; p++) {
        *dest++ = *p;
    }
    return dest;
}

char *baht_i32(int32_t n);
char *baht_str(char *str);
char *_baht_str(char *str, bool skipCheck);

export char *baht_i32(int32_t n) {
    char *str = numberToRevStr(n);
    return _baht_str(reverseMutStr(str, strlen(str)), true);
}

export char *baht_str(char *str) {
    return _baht_str(str, false);
}

/**
 * @param str String to convert to baht
 * @param skipCheck Skip check for illegal string pattern
 */
char *_baht_str(char *str, bool skipCheck) {
    int strLen = strlen(str);

    char *result = malloc(sizeof(result) * (strLen * 3) * 15);
    char *curr = result;
    char *emcomp = result;

    int dotpos;
    for (dotpos = 0; str[dotpos] != '\0'; dotpos++) {
        if (str[dotpos] == '.') {
            break;
        }
    }

    int i = 0;
    if (*str == '-') {
        i++;
        curr = concatStr(curr, NEG);
        emcomp = curr;
    }

    bool isLeadingZeros = true;

    for (; i < dotpos; i++) {
        int unit = str[i] - '0';

        if (!skipCheck) {
            if (unit < 0 || unit > 9) {
                free(result);
                return "";
            }

            if (!unit && isLeadingZeros)
                continue;

            if (unit)
                isLeadingZeros = false;
        }

        bool isEmpty = !(curr - emcomp);
        int digits = dotpos - i - 1;
        if (unit) {
            // * ยี่สิบ
            if (unit == 2 && (digits % 6 == 1)) {
                curr = concatStr(curr, L20);
                continue;
            }

            // * เอ็ด
            if (!(digits % 6) && unit == 1 && !isEmpty)
                curr = concatStr(curr, ED);
            else if ((digits % 6) != 1 || unit != 1)
                curr = concatStr(curr, DIGITS[unit]);
            if (digits)
                curr = concatStr(curr, TENS[digits % 6 ? digits % 6 : 6]);
        } else if (digits && digits % 6 == 0) {
            curr = concatStr(curr, TENS[6]);
        }
    }

    if (!(curr - emcomp) && dotpos == strLen)
        curr = concatStr(curr, DIGITS[0]);

    if (dotpos != strLen) {
        if (curr - emcomp)
            curr = concatStr(curr, BAHT);
        int sibst = str[dotpos + 1] - '0';

        if (sibst == 2) {
            curr = concatStr(curr, L20);
        } else if (sibst != 1 && sibst) {
            curr = concatStr(curr, DIGITS[str[dotpos + 1] - '0']);
        }

        if (sibst && sibst != 2)
            curr = concatStr(curr, TENS[1]);

        int onest = dotpos + 2 < strLen ? str[dotpos + 2] - '0' : 0;
        if (dotpos + 2 < strLen) {
            if (onest == 1 && sibst)
                curr = concatStr(curr, ED);
            else if (onest)
                curr = concatStr(curr, DIGITS[onest]);
        }

        if (sibst || onest)
            curr = concatStr(curr, SATANG);
        else
            curr = concatStr(curr, WHOLE);
    } else {
        curr = concatStr(curr, BAHTWHOLE);
    }

    *curr = '\0';

    return result;
}

export char *allocate(int size) {
    return malloc(size);
}

export void freeMemory(char *loc) {
    free(loc);
}
