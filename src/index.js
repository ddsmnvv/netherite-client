import React, { createContext } from 'react';
import './assets/css/style.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import UserStore from './store/UserStore';
import TasksStore from './store/TasksStore';
import FriendsStore from './store/FriendsStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      user: new UserStore(),
      tasks: new TasksStore(),
      friends: new FriendsStore()
      }}>
      <TonConnectUIProvider manifestUrl="https://app.netherite.pro/tonconnect-manifest.json" actionsConfiguration={{twaReturnUrl: `https://t.me/netherite_dev_bot/dev`}}>
        <App />
      </TonConnectUIProvider>
    </Context.Provider>
  </React.StrictMode>
);