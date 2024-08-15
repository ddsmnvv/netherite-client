import { useTonConnectUI } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '..';

const Profile = observer(() => {
    
    const {user} = useContext(Context);
    const [tonConnectUI] = useTonConnectUI();

    console.log(user.user());
 
    return(
        <>
        <p>Profile</p>
        <button onClick={() => tonConnectUI.openModal()}>Подключить кошель</button>
        </>
    )
});

export default Profile;