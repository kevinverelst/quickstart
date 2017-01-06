import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {CommentModule} from "./Comments/comments.module";
import {EmitterService} from "./emitter.service";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, JsonpModule, CommentModule],
  declarations: [AppComponent],
  providers: [EmitterService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
