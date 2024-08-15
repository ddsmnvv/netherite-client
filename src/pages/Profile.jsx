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
            <li>telegram_id: {user.user.telegram_id}</li>
            <li>telegram_name: {user.user.telegram_name}</li>
            <li>balance: {user.user.balance}</li>
            <li>premium: {user.user.premium ? "true" : "false"}</li>
            <li>language_code: {user.user.language_code}</li>
            <li>invited_id: {user.user.invited_id}</li>
            <li>wallet: {user.user.wallet}</li>
        </ul>
        </>
    )
});

export default Profile;