import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoUrlService {
  private videoUrl = new BehaviorSubject('crQcAGNJQtc');
  currentUrl = this.videoUrl.asObservable();
  roomId: any = "";
  getUrl(): any {
    return this.videoUrl.value;
  }
  setUrl(val : any) {
    this.videoUrl.next(val);    
  }
  getRoomId(): any {
    return this.roomId;
  }
  setRoomId(val : any) {
    this.roomId = val;    
  }
  constructor() { }
}
