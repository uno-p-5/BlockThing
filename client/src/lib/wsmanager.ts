import { Cursor } from "./types";

export class WebSocketService {
  private socket: WebSocket | undefined;
  private onMessageCallback: ((cursors: Cursor[]) => void) | undefined;
  private url: string;
//   private maxRetries = 3;
//   private retryCount = 0;

  constructor() {
    this.url = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080/ws/chat';
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
      this.handleRetry();
    };
    
    this.socket.onclose = (event) => {
      if (!event.wasClean) {
        console.error('WebSocket connection closed unexpectedly:', event);
        this.handleRetry();
      }
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (this.onMessageCallback) {
        this.onMessageCallback(data.history);
      }
    };
  }

  private handleRetry() {
    // if (this.retryCount < this.maxRetries) {
    //   this.retryCount++;
    //   console.log(`Retrying connection (${this.retryCount}/${this.maxRetries})...`);
    console.log("Retrying connection...");
    setTimeout(() => this.connect(), 1000);
    // } else {
    //   console.error('Max retries reached.');
    //   window.open('/?error=wsdc', '_self')
    // }
  }

  sendMessage(userId: string, content: string) {
    this.socket?.send(JSON.stringify({ 
      userId: userId,
      content: content
    }));
  }

  // trust me ;)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendConfiguration(userId: string, config: string, payload?: any) {
    console.log("Sending configuration", config, "with payload", payload);
    this.socket?.send(JSON.stringify({
      userId: userId,
      config: config,
      payload: payload || ""
    }));
  }

  sendFile(userId: string, file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        const fileData = {
          userId: userId,
          name: file.name,
          content: Array.from(new Uint8Array(e.target.result as ArrayBuffer)),
        };
        this.socket?.send(JSON.stringify(fileData));
      }
    };
    reader.readAsArrayBuffer(file);
  }

  onMessage(callback: (cursors: Cursor[]) => void) {
    this.onMessageCallback = callback;
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
