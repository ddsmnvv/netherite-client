import React, { useContext } from 'react'
import '../assets/style/profile.css'
import Wallet from '../assets/images/profile/waller.svg'
import bgImageFirst from "../assets/images/profile/Ellipse 1142 (1).png"
import bgImageSecond from "../assets/images/profile/Ellipse 1141 (1).png"
import bgImageThird from "../assets/images/profile/Ellipse 1158.png"
import bgImageBlocks from '../assets/images/profile/Group 3.png'
import Balance from '../components/Balance'
import Activities from '../components/Activities'
import Favorites from '../components/Favorites'
import Orders from '../components/Orders'
import unauthbg from "../assets/images/unauth-bg.png";
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import UnauthActivities from "../components/UnauthActivities"

const Profile = observer(() => {
    const { user } = useContext(Context);
    const [tonConnectUI] = useTonConnectUI();
    const address = useTonAddress();

    return (
      <div
        className="profile"
        style={{ overflow: user.isAuth ? "visible" : "hidden" }}
      >
        <div className="profile_bg">
          <img src={bgImageFirst} alt="Background 1" />
          <img src={bgImageSecond} alt="Background 2" />
          <img src={bgImageThird} alt="Background 3" />
        </div>
        <div className="profile_blocks">
          <div className="profile_blocks-block">
            <div className="profile_blocks-block__wallet">
              <img src={Wallet} alt="Wallet" />
              <p>
                {user.isAuth
                  ? `${address.substring(0, 30)}...`
                  : "..."}
              </p>
            </div>
            <Balance balance={user.user.balance}/>
            {user.isAuth ? (
              <Activities
              />
            ) : (
              <UnauthActivities />
            )}
          </div>
          {user.isAuth ? (
            <>
              <Favorites />
              <Orders />
            </>
          ) : null}
          <img
            className="bgImageBlocks"
            src={address ? bgImageBlocks : unauthbg}
            alt=""
          />
        </div>
        <div className="profile_blocks-absolute">
          {user.isAuth ? (
            <>
              <button
                className="btn"
                onClick={() => (window.location.href = "/graph")}
              >
                Trading platform 🦄
              </button>
            </>
          ) : (
            <div>
              <button
                className="btn"
                onClick={() => tonConnectUI.openModal()}
              >
                Connect wallet 💎
              </button>
            </div>
          )}
        </div>
      </div>
    );
  });

export default Profile
