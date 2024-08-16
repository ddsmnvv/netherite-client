import React, { useEffect } from 'react';
import styles from '../App.module.css';
import { TonConnectButton, useTonWallet, useTonAddress } from '@tonconnect/ui-react';
import Circle from '../components/circles/Circle';
import Images from '../components/Images';
import Circle2 from '../components/circles/Circle2';
import Button from '../components/button/Button';
import BigWhiteCircle from '../components/mobileVersion/BigWhiteCircle';
import CircleMobile from '../components/mobileVersion/CircleMobile';
import SmallWhiteCircle from '../components/mobileVersion/SmallWhiteCircle';
import allCard from '../assets/images/Group 16.svg';
import UnderHeader from '../components/mobileVersion/UnderHeader';
import Address from '../components/wallet/Address';
import Wallet from '../components/wallet/Wallet';
import EntrypointPage from '../components/wallet/EntrypointPage';

const Home = ({ height }) => {
    const wallet = useTonWallet();
    const address = useTonAddress();

    useEffect(() => {
        document.querySelector('body').style = 'overflow-y:hidden';
    }, []);

    useEffect(() => {
        if (wallet) {
            console.log('Connected wallet:', wallet);
            console.log('Connected wallet address:', address);
        } else {
            console.log('No wallet connected');
        }
    }, [wallet, address]);

    return (
        <div style={{ height: height }} className={styles.header}>
            {/* <Address />
            <Wallet/>z
            <EntrypointPage/> */}
            <div className={styles.header__desc}>
                <div className={styles.block}>
                    <div className={styles.circle}></div>
                    <Circle />
                    <Images />
                    <Circle2 />
                    <div className={styles.bigText}>
                        <p>Trade
                            <br />  more efficient</p>
                        <div className={styles.smallText}>
                            <p>A binary options broker working with TON. Get up to <text>~98%</text> of the profit from the transaction</p>
                        </div>
                        <div className={styles.spans}>
                            <div className={styles.whitespan}></div>
                            <div className={styles.grayspan}></div>
                            <div className={styles.grayspan}></div>
                        </div>
                    </div>
                </div>
                <Button />
            </div>
            <div className={styles.header__mobile}>
                <BigWhiteCircle />
                <CircleMobile />
                <SmallWhiteCircle />
                <div className={styles.topHeader}>
                    <div className={styles.cardBlock}>
                        <img style={{ width: "100%" }} src={allCard} alt="" />
                    </div>
                </div>
                <div className={styles.bigcircle}></div>
                <div className={styles.smallcircle}></div>
                <UnderHeader />
            </div>
        </div>
    );
}

export default Home;
