import { Component } from '@angular/core';
import { VideoUrlService } from './video-url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rough';
  // videourl: any;
  // player: any;
  // ids: Array<string> = ['De6uAzvOx5E', '2e-yAATMjBI'];
  // currentvideoindex = 0;
  // id = this.ids[0];
  // playing: any;
  // onReady(player: any): void {
  //   this.player = player;
  //   let checkEnded = (check: any) => {
  //     if (check === 0) {
  //       console.log('end it already!');
  //       clearInterval(myInterval);
  //     }
  //   }
  //   let myInterval = setInterval(() => {
  //     console.log("current time: ", this.player.getCurrentTime());
  //     console.log("getPlayerState: ", this.player.getPlayerState());
  //     if (this.player.getPlayerState() !== 1) {
  //       console.log('ended: ',this.player.getVideoData());
  //       checkEnded(0);
  //     }

  //   }, 3000)

  // }
  // // ?portrait=0&color=333&controls=0&showinfo=0&modestbranding=1&rel=0&autohide=0&frameborder=0&enablejsapi=true&ivloadpolicy=false
  // onChange(event: any): void {
  //   if (event.data === -1) {
  //     let iframe = document.getElementsByTagName('iframe')[0];
  //     iframe.setAttribute('width', '640');
  //     iframe.setAttribute('height', '360');
  //     iframe.setAttribute("src", "https://www.youtube.com/embed/?enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost%3A4200&amp;widgetid=1&controls=0&showinfo=0&modestbranding=1&rel=0&autohide=0");
  //     console.log("Unstarted");
  //   }
  //   if (event.data === 2) {//paused

  //   }
  //   console.log(event)
  // }
  // // changeVid() {
  // //   this.currentvideoindex = this.currentvideoindex === 0 ? 1 : 0;

  // //   this.player.cueVideoById(this.ids[this.currentvideoindex]);
  // //   this.player.playVideo();
  // //   console.log('change1');
  // //   let checkEnded = (check: any) => {
  // //     if (check === 0) {
  // //       console.log('end it already!');
  // //       clearInterval(myInterval);
  // //     }
  // //   }
  // //   let myInterval = setInterval(() => {
  // //     console.log("current time: ", this.player.getCurrentTime());
  // //     console.log("getPlayerState: ", this.player.getPlayerState());
  // //     if (this.player.getPlayerState() !== 1) {
  // //       console.log('ended: ',this.player.getVideoData());
  // //       checkEnded(0);
  // //     }
  // //   }, 3000)
  // // }
  // stopVid(){
  //   this.player.stopVideo();
  // }
  // playVid(){
  //   this.player.playVideo();
  // }
  // pauseVid(){
  //   this.player.pauseVideo();
  // }
  // constructor(private videoUrlService: VideoUrlService) {}
  
  // change(videoid: any){

  //   this.videoUrlService.currentUrl.subscribe(val => this.videourl = val);
  //   this.videoUrlService.setUrl(videoid);
  //   console.log(this.videoUrlService.getUrl());
  //   this.player.cueVideoById(this.videoUrlService.getUrl());
  //   this.player.playVideo();
  //   let checkEnded = (check: any) => {
  //     if (check === 0) {
  //       clearInterval(myInterval);
  //     }
  //   }
  //   let myInterval = setInterval(() => {
  //     if (this.player.getPlayerState() !== 1) {
  //       checkEnded(0);
  //     }
  //   }, 3000)
  // }
  // xyz(){
  //   const btn = document.querySelector('.playpause');
  //   btn?.classList.toggle('playing');
  // }
}
