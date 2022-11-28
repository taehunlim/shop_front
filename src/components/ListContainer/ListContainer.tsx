import React from 'react';
import {useDispatch} from "react-redux";
import useTypedSelector from "../../hooks/useTypedSelector";

import {deleteTask} from '../../redux/actions/actions';

import List from "../List/List";

const ListContainer = () => {
    const dispatch = useDispatch();
    const tasks = useTypedSelector((state) => {
        if(state.Reducer.tasks) {
            return state.Reducer.tasks
        } else {
            return []
        };
    });

    const handleClick = (id: number) => {
        dispatch(deleteTask(id));
    };

    return (
       <List tasks={tasks} onClick={handleClick}/>
    );
};

export default ListContainer;