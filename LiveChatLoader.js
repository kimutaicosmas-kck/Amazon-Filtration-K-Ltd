import React, { useEffect } from 'react';

const LiveChatLoader = () => {
  useEffect(() => {
    const tawkPropertyId = process.env.REACT_APP_TAWKTO_PROPERTY_ID;
    const tawkWidgetId = process.env.REACT_APP_TAWKTO_WIDGET_ID;
    const crispWebsiteId = process.env.REACT_APP_CRISP_WEBSITE_ID;

    // Prefer Tawk.to if configured, otherwise Crisp
    if (tawkPropertyId && tawkWidgetId) {
      if (window.Tawk_API) return; // avoid double-inject
      var Tawk_API = (window.Tawk_API = window.Tawk_API || {});
      var Tawk_LoadStart = new Date();
      (function () {
        var s1 = document.createElement('script');
        var s0 = document.getElementsByTagName('script')[0];
        s1.async = true;
        s1.src = `https://embed.tawk.to/${tawkPropertyId}/${tawkWidgetId}`;
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
      })();
      return;
    }

    if (crispWebsiteId) {
      if (window.$crisp) return;
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = crispWebsiteId;
      (function () {
        const d = document;
        const s = d.createElement('script');
        s.src = 'https://client.crisp.chat/l.js';
        s.async = 1;
        d.getElementsByTagName('head')[0].appendChild(s);
      })();
    }
  }, []);

  return null;
};

export default LiveChatLoader;


