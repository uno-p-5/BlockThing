###############################################
import os
import io
import json
import openai
import asyncio
import zipfile
import tempfile
from pathlib import Path
from dotenv import load_dotenv
from stream_page import STREAM_PAGE
from fastapi.middleware.cors import CORSMiddleware
from oai_configs import O1_SYSTEM_PROMPT, GPT4O_SYSTEM_PROMPT
from fastapi.responses import HTMLResponse, StreamingResponse
from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect, File, UploadFile, HTTPException

from browserpy.sb3topy.src.sb3topy import api as tp_api
###############################################

###############################################
# Load environment variables from .env file
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

###############################################
# Initialize FastAPI app
app = FastAPI()
DATA = Path(__file__).parent.parent / 'data'

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
# Embedding API
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
# File Download Endpoint
###############################################
@app.post("/file/download")
async def download_file(request: Request):
    body = await get_body(request)
    arr = bytearray(body["buf"])

    with open(Path(DATA / f'{body["project_id"]}.sb3'), 'wb') as f:
        f.write(arr)



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

    print(messages)

    def event_generator():
        try:
            response = openai.chat.completions.create(
                model='o1-preview',
                # model="gpt-4o",
                messages=messages,
                # stream=True,
            )

            # for chunk in response:
            #     content = chunk.choices[0].delta.content 
            #     if content:
            #         print(content, end='')
            #         yield content
            content = response.choices[0].message.content
            print(content)
            yield content
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

###############################################
# Scratch transpiler
###############################################
from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
import io
import tempfile
import logging

# Import necessary modules
from browserpy.sb3topy.src.sb3topy import api as tp_api
from browserpy.sb3topy.src.sb3topy.project import Manifest
from browserpy.sb3topy.src.sb3topy.packer import save_code
from browserpy.sb3topy.src.sb3topy.parser import parse_project
from browserpy.sb3topy.src.sb3topy.unpacker import convert_assets

router = APIRouter()
logger = logging.getLogger(__name__)

@app.post("/transpile")
async def transpile_sb3_to_python(file: UploadFile = File(...)):
    """
    Endpoint to receive an sb3 file, transpile it, and return the transpiled project as a zip.
    """
    # Validate the uploaded file
    if not (file.content_type == "application/octet-stream" or file.filename.endswith(".sb3")):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload an sb3 file.")

    try:
        # Read the uploaded sb3 file into memory
        file_bytes = await file.read()

        # Create an in-memory file-like object from the bytes (for sb3)
        sb3_file_stream = io.BytesIO(file_bytes)

        # Open the sb3 file as a zip file
        with zipfile.ZipFile(sb3_file_stream, 'r') as sb3_zip:
            # Ensure project.json exists in the sb3 file
            if "project.json" not in sb3_zip.namelist():
                raise HTTPException(status_code=400, detail="Invalid sb3 project file (missing project.json).")

            # Extract project.json and load it into a dictionary
            with sb3_zip.open('project.json') as project_file:
                project_json = json.load(project_file)

            # Use a temporary directory for manifest operations
            with tempfile.TemporaryDirectory() as temp_dir:
                # Initialize the project manifest
                manifest = Manifest(temp_dir)

                # Create a Project object from the extracted project.json
                project = tp_api.unpacker.Extract(manifest, sb3_zip).project

                # Verify the project is valid
                if not project.is_sb3():
                    raise HTTPException(status_code=400, detail="Invalid or unsupported sb3 project format.")

                # Convert project assets
                convert_assets(manifest)

                # Copy engine files
                tp_api.packer.copy_engine(manifest)

                # Parse the project code from the Project object
                code = parse_project(project, manifest)

                # Save the code into the manifest
                save_code(manifest, code)

                # Create an in-memory ZIP file to store the transpiled project
                zip_buffer = io.BytesIO()

                with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
                    # Add the transpiled code as a single Python file (project.py)
                    zip_file.writestr("project.py", code)

                    # Add engine files to the ZIP file
                    engine_dir = os.path.join(manifest.output_dir, "engine")
                    for root, dirs, files in os.walk(engine_dir):
                        # Skip '__pycache__' directories
                        dirs[:] = [d for d in dirs if d != '__pycache__']
                        
                        for f in files:
                            if '__pycache__' not in f:  # Ignore pycache files if needed
                                file_path = os.path.join(root, f)
                                zip_file.write(file_path, os.path.relpath(file_path, manifest.output_dir))

                    # Add converted assets to the ZIP file
                    assets_dir = os.path.join(manifest.output_dir, "assets")
                    for root, dirs, files in os.walk(assets_dir):
                        # Skip '__pycache__' directories
                        dirs[:] = [d for d in dirs if d != '__pycache__']
                        
                        for f in files:
                            if '__pycache__' not in f:  # Ignore pycache files if needed
                                file_path = os.path.join(root, f)
                                zip_file.write(file_path, os.path.relpath(file_path, manifest.output_dir))


                zip_buffer.seek(0)  # Move the pointer to the beginning of the buffer

        # Return the zip as a streaming response
        return StreamingResponse(
            zip_buffer,
            media_type="application/zip",
            headers={"Content-Disposition": "attachment; filename=transpiled_project.zip"}
        )

    except HTTPException as he:
        # Re-raise HTTP exceptions
        raise he
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")
