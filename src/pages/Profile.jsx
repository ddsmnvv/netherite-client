import { useTonConnectUI } from '@tonconnect/ui-react';

const Profile = () => {
    
    const [tonConnectUI] = useTonConnectUI();

    return(
        <>
        <p>Profile</p>
        <button onClick={() => tonConnectUI.openModal()}>Подключить кошель</button>
        </>
    )
}

export default Profile;