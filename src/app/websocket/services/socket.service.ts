import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket = this.connect();
  private isConnected: boolean = false;

  constructor() {
    this.socket.on('connect', () => {
      this.isConnected = true;
    });

    this.socket.on('disconnect', () => {
      this.isConnected = false;
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

  public connect() {
    return io('http://localhost:3001/');
  }

  public disconnect() {
    return this.socket.disconnect();
  }

  public sendMessage(message: string) {
    return this.socket.emit('message', message);
  }

  public onMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('message', (data: string) => observer.next(data));
    });
  }
}
