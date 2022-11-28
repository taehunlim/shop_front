import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fireEvent, render} from "@testing-library/react";

import {DELETE_TASK} from "../../redux/actions/types";

import ListContainer from "./ListContainer";

import tasks from "../../../fixtures/tasks";
import MockedFunction = jest.MockedFunction;

jest.mock('react-redux');

describe('ListContainer', () => {
    const dispatch = jest.fn();

    const _useDispatch = useDispatch as MockedFunction<typeof useDispatch>,
        _useSelector = useSelector as MockedFunction<typeof useSelector>;

    _useDispatch.mockImplementation(() => dispatch);
    _useSelector.mockImplementation((selector: any) => selector({
        Reducer: { tasks }
    }));

    it('render task', () => {
        const {container, getAllByText} = render(
            <ListContainer/>
        );

        const buttons = getAllByText("complete");

        fireEvent.click(buttons[0]);

        expect(dispatch).toBeCalledWith({
            type: DELETE_TASK,
            payload: { id: 1 }
        });

        expect(container).toHaveTextContent("title1");
    });
});