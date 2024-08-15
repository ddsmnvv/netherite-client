import { useTonConnectUI, useTonAddress } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import { useContext, useReducer, useState } from 'react';
import { Context } from '..';
import { startMining } from '../api/miningAPI';
import useInterval from '../components/hooks/UseInterval';

const Profile = observer(() => {
    
    const {user} = useContext(Context);
    let [count, setCount] = useState(40);
    let [delay, setDelay] = useState(1000);
    const [isRunning, setIsRunning] = useState(false);

    useInterval(() => {
      setCount(count - 1);
      if(count <= 0) {
        setIsRunning(false);
      }
    }, isRunning ? delay : null);
   
    function handleStartMining() {
        setIsRunning(true);
        setDelay(1000);
    }

    function handleEndMining() {
        user.balance += 100;
        setCount(40);
    }

    const [tonConnectUI] = useTonConnectUI();
    const address = useTonAddress();

    return(
        <>
        <p>Profile</p>
        {address ? <button onClick={() => tonConnectUI.disconnect()}>Отключить кошель</button> : <button onClick={() => tonConnectUI.openModal()}>Подключить кошель</button>}
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
            <p>{count}</p>
            {count === 40 && isRunning === false && <button onClick={() => handleStartMining()}>Майнинг начать</button>}
            {count === 0 && isRunning === false && <button onClick={() => handleEndMining()}>Майнинг завершить</button>}
            </>
            )
        }
        </>
    )
});

export default Profile;