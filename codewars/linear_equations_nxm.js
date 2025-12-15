// @ts-nocheck
/* eslint-disable */

// https://www.codewars.com/kata/56464cf3f982b2e10d000015

class Frac {
    constructor(n, d = 1n){
        let a = BigInt(n), b = BigInt(d);
        if (b < 0n) ((a = -a) || 1) && (b = -b);
        const g = Frac.#gcd(a < 0n ? -a : a, b);
        this.n = a / g;
        this.d = b / g;
    }
    static #gcd(a, b){
        while (b) [a, b] = [b, a % b];
        return a;
    }
    static parse(tok){
        if (tok.includes("/")){
            const [p, q] = tok.split("/").map(BigInt);
            return new Frac(p, q);
        }
        return new Frac(BigInt(tok), 1n);
    }
    add = o => new Frac(this.n * o.d + o.n * this.d, this.d * o.d);
    sub = o => new Frac(this.n * o.d - o.n * this.d, this.d * o.d);
    mul = o => new Frac(this.n * o.n, this.d * o.d);
    div = o => new Frac(this.n * o.d, this.d * o.n);
    neg = () => new Frac(-this.n, this.d);
    isZero = () => this.n === 0n;
    toString = () => this.d === 1n ? String(this.n) : `${this.n}/${this.d}`;
}

// Gauss-Jordan RREF over Q
function rref(mat, R, C){
    const pivRows = [], pivCols = [];
    let r = 0;
    for (let c = 0; c < C && r < R; ++c){
        let sel = -1;
        for (let i = r; i < R; ++i) if (!mat[i][c].isZero()) {
            sel = i;
            break;
        }
        if (sel === -1) continue;
        [mat[r], mat[sel]] = [mat[sel], mat[r]];
        const inv = new Frac(1n).div(mat[r][c]);
        for (let j = c; j < mat[0].length; ++j) mat[r][j] = mat[r][j].mul(inv);
        for (let i = 0; i < R; ++i){
            if (i !== r && !mat[i][c].isZero()){
                const f = mat[i][c];
                for (let j = c; j < mat[0].length; ++j) mat[i][j] = mat[i][j].sub(f.mul(mat[r][j]));
            }
        }
        pivRows.push(r); pivCols.push(c); ++r;
    }
    return { pivRows, pivCols };
}

function solve(input){
    const inp = input.trim();
    const rows = inp.split("\n").map(s => s.trim()).filter(Boolean);
    const M = rows.length;
    const N = rows[0].split(/\s+/).length - 1;
    const A = rows.map(l => l.split(/\s+/).map(Frac.parse));
    const { pivRows, pivCols } = rref(A, M, N);

    for (let i = 0; i < M; ++i){
        if (A[i].slice(0, N).every(f => f.isZero()) && !A[i][N].isZero()) return "SOL=NONE";
    }

    const isPiv = Array(N).fill(false);
    pivCols.forEach(c => (isPiv[c] = true));
    const part = Array.from({ length: N }, () => new Frac(0n));
    pivCols.forEach((c, idx) => (part[c] = A[pivRows[idx]][N]));

    const vecStr = v => "(" + v.map(fr => fr.toString()).join("; ") + ")";
    let out = "SOL=" + vecStr(part);
    [...Array(N).keys()].filter(c => !isPiv[c]).map(f => {
        const v = Array.from({ length: N }, () => new Frac(0n));
        v[f] = new Frac(1n);
        pivCols.forEach((c, idx) => (v[c] = A[pivRows[idx]][f].neg()));
        return v;
    }).forEach((v, i) => (out += " + q" + (i + 1) + "*" + vecStr(v)));
    return out;
}
