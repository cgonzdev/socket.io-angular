import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';

interface roomsModel {
  name: string;
  color: string;
}

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.scss'],
})
export class SocketComponent implements OnInit {
  title: string = 'Socket Component';
  isConnected: boolean = false;
  socketMessage: string = '';
  message: string = '';
  room: string = '';
  rooms: roomsModel[] = [
    { name: 'Programming', color: '#FF6F61' },
    { name: 'Cybersecurity', color: '#6B5B95' },
    { name: 'Telecomunications', color: '#88B04B' },
    { name: 'Operating Systems', color: '#F7CAC9' },
    { name: 'Artificial Intelligence', color: '#92A8D1' },
    { name: 'Big Data', color: '#955251' },
    { name: 'Cloud Computing', color: '#B565A7' },
    { name: 'Blockchain', color: '#4F9D69' },
    { name: 'Internet of Things', color: '#F2B33D' },
    { name: 'Robotics', color: '#374E88' },
    { name: 'Videogames', color: '#CCD325' },
    { name: 'UI/UX', color: '#00acc8' },
  ];

  constructor(private socketService: SocketService) {}

  ngOnInit() {}

  establishConnection() {
    this.socketService.getConnectionStatusSubject().subscribe((status) => {
      this.isConnected = status.isConnected;
      this.socketMessage = status.message;
    });
  }

  sendMessage(): void {
    this.socketService.sendMessage(this.message);
  }

  selectRoom(room: string): void {
    this.socketService.setSocketConfig({
      server: 'localhost',
      port: 3001,
      namespace: '',
      room: room,
    });

    this.socketService.connect();
  }
}
