import React, { useContext, useEffect, useState } from 'react'
import { CiFileOn, FaUserFriends } from './icons';
import useInterval from './hooks/UseInterval';
import AnimatedNumber from 'react-animated-numbers';
import { endMining, getMiningTime, startMining } from '../api/miningAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { NavLink } from 'react-router-dom';
import { FRIENDS_ROUTE, TASKS_ROUTE } from '../utils/routes-consts';

const Activities = observer(() => {

    const {user} = useContext(Context);
    let [count, setCount] = useState(40);
    const [percent, setPercent] = useState(0);
    let [delay, setDelay] = useState(1000);
    const [isRunning, setIsRunning] = useState(false);

    useInterval(() => {
        if(count === 0) {
          setIsRunning(false);
        } else {
          setCount(count - 1);
          setPercent(((40 - count) / 40) * 100);
        }
    }, isRunning ? delay : null);

      function handleStartMining() {
        startMining(user.user.id)
        .then(response => {
            if(response.data) {
                setIsRunning(true);
                setDelay(1000);
            }
        })
        .catch(error => console.error(error));
        }

        useEffect(() => {
            if(user.isAuth) {
                getMiningTime(user.user.id)
                .then(response => {
                    if(response.data !== 0) {
                        setCount(Number(response.data.toFixed(0)));
                        setIsRunning(true);
                    } else{
                        setCount(0);
                        setIsRunning(false);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
            }
        }, [user.isAuth]);

    function handleEndMining() {
        endMining(user.user.id)
        .then(response => {
            if(response.data) {
                user.user.balance += 100;
                setCount(40);
            }
        })
        .catch(error => console.error(error));
    }

    const progressBarWidth = Math.min(100, (percent / 100) * 100);
    const minutes = Math.floor(count / 60);
    const seconds = count % 60;

    return (
        <div className="profile_blocks-block__activities">
            <h2>Activities</h2>
            {count === 40 && isRunning === false ? (
            <button
                onClick={() => handleStartMining()}
                className="profile_blocks-block__activities-btn"
            >
                Start farming
            </button>
            ) : count === 0 && isRunning === false ? (
            <button
                onClick={() => handleEndMining()}
                className="profile_blocks-block__activities-btn complete"
            >
                Complete
            </button>
            ) : (
            <div className="profile_blocks-block__activities-time">
                <div className="profile_blocks-block__activities-time__num">
                <p
                    style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    }}
                >
                    <div style={{ marginRight: "5px" }}>Rewarding</div>
                    <AnimatedNumber
                    fontStyle={{ fontSize: 16, fontWeight: 700 }}
                    animateToNumber={percent.toFixed(3)}
                    includeComma
                    config={{ tension: 89, friction: 40 }}
                    animationType={"calm"}
                    />
                    <div style={{ marginLeft: "5px" }}>N</div>
                </p>
                <div
                    className="profile_blocks-block__activities-time__num_loader"
                    style={{ width: `${progressBarWidth}%` }}
                ></div>
                </div>
                <div className="profile_blocks-block__activities-time__countdown">
                <span>
                    {minutes > 0 ? (
                    <>
                        <AnimatedNumber
                        fontStyle={{ fontSize: 12, fontWeight: 400 }}
                        animateToNumber={minutes.toFixed(0)}
                        includeComma
                        config={{ tension: 89, friction: 40 }}
                        animationType={"calm"}
                        />
                        m
                    </>
                    ) : (
                    ""
                    )}
                    <AnimatedNumber
                    fontStyle={{ fontSize: 12, fontWeight: 400 }}
                    animateToNumber={seconds.toFixed(0)}
                    includeComma
                    config={{ tension: 89, friction: 40 }}
                    animationType={"calm"}
                    />
                    s
                </span>
                </div>
            </div>
            )}
            <div className="profile_blocks-block__activities-button">
                <NavLink to={TASKS_ROUTE}><button><CiFileOn /> Tasks</button></NavLink>
                <NavLink to={FRIENDS_ROUTE}><button><FaUserFriends /> Friends</button></NavLink>
            </div>
        </div>
    )
})

export default Activities;
