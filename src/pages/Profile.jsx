import { useTonConnectUI, useTonAddress } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import { endMining, getMiningTime, startMining } from '../api/miningAPI';
import useInterval from '../components/hooks/UseInterval';
import { NavLink } from 'react-router-dom';
import { FRIENDS_ROUTE, TASKS_ROUTE } from '../utils/routes-consts';

const Profile = observer(() => {
    
    const {user} = useContext(Context);
    let [count, setCount] = useState(40);
    let [delay, setDelay] = useState(1000);
    const [isRunning, setIsRunning] = useState(false);

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

    useInterval(() => {
      if(count === 0) {
        setIsRunning(false);
      } else {
        setCount(count - 1);
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

    const [tonConnectUI] = useTonConnectUI();
    const address = useTonAddress();

    return(
        <>
        <p>Profile</p>
        {address ? <button onClick={() => { tonConnectUI.disconnect(); localStorage.clear(); user.setIsAuth(false);}}>Отключить кошель</button> : <button onClick={() => tonConnectUI.openModal()}>Подключить кошель</button>}
        {address ? "кошель есть" : "кошель нет"}
        <ul>
            <li>id: {user.user.id}</li>
            <li>balance: {user.user.balance}</li>
            <li>language_code: {user.user.location}</li>
            <li>invited_id: {user.user.invitedId}</li>
            <li>premium: {user.user.isPremium ? "true" : "false"}</li>
            <li>telegram_id: {user.user.telegramId}</li>
            <li>telegram_name: {user.user.telegramName}</li>
            <li>wallet: {user.user.wallet}</li>
        </ul>
        {user.isAuth && (
            <>
            <p>{count.toFixed(0)}</p>
            {count === 40 && isRunning === false && <button onClick={() => handleStartMining()}>Майнинг начать</button>}
            {count === 0 && isRunning === false && <button onClick={() => handleEndMining()}>Майнинг завершить</button>}
            </>
            )
        }
        <div style={{display: "flex", flexDirection : "column"}}>
            <NavLink to={TASKS_ROUTE}>задания</NavLink>
            <NavLink to={FRIENDS_ROUTE}>рефералы</NavLink>
        </div>
        </>
    )
});

export default Profile;