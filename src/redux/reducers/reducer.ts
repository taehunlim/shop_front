import {
    TasksProps,
} from '../actions/actions';

import ActionType from '../actions/types';

interface InitialState {
    tasks: TasksProps[];
};

type Action = {
    type: ActionType;
    payload: any;
};

const initialState = {
    tasks: [],
};

export default function Reducer(state: InitialState = initialState, action: Action) {
    switch (action.type) {
        case ActionType.SET_TASKS:
            return {
                ...state,
                tasks: action.payload.tasks
            };

        case ActionType.DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload.id)
            };
        default:
            return state
    }
}