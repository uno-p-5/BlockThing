export class WebSocketService {
  private socket: WebSocket | undefined;
  private onMessageCallback: ((json: any) => void) | undefined;
  private url: string;
  private maxRetries = 3;
  private retryCount = 0;

  constructor(url: string) {
    this.url = url;
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

    this.socket.onmessage = (event: any) => {
      const data = JSON.parse(event);
      if (this.onMessageCallback) {
        this.onMessageCallback(data);
      }
    };
  }

  private handleRetry() {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      console.log(`Retrying connection (${this.retryCount}/${this.maxRetries})...`);
      setTimeout(() => this.connect(), 1000);
    } else {
      console.error('Max retries reached.');
    }
  }

  sendMessage(x: number, y: number, uuid: string) {
    this.socket?.send(JSON.stringify({ 
      x: x,
      y: y,
      origin: uuid
    }));
  }
  onMessage(callback: (json: any) => void) {
    this.onMessageCallback = callback;
  }
}

const webSocketService = new WebSocketService(`ws://127.0.0.1:8080/ws/cursor`);
export default webSocketService;
