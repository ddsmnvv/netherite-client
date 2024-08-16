import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Context } from '..';
import { completeTask, getTasks } from '../api/tasksAPI';

const Tasks = observer(() => {

    const {user, tasks} = useContext(Context);

    useEffect(() => {
        if(user.isAuth) {
            getTasks(user.user.id)
            .then(response => {
                tasks.setTasks(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        }
    }, [user.isAuth]);

    const handleTaskComplete = (userId, taskId) => {
        completeTask(userId, taskId)
            .then(response => {
                if(response.data) {
                    tasks.removeTask(taskId);
                }
            }).catch(error => console.error(error));
    }

    return(
        <>
        <p>Tasks</p>
            {tasks.tasks.length > 0 ? tasks.tasks.map(task => 
                <ul>
                    <li>{task.id}</li>
                    <li>{task.title}</li>
                    <li>{task.description}</li>
                    <li>{task.reward}</li>
                    <li><button onClick={() => handleTaskComplete(user.user.id, task.id)}>Выполнить</button></li>
                </ul>)
                :
                "no tasks"
            }
        </>
    )
});

export default Tasks;