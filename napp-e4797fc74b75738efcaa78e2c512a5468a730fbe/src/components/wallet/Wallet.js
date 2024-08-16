import { useTonWallet } from '@tonconnect/ui-react';

export const Wallet = () => {
    const wallet = useTonWallet();

    console.log(wallet, 'salom');
    return (
        wallet && (
            <div>
                <span>Connected wallet: {wallet.name}</span>
                <span>Device: {wallet.device.appName}</span>
            </div>
        )
    );
};

export default Wallet;