// @ts-nocheck
/* eslint-disable */

// https://www.codewars.com/kata/5993c1d917bc97d05d000068

function regexDivisibleBy(n){
    if (n === 1) return "^[01]+$";
    if ((n & (n - 1)) === 0) return "^" + "[01]*" + "0".repeat(Math.log2(n) | 0) + "$";

    const S = n, F = n + 1, M = n + 2;
    const R = Array.from({ length: M }, () => Array(M).fill(null));

    const alt = (a, b) => {
        if (a === null) return b;
        if (b === null) return a;
        if (a === b) return a;
        if (a === "[01]" || b === "[01]") return "[01]";
        if ((a === "0" && b === "1") || (a === "1" && b === "0")) return "[01]";
        return a < b ? a + "|" + b : b + "|" + a;
    };

    const isAtom = s => {
        if (s === null) return false;
        if (s === "" || s === "0" || s === "1" || s === "[01]") return true;
        if (s.includes("|")) return false;
        if (s.endsWith("*")) return true;
        if (s.startsWith("(?:") && s.endsWith(")")){
            let open = 0;
            for (const c of s){
                if (c === "(") open++;
                else if (c === ")") open--;
            }
            return open === 0;
        }
        return false;
    };

    const star = s => {
        if (s === null || s === "") return "";
        if (s === "0" || s === "1" || s === "[01]") return s + "*";
        if (!s.includes("|") && s.endsWith("*")) return s;
        return "(?:" + s + ")*";
    };

    const cat = (a, b) => {
        if (a === null || b === null) return null;
        if (a === "") return b;
        if (b === "") return a;
        if (!isAtom(a)) a = "(?:" + a + ")";
        if (!isAtom(b)) b = "(?:" + b + ")";
        return a + b;
    };

    // GNFA for remainders mod n
    for (let r = 0; r < n; r++){
        R[r][(2 * r) % n] = alt(R[r][(2 * r) % n], "0");
        R[r][(2 * r + 1) % n] = alt(R[r][(2 * r + 1) % n], "1");
    }

    R[S][0] = alt(R[S][0], "");
    R[0][F] = alt(R[0][F], "");

    // GNFA elimination
    for (let k = 0; k < n; k++){
        const loop = star(R[k][k]);
        for (let i = 0; i < M; i++){
            if (i === k) continue;
            if (R[i][k] === null) continue;
            for (let j = 0; j < M; j++){
                if (j === k) continue;
                if (R[k][j] === null) continue;
                R[i][j] = alt(R[i][j], cat(R[i][k], cat(loop, R[k][j])));
            }
        }
        for (let i = 0; i < M; i++) R[i][k] = R[k][i] = null;
    }

    const core = R[S][F] || "";
    return "^" + (isAtom(core) ? core : "(?:" + core + ")") + "$";
}
