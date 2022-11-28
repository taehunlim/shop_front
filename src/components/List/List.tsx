import React from 'react';

export default function List({ tasks, onClick }: any) {
    if (tasks.length === 0) {
        return (
            <p>할 일이 없어요!</p>
        );
    }

    return (
        <ol>
            {tasks.map((task: any) => (
                <li
                    key={task.id}
                >
                    {task.title}
                    <button onClick={() => onClick(task.id)}>complete</button>
                </li>
            ))}
        </ol>
    );
}