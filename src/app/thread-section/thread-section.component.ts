import { Component, OnInit } from '@angular/core';
import {ThreadsService} from "../services/threads.service";
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/store/application-state';
import { LoadUserThreadsAction } from 'app/store/actions';
import { Observable } from 'rxjs';
import { Thread } from '../../../shared/model/thread';
import * as _ from 'lodash';
import { ThreadSummaryVM } from 'app/thread-section/thread-summary.vm';
import { mapStateToUserName } from 'app/thread-section/mapStateToUserName';
import { mapStateToUnreadMessageCounter } from 'app/thread-section/mapStateToUnreadMessageCounter';


@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  //userName$: Observable<string>;
  userName$ : Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;


  constructor(private threadsService: ThreadsService,
              private store: Store<ApplicationState>) {
               //this.userName$ =  store.skip(1).map(this.mapStateToUserName);
               //this.unreadMessagesCounter$ = store.skip(1).map(this.mapStateToUnreadMessageCounter);
               this.userName$ =  store.skip(1).map(mapStateToUserName);
               this.unreadMessagesCounter$ = store.skip(1).map(mapStateToUnreadMessageCounter);
               this.threadSummaries$ = store.select((state) => {
                const threads = _.values<Thread>(state.storeData.threads);
                return threads.map(thread => {

                  const names = _.keys(thread.participants).map(
                    participantId => state.storeData.participants[participantId].name
                  );

                  const lastMessageId = _.last(thread.messageIds);
                  const lastMessage = state.storeData.messages[lastMessageId];
                 return {
                  id: thread.id,
                  participantNames:_.join(names,','),
                  lastMessageText: lastMessage.text,
                  timeStamp: lastMessage.timestamp
                }
               });
               });
  }

  // mapStateToUserName( state:ApplicationState): string{
  //   return state.storeData.participants[state.uiState.userId].name;
  // }

  // mapStateToUnreadMessageCounter( state:ApplicationState ): number {
  //   //debugger;
  //   const currentUserId = state.uiState.userId;
  //   return _.values<Thread>(state.storeData.threads)
  //    .reduce(
  //      (acc,thread) => {
  //        return acc + thread.participants[currentUserId];
  //      }
  //     ,0);
  // }

  ngOnInit() {

        this.threadsService.loadUserThreads()
        .subscribe((allUserData)=> 
         this.store.dispatch(new LoadUserThreadsAction(allUserData)));

  }

}
