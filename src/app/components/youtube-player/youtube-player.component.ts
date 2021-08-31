import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { VideoUrlService } from '../../video-url.service';

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss']
})
export class YoutubePlayerComponent implements OnInit {
  socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });
  title = 'rough';
  videourl: any;
  player: any;
  val: any;
  r: any;
  pb: any;
  url: string = this.videoUrlService.getUrl();
  ids: Array<string> = ['8Z1eMy2FoX4', '2e-yAATMjBI'];
  currentvideoindex = 0;
  id = this.ids[0];
  playing: any;
  val2: any;
  roomId: any;
  flag: any = 0;

  onReady(player: any): void {
    this.player = player;
    this.r = document.querySelector(':root');
    this.pb = document.querySelector('.progress-bar');
    let checkEnded = (check: any) => {
      if (check === 0) {
        // console.log('end it already!');
        clearInterval(myInterval);
      }
    }
    let myInterval = setInterval(() => {
      // console.log("current time: ", this.player.getCurrentTime());
      // console.log("getPlayerState: ", this.player.getPlayerState());
      
      this.val = String(this.player.getCurrentTime()/ this.player.getDuration()*100)+'%';
      this.r.style.setProperty('--w', this.val);
      if (this.player.getPlayerState() !== 1) {
        // console.log('ended: ',this.player.getVideoData());
        checkEnded(0);
      }
    }, 3000);
  }
 
  onChange(event: any): void {
    
    if (event.data === -1) {
      let iframe = document.getElementsByTagName('iframe')[0];
      iframe.setAttribute('width', '860');
      iframe.setAttribute('height', '540');
      iframe.setAttribute("src", "https://www.youtube.com/embed/?enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost%3A4200&amp;widgetid=1&controls=0&showinfo=0&modestbranding=1&rel=0&autohide=0");
      // console.log("Unstarted");
    }
    if (event.data === 2) {}//paused
    // console.log(event)
  }
  stopVid(){
    this.player.stopVideo();
  }
  // playVid(){
  //   this.player.playVideo();
  // }
  // pauseVid(){
  //   this.player.pauseVideo();
  // }
  pbClick(event: any){
    // console.log(this.pb.offsetWidth);
    // let realPos = event.clientX - 110;
    // console.log(realPos);
    // console.log(this.player.getCurrentTime());
    
    let newCurrentTime = event * Math.round(this.player.getDuration()) / 846;
    let finalCurrentTime =  newCurrentTime.toFixed(6);
    this.player.seekTo(finalCurrentTime);
  }

  progressbarClick(clickevent: any){
    let room;
    if(this.flag != 0){
      room = this.roomId;
    }
    else{
      room = '';
    }
    let realPos = clickevent.clientX - 110;
    this.socket.emit('seek-progressbar', ({realPos, room}));
    this.pbClick(realPos);
  }

  constructor(private videoUrlService: VideoUrlService) {}

  change(videoid: any){
    videoid = this.splitUrl(videoid);
    const btn = document.querySelector('.playpause');
    btn?.classList.toggle('playing');
    this.videoUrlService.currentUrl.subscribe(val => this.videourl = val);
    this.videoUrlService.setUrl(videoid);
    this.player.cueVideoById(this.videoUrlService.getUrl());
    this.player.playVideo();
    let checkEnded = (check: any) => {
      if (check === 0) {
        clearInterval(myInterval);
      }
    }
    let myInterval = setInterval(() => {
      this.val = String(this.player.getCurrentTime()/ this.player.getDuration()*100)+'%';
      this.r.style.setProperty('--w', this.val);
      if (this.player.getPlayerState() !== 1) {
        checkEnded(0);
      }
    }, 3000)
  }

  changeClick(inputVideoUrl: any){
    let room;
    if(this.flag != 0){
      room = this.roomId;
    }
    else{
      room = '';
    }
    this.change(inputVideoUrl);
    this.socket.emit('change-video', ({inputVideoUrl, room}));
  }

  btnClick(){    
    const btn = document.querySelector('.playpause');
    btn?.classList.toggle('playing');
    if(this.player.getPlayerState() == 2){
      let item = 'play';
      let room;
      if(this.flag != 0){
        room = this.roomId;
      }
      else{
        room = '';
      } 
      this.socket.emit('play', ({item, room}));
      this.player.playVideo();
    }
    else if(this.player.getPlayerState() == 1){
      const item = 'pause';
      let room;
      if(this.flag != 0){
        room = this.roomId;
      }
      else{
        room = '';
      }
      this.socket.emit('pause', ({item, room}));
      this.player.pauseVideo();
    }
  }

  splitUrl(url: string){
    let splittedUrl = "";
    let i = 0;

    while(i < url.length){
       if(url[i-1] == "="){
         while(i<url.length){
           splittedUrl += url[i];
           i++;}
       }
       i++;}
    if(splittedUrl != ""){
      return splittedUrl;
    }
    else{
      const temp = "crQcAGNJQtc";
      return temp;
    }
  }
  
  ngOnInit(): void {
    console.log(this.roomId);
    
    this.socket.on('connect', ()=> {
      console.log("you got connected");
    });
    this.socket.on('play-video', (item)=>{      
      if(item === 'play'){   
        console.log("client catched play video req", this.roomId);
             
        this.player.playVideo();
      }
    });
    this.socket.on('pause-video', (item)=>{
      if(item === 'pause'){
        console.log("client catched pause video req", this.roomId);
        this.player.pauseVideo();
      }
    });
    this.socket.on('progressbar-seek-new', (newSeekPosition)=>{
      if(newSeekPosition !== ''){
        this.pbClick(newSeekPosition);
      }
    });
    this.socket.on('change-video-new', (newUrl)=>{
      if(newUrl !== ''){
        this.change(newUrl);
      }
    });
    this.socket.on('left-room', (msg)=>{
      if(msg === 'left'){
        this.flag = 0;
      }
    });
    this.socket.on('joined-room', (info)=>{
      if(info.msg === 'joined'){
        this.roomId = info.roomId;
        this.flag = 1;
      }
    });
  }
}
