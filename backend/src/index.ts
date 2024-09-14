/**************************************************************************/
import express, { Express, Request, Response } from "express"; 
import dotenv from "dotenv"; 
import cors from "cors";
/**************************************************************************/
import { streaming_page } from "./templates/test_streaming";
import { cors_options } from "./config/cors";
import { oai_client } from "./functions/openai";
/**************************************************************************/

dotenv.config(); // Load .env

/**************************************************************************/
/* Constants */
/**************************************************************************/
const APP: Express = express(); 
const PORT = process.env.PORT || 8080; 
/**************************************************************************/
/* Usages */
/**************************************************************************/
APP.use(cors(cors_options));
APP.use(express.json());
/**************************************************************************/



/**************************************************************************/
/* Root */
/**************************************************************************/
APP.get('/', (req: Request, res: Response) => { 
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
APP.get('/_test', (req: Request, res: Response) => {
    console.log(`requested ${req.url}`);
    res.send(streaming_page);
});
/**************************************************************************/
/**************************************************************************/



/**************************************************************************/
/* OpenAI o1-preview Runner */
/**************************************************************************/
APP.post('/llm/o1', async (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Connection', 'keep-alive');

    let outs = '';
    const response = await oai_client.chat.completions.create(
        {
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
        }
      )

    try {
        for await (const chunk of response) {
            const content = (chunk as any).choices[0]?.delta?.content || '';
            console.log(content);
            res.write(content);
        }
    } catch (error) {
        res.status(500).send('Model ran into an error!');
    } finally {
        res.end();
    }
});
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