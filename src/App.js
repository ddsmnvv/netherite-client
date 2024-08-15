import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from ".";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { BrowserRouter } from "react-router-dom";
import LoadingImage from "./assets/images/loading-image.png";
import RedirectImage from "./assets/images/ton-user-not-found.svg";
import AppRouter from "./components/AppRouter"; 
import { getUserByWallet } from "./api/userAPI";

const App = observer(() => {
  
  const tg = window.Telegram.WebApp;
  tg.ready();

  const {user} = useContext(Context);
  const [tgData, setTgData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [referal, setReferal] = useState(false);

  const tonAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const [referralLink, setReferralLink] = useState("");

  useEffect(() => {
    const invitedId = localStorage.getItem("invitedId");

    if (tonAddress) {
      getUserByWallet(tonAddress)
        .then(response => console.log(response))
        .catch(error => {
          if (error.response.status === 404) {
            setRedirect(true);
          } else {
            localStorage.clear();
            tonConnectUI.disconnect();
          }
        })
        .finally(() => setLoading(false));
    } else {
      if (tg.initDataUnsafe?.user) {
        setTgData(tg.initDataUnsafe?.user);
        setLoading(false);
        if(!invitedId){
          setReferal(true);
        }
        user.setUser({
          "id" : 0,
          "telegram_id" : tgData.id,
          "telegram_name" : (tgData.first_name + " " + tgData.last_name).replace(/ +/g, ' ').trim(),
          "balance" : 0,
          "premium" : tgData.is_premium,
          "language_code" : tgData.language_code,
          "invited_id" : invitedId,
          "wallet" : null
        });
      } else {
        setLoading(false);
      }
    }
  }, [tonAddress]);

  const handleReferralSubmit = () => {
    try {
      const url = new URL(referralLink);
      const invitedId = url.searchParams.get("invitedId");
      if (invitedId) {
        localStorage.setItem("invitedId", invitedId);
        console.log("Invited ID:", localStorage.getItem("invitedId"));
        setReferal(false);
        user.user.invited_id = invitedId;
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
        <h3>Loading...</h3>
      </div>
    );
  }

  if (redirect) {
    return (
      <div className="loading-block">
        <img src={RedirectImage} className="redirect-image"/>
        <h3>User not found.<br/>Register via Telegram bot.</h3>
        <button onClick={() => window.location.replace("http://t.me/netheritetrade_bot/netheriteapp")}>Go to Telegram</button>
        <button onClick={() => { tonConnectUI.disconnect(); setRedirect(false); localStorage.clear(); }}>Disconnect current wallet</button>
      </div>
    );
  }

  if (referal) {
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Enter Referral Link</h2>
          <input 
            type="text" 
            value={referralLink} 
            onChange={(e) => setReferralLink(e.target.value)} 
            placeholder="Paste your referral link here"
          />
          <button onClick={handleReferralCancel}>Cancel</button>
          <button onClick={handleReferralSubmit}>Submit</button>
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
