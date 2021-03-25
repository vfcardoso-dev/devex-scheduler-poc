import { WorkerComponent } from './worker/worker.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DxSchedulerModule, DxContextMenuModule} from 'devextreme-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WorkerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DxSchedulerModule,
    AppRoutingModule,
    DxContextMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
