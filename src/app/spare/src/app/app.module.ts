import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import {appRouting} from './app.routs';
import {HeaderComponent} from './shared/components/header/header.component';
import { SearchComponent } from './search/search.component';
import {FormsModule} from '@angular/forms';
import { AgentListComponent } from './search/agent-list/agent-list.component';
import {AdministratorService} from './administrator/services/administrator.service';
import {HttpModule} from '@angular/http';
import {SearchService} from './search/search.service';
import { AgentEditComponent } from './search/agent-edit/agent-edit.component';
import {ReportsModule} from './reports/reports.module';
import { UrlResolver } from '@angular/compiler';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AgentsMassUpdateComponent } from './search/agents-mass-update/agents-mass-update.component';
import {AdministratorModule} from './administrator/administrator.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    AgentListComponent,
    AgentEditComponent,
    AgentsMassUpdateComponent
  ],
  imports: [
    BrowserModule,
    appRouting,
    FormsModule,
    HttpModule,
    SharedModule.forRoot(),
    NgbModule.forRoot(),
    AdministratorModule,
    ReportsModule
  ],
  providers: [AdministratorService, SearchService, UrlResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
