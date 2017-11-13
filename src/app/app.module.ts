import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { MessageListComponent } from './message-list/message-list.component';
import {ThreadsService} from "./services/threads.service";
import { StoreModule, Action } from '@ngrx/store';
import { INITIAL_APPLICATION_STATE, ApplicationState } from 'app/store/application-state';
import { LoadUserThreadsAction, LOAD_USER_THREADS_ACTION } from 'app/store/actions';
import * as _ from 'lodash';

export function StoreReducer(state:ApplicationState = INITIAL_APPLICATION_STATE,
                             action:Action): ApplicationState {
  switch(action.type) {
    case LOAD_USER_THREADS_ACTION :
     return handleLoadUserThreads(state,action);
    default:
      return state;
  }
}

function handleLoadUserThreads(state: ApplicationState,action: LoadUserThreadsAction):ApplicationState {
  const newUserData = action.payload;
  const newState: ApplicationState = Object.assign({},state);

  newState.storeData = {
    participants: _.keyBy(action.payload.participants,'id'),
    messages: _.keyBy(action.payload.messages,'id'),
    threads: _.keyBy(action.payload.threads,'id')
  }
  return newState;
}

@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //StoreModule.provideStore(StoreReducer,INITIAL_APPLICATION_STATE)
    StoreModule.provideStore(StoreReducer)
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
