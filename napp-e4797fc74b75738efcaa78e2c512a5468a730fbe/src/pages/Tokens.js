import React, { useContext, useEffect } from 'react'
import '../assets/style/tokens.css'
import bgImageFirst from "../assets/images/profile/Ellipse 1142 (1).png";
import bgImageSecond from "../assets/images/profile/Ellipse 1141 (1).png";
import bgImageThird from "../assets/images/profile/Ellipse 1158.png";
import { Context } from '..';
import { completeTask, getTasks } from '../api/tasksAPI';
import { observer } from 'mobx-react-lite';

const Tokens = observer(() => {

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

    return (
        <div className='tokens'>
            <div className="tokens_bg">
                <img src={bgImageFirst} alt="Background 1" />
                <img src={bgImageSecond} alt="Background 2" />
                <img src={bgImageThird} alt="Background 2" />
            </div>
            <div className="tokens_blocks">
                <div className="tokens_blocks-block">
                    <span>Frens</span>
                    <h1>Earn tokens</h1>
                    <p>Complete tasks and get tokens instantly</p>
                </div>
                <div className="tokens_blocks-block tokens_blocks-block__cards">
                    <span>{tasks.tasks.length === 1 ? `${tasks.tasks.length} Open task` : tasks.tasks.length > 0 ? `${tasks.tasks.length} Open tasks` : `No tasks`}</span>
                    {tasks.tasks.length > 0 ? tasks.tasks.map(task => 
                    <ul className="tokens_blocks-block__list">
                        <li className="tokens_blocks-block__list-item">
                            <div className="tokens_blocks-block__list-item_logo">
                                💎
                            </div>
                            <div className="tokens_blocks-block__list-item_desc">
                                <p>{task.title}</p>
                                <span>+{task.reward} NZR</span>
                            </div>
                            <button onClick={() => handleTaskComplete(user.user.id, task.id)}>Complete</button>
                        </li>
                    </ul>)
                    :
                    <p>Tasks not found</p>
                    }
                </div>
            </div>
        </div>
    )
});

export default Tokens
