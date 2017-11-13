import { ApplicationState } from "app/store/application-state";
import { Thread } from "../../../shared/model/thread";
import * as _ from "lodash";

export function  mapStateToUnreadMessageCounter( state:ApplicationState ): number {
    //debugger;
    const currentUserId = state.uiState.userId;
    return _.values<Thread>(state.storeData.threads)
     .reduce(
       (acc,thread) => {
         return acc + thread.participants[currentUserId];
       }
      ,0);
  }