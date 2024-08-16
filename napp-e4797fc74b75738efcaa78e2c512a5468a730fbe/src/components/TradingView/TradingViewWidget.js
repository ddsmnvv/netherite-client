import React, { useEffect, useRef, memo } from 'react';
import styles from './tradingview.css'

function TradingViewWidget() {
  const container = useRef();

  useEffect(
    
    () => {
      if (container.current && container.current.firstChild) {
        container.current.removeChild(container.current.firstChild);
      }
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BINANCE:NOTUSDT",
          "interval": "1",
          "timezone": "Europe/Moscow",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "hide_side_toolbar": false,
          "allow_symbol_change": false,
          "save_image": false,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
      container.current.appendChild(script);
    },
    []
  );
  return (
    <div ref={container} className='graph_vidjet'></div>
  );
}

export default memo(TradingViewWidget);