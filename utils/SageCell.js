import WebSocket from "ws";
import { randomUUID } from "node:crypto";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable camelcase */

export default class SageCell {
    /**
     * @param {Object} options
     * @param {string} [options.baseUrl] Base URL of SageCell
     * @param {number} [options.timeoutMs] How long to wait for a single execution
     */
    constructor(options = {}){
        this.baseUrl = options.baseUrl ?? "https://sagecell.sagemath.org";
        this.timeoutMs = options.timeoutMs ?? 30000;
    }

    /**
     * High-level API: create kernel, run code, collect output, delete kernel.
     * @param {string} code
     * @returns {Promise<{ stdout: string, stderr: string, result: any }>}
     */
    async askSage(code){
        let kernelId = null;
        try {
            const { wsUrl, kernelId: id } = await this.#startKernel();
            kernelId = id;

            const result = await this.#runOnKernel(wsUrl, kernelId, code);
            return result;
        }
        finally {
            if (kernelId){
                try {
                    await this.#deleteKernel(kernelId);
                }
                catch { /* noop */ }
            }
        }
    }

    /**
     * Starts a new SageCell kernel.
     *
     * @returns {Promise<{ wsUrl: string, kernelId: string }>}
     */
    async #startKernel(){
        const res = await fetch(
            `${this.baseUrl}/kernel?accepted_tos=true&timeout=0`,
            { method: "POST" },
        );

        if (!res.ok){
            throw new Error(`Failed to start kernel: HTTP ${res.status}`);
        }

        const { ws_url, id } = await res.json();
        if (!ws_url || !id){
            throw new Error("Kernel start response missing ws_url or id");
        }

        return { wsUrl: ws_url, kernelId: id };
    }

    /**
     * Deletes a SageCell kernel.
     *
     * @param {string} kernelId
     * @returns {Promise<void>}
     */
    async #deleteKernel(kernelId){
        const res = await fetch(`${this.baseUrl}/kernel/${kernelId}`, {
            method: "DELETE",
        });

        if (!res.ok && res.status !== 404){
            throw new Error(`Failed to delete kernel: HTTP ${res.status}`);
        }
    }

    /**
     * Creates an execute_request message.
     *
     * @param {string} code
     * @returns {Object}
     */
    #makeExecuteRequest(code){
        const session = randomUUID();
        const msgId = randomUUID();
        return {
            header: {
                msg_id: msgId,
                username: "user",
                session,
                msg_type: "execute_request",
                version: "5.3",
            },
            parent_header: {},
            metadata: {},
            content: {
                code,
                silent: false,
                store_history: false,
                user_expressions: {},
                allow_stdin: false,
                stop_on_error: true,
            },
            channel: "shell",
            buffers: [],
        };
    }

    /**
     * Connects WS, sends execute_request, waits until status: idle.
     *
     * @param {string} wsUrl
     * @param {string} kernelId
     * @param {string} code
     * @returns {Promise<{ stdout: string, stderr: string, result: any }>}
     */
    async #runOnKernel(wsUrl, kernelId, code){
        const ws = new WebSocket(`${wsUrl}kernel/${kernelId}/channels`);

        const execMsg = this.#makeExecuteRequest(code);

        return new Promise((resolve, reject) => {
            let stdout = "";
            let stderr = "";
            let result = "";
            let done = false;
            // @ts-ignore
            // eslint-disable-next-line prefer-const
            let timer;

            /**
             * Finishes the execution.
             *
             * @param {any} value
             * @param {boolean} isError
             */
            const finish = (value, isError = false) => {
                if (done) return;
                done = true; // @ts-ignore
                clearTimeout(timer);
                try {
                    ws.close();
                }
                catch {
                    // ignore
                }
                isError ? reject(value) : resolve(value);
            };

            timer = setTimeout(() => {
                finish(new Error(`SageCell execution timed out after ${this.timeoutMs}ms`), true);
            }, this.timeoutMs);

            ws.on("open", () => {
                ws.send(JSON.stringify(execMsg));
            });

            ws.on("message", data => {
                let msg;
                try {
                    msg = JSON.parse(data.toString());
                }
                catch (e){
                    const errMsg = e instanceof Error ? e.message : String(e);
                    return finish(new Error("Failed to parse message from SageCell " + errMsg), true);
                }

                const msgType = msg.msg_type || msg.header?.msg_type;

                if (msgType === "stream" && msg.content?.text){
                    if (msg.content.name === "stderr"){
                        stderr += msg.content.text;
                    }
                    else {
                        stdout += msg.content.text;
                    }
                }

                if (msgType === "execute_result"){
                    result = msg.content?.data ?? null;
                }

                if (msgType === "status" &&
                    msg.content?.execution_state === "idle"){
                    finish({ stdout, stderr, result });
                }

                if (msgType === "error"){
                    const errText = msg.content?.evalue || "SageCell error";
                    finish(new Error(errText), true);
                }

                return null;
            });

            ws.on("error", err => {
                finish(err, true);
            });

            ws.on("close", () => {
                if (!done){
                    finish(new Error("WebSocket closed before completion"), true);
                }
            });
        });
    }
}
