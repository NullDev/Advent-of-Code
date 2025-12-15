// @ts-nocheck
/* eslint-disable */

// https://www.codewars.com/kata/5a08b22b32b8b96f4700001c

function modPow(base, exp, mod){
    let res = 1n, x = base % mod;
    while (exp){
        if (exp & 1n) res = BigInt((res * BigInt(x)) % mod);
        x = (x * x) % mod;
        exp >>= 1n;
    }
    return res;
}

function totient(nBig){
    let n = Number(nBig);
    let result = n;
    for (let p = 2; p * p <= n; p += (p === 2 ? 1 : 2)){
        if (n % p === 0){
            while (n % p === 0) n /= p;
            result -= result / p;
        }
    }
    if (n > 1) result -= result / n;
    return result;
}

function isHuge(bBig, eBig, limitBig){
    if (eBig === 0n) return limitBig <= 1n;
    if (bBig >= limitBig) return true;
    return Number(eBig) * Math.log(Number(bBig)) >= Math.log(Number(limitBig));
}

function helper(b, h, m){
    if (m === 1n) return { value: 0n, big: true };
    if (h === 0n) return { value: 1n, big: m <= 1n };
    if (h === 1n) return { value: b % m, big: b >= m };

    const phi = BigInt(totient(m));
    const { value: expMod, big: expBig } = helper(b, h - 1n, phi);
    const exponent = expMod + (expBig ? phi : 0n);

    return { value: modPow(b % m, exponent, m), big: expBig || isHuge(b, exponent, m) };
}

function tower(base, height, modulus){
    base = BigInt(base);
    height = BigInt(height);
    modulus = BigInt(modulus);

    if (modulus === 1n) return 0n;
    if (height === 0n) return 1n;
    if (height === 1n || base === 1n) return base % modulus;

    return helper(base, height, modulus).value;
}
