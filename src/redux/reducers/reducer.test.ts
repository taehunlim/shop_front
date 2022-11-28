import reducer from './reducer';

import {deleteTask, setTasks} from "../actions/actions";
import tasks from "../../../fixtures/tasks";

describe('reducer', () => {
    describe("setTasks", () => {
        it('changes tasks array', () => {
            const initialState = {
                tasks: []
            };

            //@ts-ignore
            const state = reducer(initialState, setTasks(tasks));

            expect(state?.tasks).not.toHaveLength(0);
        });
    });

    describe("deleteTask", () => {
        it('removes the task from tasks', () => {
            const initialState = {
                tasks: [{id: 1, title: "title1"}]
            };

            //@ts-ignore
            const state = reducer(initialState, deleteTask(1));

            expect(state?.tasks).toHaveLength(0);
        });
    });
});