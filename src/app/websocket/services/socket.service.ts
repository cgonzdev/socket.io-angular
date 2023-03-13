import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

interface socketConfigModel {
  server?: string;
  port?: number;
  namespace?: string;
  room?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket | undefined;
  private message: string = '';
  private socketConfig: socketConfigModel = {};

  private connectionStatusSubject = new Subject<{
    isConnected: boolean;
    message: string;
  }>();

  constructor() {}

  private Socket(): Socket {
    const { server, port } = this.socketConfig;

    if (!this.socket) {
      this.socket = io(`http://${server}:${port}/`);

      this.socket.on('connect', (): string => {
        return `Connected to Socket server: ${server} on port ${port}`;
      });

      this.socket.on('disconnect', (): string => {
        return `Disconnected from Socket server: ${server}`;
      });

      this.socket.on('reconnecting', (attemptNumber): string => {
        return `Reconnecting (attempt ${attemptNumber})`;
      });

      this.socket.on('reconnect', (attemptNumber): string => {
        return `Reconnected (after ${attemptNumber} attempts)`;
      });

      this.socket.on('connect_error', (): string => {
        return 'Impossible to connect';
      });
    }

    return this.socket;
  }

  public setSocketConfig(config: socketConfigModel): void {
    this.socketConfig = { ...this.socketConfig, ...config };
  }

  public connect(): void {
    this.Socket();
  }

  public disconnect() {
    if (this.Socket().connected) this.Socket().disconnect();
  }

  public sendMessage(message: string) {
    return this.Socket().emit('message', message);
  }

  public onMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.Socket().on('message', (data: string) => observer.next(data));
    });
  }

  getConnectionStatusSubject() {
    return this.connectionStatusSubject.asObservable();
  }
}
