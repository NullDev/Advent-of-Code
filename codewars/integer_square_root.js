// @ts-nocheck
/* eslint-disable */

// https://www.codewars.com/kata/58a3fa665973c2a6e80000c4

const stripLeadingZeros = (s) => {
    const x = s.replace(/^0+/, "");
    return x === "" ? "0" : x;
};

const cmp = (ax, bx) => {
    const a = stripLeadingZeros(ax);
    const b = stripLeadingZeros(bx);
    if (a.length !== b.length) return a.length < b.length ? -1 : 1;
    if (a === b) return 0;
    return a < b ? -1 : 1;
};

const mulSmall = (a, m) => {
    if (m === 0 || a === "0") return "0";
    let carry = 0;
    let res = "";
    for (let i = a.length - 1; i >= 0; i--) {
        const prod = (a.charCodeAt(i) - 48) * m + carry;
        res = (prod % 10) + res;
        carry = (prod / 10) | 0;
    }
    while (carry > 0) {
        res = (carry % 10) + res;
        carry = (carry / 10) | 0;
    }
    return stripLeadingZeros(res);
};

const sub = (a, b) => {
    let res = "";
    let carry = 0;
    let i = a.length - 1;
    let j = b.length - 1;

    while (i >= 0 || j >= 0) {
        const x = i >= 0 ? a.charCodeAt(i) - 48 : 0;
        const y = j >= 0 ? b.charCodeAt(j) - 48 : 0;
        let diff = x - y - carry;
        if (diff < 0) {
            diff += 10;
            carry = 1;
        }
        else  carry = 0;
        res = diff + res;
        i--;
        j--;
    }

    return stripLeadingZeros(res);
};

const addSmall = (a, d) => {
    let carry = d;
    let res = "";
    for (let i = a.length - 1; i >= 0; i--) {
        const sum = (a.charCodeAt(i) - 48) + carry;
        res = (sum % 10) + res;
        carry = (sum / 10) | 0;
    }
    if (carry) res = carry + res;
    return stripLeadingZeros(res);
};

function integerSquareRoot(num) {
    const N = stripLeadingZeros(num);
    if (N === "0" || N === "1") return N;

    const groups = [];
    const len = N.length;
    let pos = len % 2 === 0 ? 0 : 1;
    if (pos === 1) groups.push(N[0]);
    for (; pos < len; pos += 2) groups.push(N.slice(pos, pos + 2));

    let result = "";
    let rem = "0";

    for (const g of groups) {
        rem = (rem === "0") ? String(parseInt(g, 10)) : rem + g.padStart(2, "0");
        rem = stripLeadingZeros(rem);

        const p = result === "" ? "0" : mulSmall(result, 20);

        // find largest digit x in [0..9] such that (p + x) * x <= rem
        let xDigit = 0;
        for (let d = 0; d <= 9; d++) {
            const px = (p === "0" && d === 0) ? "0" : addSmall(p, d);
            const prod = mulSmall(px, d);
            if (cmp(prod, rem) <= 0) xDigit = d;
            else break;
        }

        const pxFinal = addSmall(p, xDigit);
        const pxTimesX = mulSmall(pxFinal, xDigit);
        rem = sub(rem, pxTimesX);
        result += String(xDigit);
    }

    return stripLeadingZeros(result);
}
