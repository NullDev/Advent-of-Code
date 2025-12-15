// @ts-nocheck
/* eslint-disable */

// https://www.codewars.com/kata/59e1ee463d09a75a4400003b

function tco(fd){
    const ticket = (fn, ...args) => ({ fn, args });

    const names = fd.map(([name]) => name);
    const callRegexp = new RegExp("\\b(" + names.join("|") + ")\\s*\\(", "g");

    const impl = Object.create(null);
    for (const [name, params, body] of fd) impl[name] = new Function(
        "ticket", ...params, body.replace(callRegexp, 'ticket("$1", ')
    ).bind(null, ticket);

    const tramp = Object.create(null);
    for (const name of names){
        tramp[name] = function(...args){
            let frame = { fn: name, args };
            while (frame && typeof frame === "object" && frame.fn) frame = impl[frame.fn](...frame.args);
            return frame;
        };
    }

    return fd.map(([name]) => tramp[name]);
}
