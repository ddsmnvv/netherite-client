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
  
  const {user} = useContext(Context);

  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const tonAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  const [userTg, setUserTg] = useState();

  useEffect(() => {
    if(tonAddress) {
      getUserByWallet(tonAddress)
        .then(response => console.log(response))
        .catch(error => {
          if(error.response.status = 404) {
            setRedirect(true);
          } else {
            tonConnectUI.disconnect();
          }
        })
        .finally(setLoading(false));
    } else {
      const tg = window.Telegram.WebApp;
      tg.ready();
      setUserTg(tg.initDataUnsafe?.user);
      if(userTg) {
        setLoading(false);
        console.log(userTg);
      } else {
        setLoading(false);
      }
    }
  }, [tonAddress])

  if (loading) {
    return (<div className="loading-block">
      <img src={LoadingImage} className="loading-image"/>
      <h3>Loading...</h3>
    </div>);
  }

  if (redirect) {
    return (<div className="loading-block">
      <img src={RedirectImage} className="redirect-image"/>
      <h3>User not found.<br/>Register via Telegram bot.</h3>
      <button onClick={() => window.location.replace("http://t.me/netheritetrade_bot/netheriteapp")}>Go to Telegram</button>
      <button onClick={() => { tonConnectUI.disconnect(); setRedirect(false); }}>Disconnect current wallet</button>
    </div>);
  }

  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  );
});

export default App;
