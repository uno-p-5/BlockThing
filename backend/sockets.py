from typing import List 
from fastapi import WebSocket


class ConnectionManager():
    """
    Manages WebSocket Connections for the OpenCHA API
    """
    active_connections: List[WebSocket] = []
    active_user_profiles: List[str] = []

    def __str__(self):
        return str(self.active_connections)

    async def connect(self, websocket: WebSocket):
        """
        Adds a WebSocket Connection to the ConnectionManager
        """
        await websocket.accept()
        self.active_connections.append(websocket)


    async def disconnect(self, websocket: WebSocket):
        """
        Removes a WebSocket Connection from the ConnectionManager
        """
        self.active_connections.remove(websocket)


    async def send_to_ws(self, message: dict, websocket: WebSocket):
        """
        Sends a message to a specific WebSocket Connection
        """
        await websocket.send_json(message)


    async def broadcast(self, message: str):
        """
        Broadcasts a text message to all active WebSocket Connections
        """
        for connection in self.active_connections:
            await connection.send_text(message)