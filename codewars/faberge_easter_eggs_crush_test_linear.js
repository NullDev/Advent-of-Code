// @ts-nocheck
/* eslint-disable */

// https://www.codewars.com/kata/5976c5a5cd933a7bbd000029

const MOD = 998244353n;
const inv = [0n, 1n];

function ensureInv(maxN){
    for (let i = inv.length; i <= maxN; i++){
        const bi = BigInt(i);
        const idx = Number(MOD % bi);
        inv[i] = (MOD - (MOD / bi)) * inv[idx] % MOD;
    }
}

function height(n, m){
    let N = BigInt(n);
    const M = BigInt(m);

    if (N <= 0n || M <= 0n) return 0n;
    if (N > M) N = M;

    const maxK = Number(N);
    if (maxK === 0) return 0n;

    ensureInv(maxK);

    let Mmod = M % MOD;
    if (Mmod < 0n) Mmod += MOD;

    let comb = 1n;
    let res = 0n;

    for (let k = 1; k <= maxK; k++){
        const kBig = BigInt(k);
        let factor = Mmod - (kBig - 1n);
        if (factor < 0n) factor += MOD;

        comb = comb * factor % MOD;
        comb = comb * inv[k] % MOD;

        res += comb;
        if (res >= MOD) res -= MOD;
    }

    return res;
}
