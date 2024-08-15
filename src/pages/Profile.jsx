import { useTonConnectUI, useTonAddress } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '..';

const Profile = observer(() => {
    
    const {user} = useContext(Context);
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
        </>
    )
});

export default Profile;