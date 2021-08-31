import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YoutubeModule } from 'angularx-youtube';
import { YoutubePlayerComponent } from './components/youtube-player/youtube-player.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { RoomComponent } from './components/room/room.component';

@NgModule({
  declarations: [
    AppComponent,
    YoutubePlayerComponent,
    ChatBoxComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    YoutubeModule,
    BrowserAnimationsModule,
    MatProgressBarModule
  ],
  providers: [YoutubePlayerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
