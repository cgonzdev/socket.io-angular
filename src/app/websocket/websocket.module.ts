import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketComponent } from './components/socket/socket.component';
import { FormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [SocketComponent],
  imports: [CommonModule, FormsModule, CardModule, ButtonModule],
  exports: [SocketComponent],
})
export class WebsocketModule {}
