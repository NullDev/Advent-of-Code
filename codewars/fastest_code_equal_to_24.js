// @ts-nocheck
/* eslint-disable */

// https://www.codewars.com/kata/574e890e296e412a0400149c

// 2100ms 
const gcd = function(a, b){
    a = Math.abs(a);
    b = Math.abs(b);

    if (b === 0) return a;
    let t;
    while (b !== 0){
        t = b;
        b = a % b;
        a = t;
    }
    return a;
};

const norm = function(n, den){
    if (den === 0) return null;
    if (den < 0){
        n = -n;
        den = -den;
    }
    if (n === 0) return { n: 0, d: 1 };
    const g = gcd(n, den);
    return { n: n / g, d: den / g };
};

const makeNode = (x) => ({ n: Number(x), d: 1, e: String(x) });

const is24 = (node) => (node.n === 24 * node.d);

const stripOuter = (expr) => (
    (expr.length >= 2 && expr[0] === "(" && expr[expr.length - 1] === ")")
        ? expr.slice(1, -1) : expr
);

function equalTo24(a, b, c, d){
    const memo = new Map();
    function keyOf(list){
        const len = list.length;
        let nums = [];
        for (let i = 0; i < len; i++) {
            const x = list[i];
            nums.push(x.n + '/' + x.d);
        }
        nums.sort();
        return nums.join('|');
    }

    function dfs(list){
        const k = keyOf(list);
        if (memo.has(k)) return null;
        memo.set(k, 1);

        const len = list.length;
        if (len === 1){
            return is24(list[0]) ? stripOuter(list[0].e) : null;
        }

        for (let i = 0; i < len; i++){
            for (let j = i + 1; j < len; j++){
                const A = list[i], B = list[j];
                const An = A.n, Ad = A.d, Bn = B.n, Bd = B.d;
                const AdBd = Ad * Bd;

                const rest = [];
                for (let t = 0; t < len; t++) (t !== i && t !== j) && rest.push(list[t]);

                const r1 = norm(An * Bd + Bn * Ad, AdBd);
                if (r1){
                    rest.push({ n: r1.n, d: r1.d, e: `(${A.e}+${B.e})` });
                    const ans1 = dfs(rest);
                    if (ans1) return ans1;
                    rest.pop();
                }

                const r2 = norm(An * Bn, AdBd);
                if (r2){
                    rest.push({ n: r2.n, d: r2.d, e: `(${A.e}*${B.e})` });
                    const ans2 = dfs(rest);
                    if (ans2) return ans2;
                    rest.pop();
                }

                const r3a = norm(An * Bd - Bn * Ad, AdBd);
                if (r3a){
                    rest.push({ n: r3a.n, d: r3a.d, e: `(${A.e}-${B.e})` });
                    const ans3a = dfs(rest);
                    if (ans3a) return ans3a;
                    rest.pop();
                }

                const r3b = norm(Bn * Ad - An * Bd, AdBd);
                if (r3b){
                    rest.push({ n: r3b.n, d: r3b.d, e: `(${B.e}-${A.e})` });
                    const ans3b = dfs(rest);
                    if (ans3b) return ans3b;
                    rest.pop();
                }

                if (Bn !== 0){
                    const r4a = norm(An * Bd, Ad * Bn);
                    if (r4a){
                        rest.push({ n: r4a.n, d: r4a.d, e: `(${A.e}/${B.e})` });
                        const ans4a = dfs(rest);
                        if (ans4a) return ans4a;
                        rest.pop();
                    }
                }

                if (An !== 0){
                    const r4b = norm(Bn * Ad, Bd * An);
                    if (r4b){
                        rest.push({ n: r4b.n, d: r4b.d, e: `(${B.e}/${A.e})` });
                        const ans4b = dfs(rest);
                        if (ans4b) return ans4b;
                        rest.pop();
                    }
                }
            }
        }
        return null;
    }

    return dfs([makeNode(a), makeNode(b), makeNode(c), makeNode(d)]) || "It's not possible!";
}
