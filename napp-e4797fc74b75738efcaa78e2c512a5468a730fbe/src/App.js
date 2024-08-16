import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { getUserByWallet, registerUser } from './api/userAPI';
import LoadingImage from "./assets/images/loading-image.png";
import RedirectImage from "./assets/images/ton-user-not-found.svg";
import styles from "./App.module.css";

const App = observer(() => {
  const [height, setHeight] = useState(window.innerHeight);

  const tg = window.Telegram.WebApp;
  tg.ready();

  const {user} = useContext(Context);

  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [referal, setReferal] = useState(false);

  const tonAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const [referralLink, setReferralLink] = useState("");

  useEffect(() => {
    const invitedId = localStorage.getItem("invitedId");

    if(!user.isAuth) {
      if (tonAddress) {
        getUserByWallet(tonAddress)
          .then(response => {
            user.setUser(response.data);
            console.log(response.data);
            user.setIsAuth(true);
          })
          .catch(error => {
            if (error.response.status === 404 && !tg.initDataUnsafe?.user) {
              setRedirect(true);
            } else if(error.response.status === 404) {
              registerUser(user.user.location, user.user.invitedId, user.user.isPremium, user.user.telegramId, user.user.telegramName, tonAddress)
              .then(response => {
                user.user.id = response;
                user.setIsAuth(true);
              })
              .catch(
                error => {
                  console.error(error);
                  localStorage.clear();
                  tonConnectUI.disconnect();
                  user.setIsAuth(false);
                }
              );
            } else {
              console.error(error);
              localStorage.clear();
              tonConnectUI.disconnect();
              user.setIsAuth(false);
            }
          })
          .finally(() => setLoading(false));
      } else {
        if (tg.initDataUnsafe?.user) {
          setLoading(false);
          if(!invitedId){
            setReferal(true);
          }
          user.setUser({
            "id" : 0,
            "balance" : 0,
            "location" : tg.initDataUnsafe?.user.language_code,
            "invitedId" : invitedId || null,
            "isPremium" : tg.initDataUnsafe?.user.is_premium ? true : false,
            "telegramId" : String(tg.initDataUnsafe?.user.id),
            "telegramName" : (tg.initDataUnsafe?.user.first_name + " " + tg.initDataUnsafe?.user.last_name).replace(/ +/g, ' ').trim(),
            "wallet" : null
          });
        } else {
          setLoading(false);
        }
      }
    }

  }, [tonAddress]);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };

    setHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleReferralSubmit = () => {
    try {
      const url = new URL(referralLink);
      const invitedId = url.searchParams.get("invitedId");
      if (invitedId) {
        localStorage.setItem("invitedId", invitedId);
        console.log("Invited ID:", localStorage.getItem("invitedId"));
        setReferal(false);
        user.user.invitedId = invitedId;
      }
    } catch (e) {
      console.error("Invalid URL");
    }
  };

  const handleReferralCancel = () => {
    localStorage.setItem("invitedId", null);
    console.log("Invited ID:", localStorage.getItem("invitedId"));
    setReferal(false);
  };

  if (loading) {
    return (
      <div className="loading-block">
        <img src={LoadingImage} className="loading-image"/>
        <h3 style={{color: "white"}}>Loading...</h3>
      </div>
    );
  }

  if (redirect) {
    return (
      <div className="loading-block">
        <img src={RedirectImage} className="redirect-image"/>
        <h3 style={{color: "white"}}>User not found.<br/>Register via Telegram bot.</h3>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px"}}>
          <button className='btn' style={{color: "white", padding: "15px", borderRadius: "10px", margin: "5px"}} onClick={() => window.location.replace("http://t.me/netheritetrade_bot/netheriteapp")}>Go to Telegram</button>
          <button className='btn' style={{color: "white", padding: "15px", borderRadius: "10px", margin: "5px"}} onClick={() => { tonConnectUI.disconnect(); setRedirect(false); localStorage.clear(); }}>Disconnect current wallet</button>
        </div>
      </div>
    );
  }

  if (referal) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <h2 style={{color: "white", marginBottom: "10px"}}>Enter Referral Link</h2>
          <input 
            type="text" 
            value={referralLink} 
            onChange={(e) => setReferralLink(e.target.value)} 
            placeholder="Paste your referral link here"
            className={styles.input}
          />
          <button className='btn' style={{color: "white", padding: "10px", borderRadius: "10px", margin: "5px"}} onClick={() => handleReferralCancel()}>Cancel</button>
          <button className='btn' style={{color: "white", padding: "10px", borderRadius: "10px", margin: "5px"}} onClick={() => handleReferralSubmit()}>Submit</button>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  );
});

export default App;
