import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdministratorComponent} from './administrator.component';
import {AdministratorService} from './services/administrator.service';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UsersListComponent} from './users-list/users-list.component';
import {UsersMassUpdateComponent} from './users-mass-update/users-mass-update.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [AdministratorComponent, UsersListComponent, UserEditComponent, UsersMassUpdateComponent],
  exports: [AdministratorComponent],
  providers: [AdministratorService]
})
export class AdministratorModule { }
