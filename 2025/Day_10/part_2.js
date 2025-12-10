import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
import SageCell from "../../utils/SageCell.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

// Once again, I am not implementing a Z3 solver from scratch in JS...
// So I'm gonna use SageMath just like in 2023/Day_24/part_2.js
// The plan is to set up a linear Diophantine solver / ILP model in SageMath.
// Sage with MILP should be able to handle this just fine.

const client = new SageCell({ timeoutMs: 20000 });

const sageMachines = INPUT
    .filter(Boolean)
    .map(line => ({
        buttons: [...line.matchAll(/\(([0-9,]+)\)/g)].map(m => m[1].split(",").map(Number)),
        target: line.match(/\{([0-9,]+)\}/)?.[1].split(",").map(Number),
    }))
    .map((
        { buttons, target },
    ) => `{ 'buttons': [${buttons.map(b => `[${b.join(",")}]`).join(",")}], 'target': [${target?.join(",")}] }`)
    .join(",\n");

const sage = `
machines = [
${sageMachines}
]

from sage.numerical.mip import MixedIntegerLinearProgram

total = 0
for M in machines:
    buttons = M['buttons']
    target = M['target']
    p = MixedIntegerLinearProgram(maximization=False)
    x = p.new_variable(nonnegative=True, integer=True)

    # constraints: for each counter i, sum_b x[b] * A[i,b] == target[i]
    for i in range(len(target)):
        p.add_constraint(
            sum(x[b] * (1 if i in buttons[b] else 0) for b in range(len(buttons)))
            == target[i]
        )

    p.set_objective(sum(x[b] for b in range(len(buttons))))

    p.solve()
    sol = p.get_values(x)
    total += sum(int(round(sol[b])) for b in sol.keys())

print(total)
`.trim();

client.askSage(sage)
    .then(res => {
        const pEnd = performance.now();
        console.log("FEWEST BUTTON PRESSES (JOLTAGE): " + res.stdout.trim());
        console.log(pEnd - pStart);
    })
    .catch(() => {
        const pEnd = performance.now();
        console.log("FEWEST BUTTON PRESSES (JOLTAGE): NaN");
        console.log(pEnd - pStart);
    });
