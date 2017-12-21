import { DoneTodosPipe } from './../pipes/done-todos/done-todos';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AddTaskModalPage } from '../pages/add-task-modal/add-task-modal';
import { MyApp } from './app.component';
import { TodosPage } from '../pages/todos/todos';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { TodoServiceProvider } from '../shared/todo-service';
import { PrioritizedTodosPiPePipe } from '../pipes/prioritized-todos-pi-pe/prioritized-todos-pi-pe';

@NgModule({
  declarations: [
    MyApp,
    TodosPage,
    AddTaskModalPage,
    PrioritizedTodosPiPePipe,
    DoneTodosPipe
  ],
  imports: [
    HttpModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TodosPage,
    AddTaskModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TodoServiceProvider,
    
  ]
})

export class AppModule {}
