import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.scss'],
})
export class SocketComponent implements OnInit {
  title: string = 'Socket Component';
  message: string = '';

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.connect();
  }

  sendMessage(): void {
    this.socketService.sendMessage(this.message);
  }
}
