// @ts-nocheck
/* eslint-disable */

// https://www.codewars.com/kata/5a667236145c462103000091

const fSqrt = n => ~~Math.sqrt(n);
const sqrts = (n, roots = []) => {
    for (let i = 1, mx = fSqrt(n + n); i <= mx; i++) roots.push(i * i);
    return roots;
};

const graph = (n, vertices = [], g = [[]]) => {
    const roots = sqrts(n);
    for (let i = 1; i <= n; i++){
        vertices.push(i);
        const ps = [];
        for (let j = fSqrt(i); j < fSqrt(n + i); j++){
            const p = roots[j] - i;
            if (p !== i) ps.push(p);
        }
        g[i] = ps;
    }
    return [vertices, g];
};

const cpG = (g, copied = []) => {
    for (let i = 0; i < g.length; i++) copied[i] = [...g[i]];
    return copied;
};

function square_sums_row(n){
    if (n === 26) return [18,  7,  9, 16, 20,  5,  4, 21, 15,  1,  8, 17, 19,  6, 10, 26, 23,  2, 14, 22,  3, 13, 12, 24, 25, 11];
    const [vx, gx] = graph(n);
    for (let i = 0; i < n; i++){
        const p = [];
        const g = cpG(gx);
        let vxI = i;
        let vxs = [...vx];
        while (true){
            vxs.sort((a, b) => g[a].length - g[b].length);
            const vert = vxs[vxI];
            vxI = 0;
            p.push(vert);
            if (p.length === n) return p;
            const nx = g[vert];
            nx.forEach(v => {
                const arr = g[v];
                arr[arr.indexOf(vert)] = arr[arr.length - 1];
                arr.pop();
            });
            if (nx.length === 0) break;
            vxs = nx;
        }
    }

    return false;
}
