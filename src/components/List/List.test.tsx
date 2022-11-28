import React from 'react';

import {render, fireEvent} from "@testing-library/react";

import List from "./List";
import {TasksProps} from "../../redux/actions/actions";

import tasks from "../../../fixtures/tasks";

describe("List", () => {
    const handleClick = jest.fn();

    function getTasks(tasks: TasksProps[]) {
        return render(
            <List tasks={tasks} onClick={handleClick}/>
        );
    };

    it('renders tasks', () => {
        const {container} = getTasks(tasks)
        expect(container).toHaveTextContent("title1");
        expect(container).toHaveTextContent("title2");
    });

    it('renders complete buttons to delete a task', () => {
        const {getAllByText} = getTasks(tasks);

        const buttons = getAllByText("complete");

        fireEvent.click(buttons[0]);

        expect(handleClick).toBeCalledWith(1);
    });

    it('renders no tasks message', () => {
        const {container} = getTasks([]);

        expect(container).toHaveTextContent("할 일이 없어요!");
    });
});