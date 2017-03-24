import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NotificationComponent, NotAuthorizedComponent]
})
export class SharedModule { }
