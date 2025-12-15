// @ts-nocheck
/* eslint-disable */

// https://www.codewars.com/kata/65de16794ccda6356de32bfa

const gcd = (a, b) => {
    while (b) [a, b] = [b, a % b];
    return a;
};
const lcm = (a, b) => a / gcd(a, b) * b;

// Fast-doubling Fibonacci (returns [F(n), F(n+1)] mod m)
// https://www.nayuki.io/page/fast-fibonacci-algorithms
const fibPair = function(n, m){
    let a = 0n; let b = 1n;
    for (let bit = BigInt(n.toString(2).length - 1); bit >= 0n; bit--){
        const d = (a * ((b * 2n % m) - a + m)) % m;
        const e = (a * a + b * b) % m;
        [a, b] = ((n >> bit) & 1n) ? [e, (d + e) % m] : [d, e];
    }
    return [a, b];
};

const modPow = function(base, exp, mod){
    let res = 1n;
    for(;exp; exp >>= 1n){
        if (exp & 1n) res = res * base % mod;
        base = base * base % mod;
    }
    return res;
};

// Miller–Rabin on 64-bit-size BigInts (deterministic base set)
// https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test
const isPrime = function(n){
    if (n < 2n) return false;
    for (const p of [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n]){if (n === p) return true; else if (n % p === 0n) return false;}
    let d = n - 1n; let s = 0n; while (!(d & 1n)){d >>= 1n; s++;}
    const bases = [2n, 3n, 5n, 7n, 11n];
    Witness: for (const a of bases){
        if (a % (n - 1n) === 0n) continue;
        let x = modPow(a, d, n);
        if (x === 1n || x === n - 1n) continue;
        for (let r = 1n; r < s; r++){
            x = x * x % n;
            if (x === n - 1n) continue Witness;
        }
        return false;
    }
    return true;
};

// Pollard-ρ (Brent variant)
// https://en.wikipedia.org/wiki/Pollard%27s_rho_algorithm
const rho = function(n){
    if (n % 2n === 0n) return 2n;
    if (isPrime(n)) return n;

    const f = (x, c, n) => (x * x + c) % n;

    while (true){
        let x = 2n; let y = 2n;
        const c = BigInt(Math.floor(Math.random() * 10) + 1);
        let d = 1n;

        while (d === 1n){
            x = f(x, c, n);
            y = f(f(y, c, n), c, n);
            d = gcd((x > y ? x - y : y - x), n);
        }

        if (d !== n) return d;
    }
};

// factorisation
const factor = function(n, res = new Map()){
    if (n === 1n) return res;
    if (isPrime(n)){
        res.set(n, (res.get(n) || 0n) + 1n);
        return res;
    }
    const d = rho(n);
    factor(d, res) && factor(n / d, res);
    return res;
};

// Prime-level Pisano
const primePisano = function(p){
    if (p === 2n) return 3n;
    if (p === 5n) return 20n;

    // Bound (Euler criterion)
    // https://en.wikipedia.org/wiki/Euler%27s_criterion
    const sqrt5Residue = modPow(5n, (p - 1n) / 2n, p);
    const bound = (sqrt5Residue === 1n) ? p - 1n : 2n * (p + 1n);

    const f = Array.from(factor(bound)).map(([pr, e]) => [pr, Number(e)]);
    const divisors = [1n];
    for (const [pr, e] of f){
        const len = divisors.length;
        let pw = 1n;
        for (let i = 1; i <= e; i++){
            pw *= pr;
            for (let j = 0; j < len; j++) divisors.push(divisors[j] * pw);
        }
    }
    divisors.sort((x, y)=> Number(x - y));

    for (const d of divisors){
        const [f0, f1] = fibPair(d, p);
        if (f0 === 0n && f1 === 1n) return d;
    }

    return 0n;
};

function pisanoPeriod(n){
    const n_ = BigInt(n);
    if (n_ === 1n) return 1n;

    const primeFactors = factor(n_);
    let period = 1n;
    for (const [p, e] of primeFactors) period = BigInt(lcm(period, primePisano(p) * (p ** (e - 1n))));
    return period;
}