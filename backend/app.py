###############################################
import os
import json
import asyncio
from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from stream_page import STREAM_PAGE
from dotenv import load_dotenv
from sockets import ConnectionManager
import openai
###############################################

###############################################
# Load environment variables from .env file
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

###############################################
# Initialize FastAPI app
app = FastAPI()
app.ws_manager = ConnectionManager()

###############################################
# Constants
PORT = int(os.getenv('PORT', 8080))

###############################################
# Apply CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)



###############################################
# Root endpoint
###############################################
@app.get("/")
async def root(request: Request):
    print(f"requested {request.url}")
    return {"message": "Hello from Block Thing"}



###############################################
# Streaming API Test Runner
###############################################
@app.get("/_test", response_class=HTMLResponse)
async def test_page(request: Request):
    print(f"requested {request.url}")
    return HTMLResponse(STREAM_PAGE)



###############################################
# Embedding API (Placeholder)
###############################################
@app.post("/llm/embedding")
async def embedding_api(request: Request):
    body = json.loads((await request.body()).decode('utf-8'))

    embedding = openai.embeddings.create(
        model="text-embedding-3-small",
        input=body["to_embed"],
        encoding_format="float"
    )
    return {
        "embedding": embedding
    }



###############################################
# OpenAI o1-preview Runner
###############################################
@app.post("/llm/o1")
async def llm_o1(request: Request):
    def event_generator():
        try:
            response = openai.chat.completions.create(
                model='gpt-4o', # 'o1-preview'
                messages=[
                    {"role": "system", "content": "You are an SEO expert."},
                    {"role": "user", "content": "Write a paragraph about no-code tools to build in 2021."}
                ],
                stream=True,
            )

            for chunk in response:
                content = chunk.choices[0].delta.content 
                if content:
                    print(content, end='')
                    yield content
        except Exception as e:
            yield 'Model ran into an error!'
            print(f"Error: {e}")

    return StreamingResponse(event_generator(), media_type='text/plain', headers={'Connection': 'keep-alive'})



###############################################
# WebSocket Connector
###############################################
@app.websocket("/ws/connect")
async def chat_connector(ws: WebSocket):
    await app.ws_manager.connect(ws)
    try:
        while True:
            # data = await ws.receive_text()
            # print(data)
            # data = json.loads(data)

            await ws.send_text("Message sent every 5 seconds")
            await asyncio.sleep(1)

            # if data["user_id"]:
            #     # user_data = 
            #     print(data)
    except WebSocketDisconnect:
        app.ws_manager.disconnect(ws)



###############################################
# WebSocket Logger
###############################################
@app.get('/util/log')
async def ws_logger():
    return {
        "active_connections": app.ws_manager.active_connections,
        "num_connections": len(app.ws_manager.active_connections)   
    }