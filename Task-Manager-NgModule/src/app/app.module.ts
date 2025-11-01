import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './tasks/tasks.module';

@NgModule({
  // for non-standalone components
  declarations: [AppComponent, HeaderComponent, UserComponent],
  bootstrap: [AppComponent],
  // for standalone components and other modules
  imports: [BrowserModule, FormsModule, SharedModule, TasksModule],
})
export class AppModule {}
