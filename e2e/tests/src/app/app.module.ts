import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './appRoutes/app-routs.module';
import {HttpModule} from '@angular/http';
import {AppointmentsModule} from './appointments/appointments.module';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DelegateService} from './home/delegate.service';
import { EditDelegateComponent } from './edit-delegate/edit-delegate.component';
import { BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditDelegateComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
 //   NgbModule.forRoot(),
    SharedModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AppointmentsModule
  ],
  providers: [DelegateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
