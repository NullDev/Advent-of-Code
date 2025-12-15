// @ts-nocheck
/* eslint-disable */

// https://www.codewars.com/kata/5ea6a8502186ab001427809e

function findPredecessor(goal){
    const m = goal.length;
    const n = goal[0].length;
    const H = m + 2;
    const W = n + 2;
    const FULL = (1 << W) - 1;

    const tRows = new Array(H).fill(0);
    for (let r = 0; r < m; r++){
        let mask = 0;
        for (let c = 0; c < n; c++) (goal[r][c] === 1) && (mask |= (1 << (c + 1)));
        tRows[r + 1] = mask;
    }

    function forwardRow(a, b, c){
        let out = 0;
        for (let j = 0; j < W; j++){
            const bj = (b >> j) & 1;
            let count = 0;
            for (let dr = -1; dr <= 1; dr++){
                const row = dr === -1 ? a : (dr === 0 ? b : c);
                for (let dc = -1; dc <= 1; dc++){
                    if (dr === 0 && dc === 0) continue;
                    const jj = j + dc;
                    if (jj < 0 || jj >= W) continue;
                    count += (row >> jj) & 1;
                }
            }

            const aliveNext = bj ? (count === 2 || count === 3) : (count === 3);
            if (aliveNext) out |= (1 << j);
        }
        return out & FULL;
    }

    const failed = new Set();
    function dfs(idx, prev, curr){
        const key = `${idx}|${prev}|${curr}`;
        if (failed.has(key)) return null;

        if (idx === H - 1) return (
            forwardRow(prev, curr, 0) !== tRows[idx]
        ) ? (failed.add(key), null) : [curr];

        for (let next = 0; next <= FULL; next++){
            if (forwardRow(prev, curr, next) !== tRows[idx]) continue;
            const tail = dfs(idx + 1, curr, next);
            if (tail) return [curr, ...tail];
        }

        failed.add(key);
        return null;
    }

    for (let row0 = 0; row0 <= FULL; row0++){
        const rows = dfs(0, 0, row0);
        if (!rows) continue;

        const pred = Array.from({ length: H }, (_, r) => {
            const mask = rows[r];
            const arr = new Array(W);
            for (let c = 0; c < W; c++) arr[c] = (mask >> c) & 1;
            return arr;
        });
        return pred;
    }

    return null;
}
