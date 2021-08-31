import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { VideoUrlService } from '../../video-url.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  socket = io('http://localhost:3000');
  roomId: any;
  val: any;
  joinBtn: any;
  leaveBtn: any;
  span: any;
  flag: any = 0;

  constructor(private videoUrlService: VideoUrlService) { }

  joinRoom(givenRoomId: any){    
    this.joinBtn.innerHTML = 'Joined';
    this.roomId = givenRoomId;
    this.flag = 1;
    this.videoUrlService.setRoomId(givenRoomId);
    this.socket.emit('join-room', givenRoomId, (message: any) => {
      console.log(message);
    });
    
  }

  leaveRoom(){
    this.joinBtn.innerHTML = 'Join';
    this.val.value = '';
    this.socket.emit('leave-room', this.roomId, (message: any) => {
      console.log(message);
    });
    this.flag = 0;
    this.roomId = '';
  }

  ngOnInit(): void {
    this.roomId = document.getElementById('roomId') as HTMLInputElement;
    this.val = document.getElementById('roomId') as HTMLInputElement;
    this.joinBtn = document.getElementById('joinBtnId') as HTMLButtonElement;
    this.leaveBtn = document.getElementById('leaveBtnId') as HTMLButtonElement;
    this.span = document.getElementById('spanId') as HTMLSpanElement;
  }

}
