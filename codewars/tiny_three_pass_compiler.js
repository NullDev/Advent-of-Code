// @ts-nocheck
/* eslint-disable */

// https://www.codewars.com/kata/5265b0885fda8eac5900093b

class Compiler {
    compile = program => this.pass3(this.pass2(this.pass1(program)));
    tokenize = program => program
        .replace(/\s*([-+*/\[\]\(\)]|[A-Za-z]+|\d+)\s*/g, ":$1")
        .substring(1)
        .split(":")
        .map(t => (isNaN(t) ? t : t | 0));

    pass1(program){
        const tokens = this.tokenize(program);
        let pos = 0;
        const peek = () => tokens[pos], take = () => tokens[pos++], expect = s => take() !== s;
        expect("[");
        const argNames = [], argIndex = Object.create(null);
        while (peek() !== "]"){
            const name = take();
            argIndex[name] = argNames.length;
            argNames.push(name);
        }
        expect("]");
        const parseFactor = (tok = take()) => {
            if (tok === "("){
                const node = parseExpression();
                expect(")");
                return node;
            }
            return (typeof tok === "number") ? ({ op: "imm", n: tok }) : ({ op: "arg", n: argIndex[tok] });
        };
        const parseTerm = (node = parseFactor()) => {
            while (peek() === "*" || peek() === "/") node = { op: take(), a: node, b: parseFactor() };
            return node;
        };
        const parseExpression = (node = parseTerm()) => {
            while (peek() === "+" || peek() === "-") node = { op: take(), a: node, b: parseTerm() };
            return node;
        };
        return parseExpression();
    }

    pass2(ast){
        const fold = node => {
            if (node.op === "imm" || node.op === "arg") return node;
            const a = fold(node.a), b = fold(node.b);
            return (a.op === "imm" && b.op === "imm") ? ({
                op: "imm", n: node.op === "+" ? a.n + b.n : node.op === "-" ? a.n - b.n : node.op === "*" ? a.n * b.n : a.n / b.n,
            }) : ({ op: node.op, a, b });
        };
        return fold(ast);
    }

    pass3(ast){
        const ins = { "+": "AD", "-": "SU", "*": "MU", "/": "DI" };
        const gen = node => {
            if (node.op === "imm") return [`IM ${node.n}`];
            if (node.op === "arg") return [`AR ${node.n}`];
            return [...gen(node.a), "PU", ...gen(node.b), "SW", "PO", ins[node.op]];
        };
        return gen(ast);
    }
}