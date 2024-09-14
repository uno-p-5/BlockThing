import { OpenAI } from 'openai';

export const oai_client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});