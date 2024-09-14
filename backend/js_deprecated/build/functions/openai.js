"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oai_client = void 0;
const openai_1 = require("openai");
exports.oai_client = new openai_1.OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
