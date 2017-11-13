import { Action } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { AllUserData } from "../../../shared/to/all-user-data";


export const LOAD_USER_THREADS_ACTION = 'LOAD_USER_THREADS_ACTION';

export class LoadUserThreadsAction implements Action {

    public type = LOAD_USER_THREADS_ACTION;

    constructor(public payload?:AllUserData) {

    }
    
}