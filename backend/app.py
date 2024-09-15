###############################################
import os
import json
import openai
import asyncio
from dotenv import load_dotenv
from stream_page import STREAM_PAGE
from fastapi.middleware.cors import CORSMiddleware
from oai_configs import O1_SYSTEM_PROMPT, GPT4O_SYSTEM_PROMPT
from fastapi.responses import HTMLResponse, StreamingResponse
from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
###############################################

###############################################
# Load environment variables from .env file
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

###############################################
# Initialize FastAPI app
app = FastAPI()

@app.on_event("startup")
def start():
    # app.ws_manager = ConnectionManager()
    app.active_cursors = {}
    app.status = "ACTIVE"
    app.msg_queue  = asyncio.Queue()
    asyncio.create_task(response_worker())

@app.on_event("shutdown")
def shutdown():
    app.status = "SHUTDOWN"

###############################################
# Constants
PORT = int(os.getenv('PORT', 8080))

from typing import List 
from fastapi import WebSocket

# Manager
# class ConnectionManager():
#     """
#     Manages WebSocket Connections for the OpenCHA API
#     """
#     active_connections: List[WebSocket] = []
#     active_cursors: dict[dict] = []

#     def __str__(self):
#         return str(self.active_cursors)

#     async def connect(self, websocket: WebSocket):
#         """
#         Adds a WebSocket Connection to the ConnectionManager
#         """
#         await websocket.accept()
#         self.active_connections.append(websocket)


#     async def disconnect(self, websocket: WebSocket):
#         """
#         Removes a WebSocket Connection from the ConnectionManager
#         """
#         await self.active_connections.remove(websocket)


#     async def send_to_ws(self, message: dict, websocket: WebSocket):
#         """
#         Sends a message to a specific WebSocket Connection
#         """
#         await websocket.send_json(message)


#     async def broadcast(self, message: str):
#         """
#         Broadcasts a text message to all active WebSocket Connections
#         """
#         for connection in self.active_connections:
#             await connection.send_text(message)

###############################################
# Apply CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

###############################################
# Utility
async def get_body(request: Request) -> dict:
    return json.loads((await request.body()).decode('utf-8'))



###############################################
# Root endpoint
###############################################
@app.get("/")
async def root(request: Request):
    # print(f"requested {request.url}")
    return {"message": "Hello from Block Thing"}



###############################################
# Streaming API Test Runner
###############################################
@app.get("/_test", response_class=HTMLResponse)
async def test_page(request: Request):
    # print(f"requested {request.url}")
    return HTMLResponse(STREAM_PAGE)



###############################################
# Embedding API (Placeholder)
###############################################
@app.post("/llm/embedding")
async def embedding_api(request: Request):
    body = await get_body(request)

    embedding = openai.embeddings.create(
        model="text-embedding-3-small",
        input=body["to_embed"],
        encoding_format="float"
    )
    return { "embedding": embedding }



###############################################
# OpenAI o1-preview Runner
###############################################
@app.post("/llm/o1")
async def llm_o1(request: Request):
    body = await get_body(request)
    
    messages = [{
        "role": "user",
        "content": O1_SYSTEM_PROMPT(body["messages"][0]["content"])
    }]

    def event_generator():
        try:
            response = openai.chat.completions.create(
                model='o1-preview', # 'gpt-4o',
                messages=messages,
                # stream=True,
            )

            # for chunk in response:
            #     content = chunk.choices[0].delta.content 
            #     if content:
            #         print(content, end='')
            #         yield content
            yield response.choices[0].message.content
        except Exception as e:
            yield 'Model ran into an error!'
            print(f"Error: {e}")

    return StreamingResponse(event_generator(), media_type='text/plain', headers={'Connection': 'keep-alive'})



###############################################
# OpenAI gpt-4o Runner
###############################################
@app.post("/llm/4o")
async def llm_4o(request: Request):
    body = await get_body(request)
    
    messages = [{
        "role": "system",
        "content": GPT4O_SYSTEM_PROMPT
    }]
    messages += body["messages"]
        
    def event_generator():
        try:
            response = openai.chat.completions.create(
                # model='gpt-4o' if body.get("tuned", False) == False else "ft:gpt-4o-2024-08-06:hackathons::A7YDvxgU",
                model='gpt-4o' if body.get("tuned", False) == False else "ft:gpt-4o-2024-08-06:hackathons::A7e8hgVm",
                messages=messages,
                stream=True,
            )

            for chunk in response:
                content = chunk.choices[0].delta.content 
                if content:
                    # print(content, end='')
                    yield content
        except Exception as e:
            yield 'Model ran into an error!'
            print(f"Error: {e}")

    return StreamingResponse(event_generator(), media_type='text/plain', headers={'Connection': 'keep-alive'})



###############################################
# WebSocket Connector
###############################################
@app.websocket("/ws/cursor")
async def chat_connector(ws: WebSocket):
    await ws.accept()
    try:
        while True:
            data = await ws.receive()
            data = json.loads(data["text"])
            app.active_cursors[str(ws)] = {
                "x": data["x"],
                "y": data["y"],
                "origin": data["origin"]
            }
            
            await app.msg_queue.put(ws)
            # resp = {
            # "cursors": app.active_cursors
            # }
            # print(resp)
            # ws.send_json(resp)
            # await asyncio.sleep(0.5)
    except WebSocketDisconnect:
        del app.active_cursors[str(ws)]
        await ws.close()
    except Exception as e:
        print("ERR", e)


async def response_worker():
    while True: 
        ws: WebSocket = await app.msg_queue.get()
        resp = {
            "cursors": app.active_cursors
        }
        print(resp)
        ws.send_json(resp)
        await asyncio.sleep(0.5)



###############################################
# WebSocket Logger
###############################################
@app.get('/log/ws')
async def ws_logger():
    print(app.active_cursors)
    return 'logged!'