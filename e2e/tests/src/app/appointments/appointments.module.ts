import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsComponent } from './appointments.component';
import { AppointmentsListComponent } from './appointments-list/appointments-list.component';
import {AppointmentsService} from './services/appointments.service';
import { AppointmentEditComponent } from './appointment-edit/appointment-edit.component';
import {AppointmentEditService} from './services/appointment-edit.service';
import {RouterModule} from '@angular/router';
import {TranslateModule} from 'ng2-translate';
import {FormsModule} from '@angular/forms';
import { ApproversComponent } from './approvers/approvers.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../shared/shared.module';
import { FileAttachmentsComponent } from './file-attachments/file-attachments.component';
import {BsDatepickerModule} from 'ngx-bootstrap';
import {ApproversService} from "./approvers/approvers.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TranslateModule,
    NgbModule,
    BsDatepickerModule,
    RouterModule
  ],
  declarations: [AppointmentsComponent, AppointmentsListComponent, AppointmentEditComponent,
    ApproversComponent,
    FileAttachmentsComponent],
  exports: [AppointmentsComponent],
  providers: [AppointmentsService, AppointmentEditService, ApproversService]
})
export class AppointmentsModule { }
