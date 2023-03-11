import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketComponent } from './components/socket/socket.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SocketComponent],
  imports: [CommonModule, FormsModule],
  exports: [SocketComponent],
})
export class WebsocketModule {}
