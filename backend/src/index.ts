import express, { Express, Request, Response } from "express"; 
import dotenv from "dotenv"; 
import cors from "cors";

dotenv.config(); 

const APP: Express = express(); 
const PORT = process.env.PORT || 8080; 

APP.use(cors());
APP.use(express.json());

APP.get('/', (req: Request, res: Response) => { 
	res.send({
		"message": "Hello from Block Thing"
	}); 
}); 

APP.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});