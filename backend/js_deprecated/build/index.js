"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**************************************************************************/
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
/**************************************************************************/
const test_streaming_1 = require("../python/test_streaming");
const cors_2 = require("./config/cors");
const openai_1 = require("./functions/openai");
/**************************************************************************/
dotenv_1.default.config(); // Load .env
/**************************************************************************/
/* Constants */
/**************************************************************************/
const APP = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
/**************************************************************************/
/* Usages */
/**************************************************************************/
APP.use((0, cors_1.default)(cors_2.cors_options));
APP.use(express_1.default.json());
/**************************************************************************/
/**************************************************************************/
/* Root */
/**************************************************************************/
APP.get('/', (req, res) => {
    console.log(`requested ${req.url}`);
    res.send({
        "message": "Hello from Block Thing"
    });
});
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/* Streaming API Test Runner */
/**************************************************************************/
APP.get('/_test', (req, res) => {
    console.log(`requested ${req.url}`);
    res.send(test_streaming_1.streaming_page);
});
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/* Embedding API */
/**************************************************************************/
APP.get('/_test', (req, res) => {
});
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/* OpenAI o1-preview Runner */
/**************************************************************************/
APP.post('/llm/o1', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    var _d, _e;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Connection', 'keep-alive');
    let outs = '';
    const response = yield openai_1.oai_client.chat.completions.create({
        model: 'gpt-4o', // 'o1-preview'	
        stream: true,
        messages: [
            {
                role: 'system',
                content: 'You are an SEO expert.',
            },
            {
                role: 'user',
                content: 'Write a paragraph about no-code tools to build in 2021.',
            },
        ],
    });
    try {
        try {
            for (var _f = true, response_1 = __asyncValues(response), response_1_1; response_1_1 = yield response_1.next(), _a = response_1_1.done, !_a; _f = true) {
                _c = response_1_1.value;
                _f = false;
                const chunk = _c;
                const content = ((_e = (_d = chunk.choices[0]) === null || _d === void 0 ? void 0 : _d.delta) === null || _e === void 0 ? void 0 : _e.content) || '';
                console.log(content);
                res.write(content);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_f && !_a && (_b = response_1.return)) yield _b.call(response_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    catch (error) {
        res.status(500).send('Model ran into an error!');
    }
    finally {
        res.end();
    }
}));
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/* Run Server */
/**************************************************************************/
APP.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/* End of File index.ts */
/**************************************************************************/ 
