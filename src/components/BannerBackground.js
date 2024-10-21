// BannerBackground.js
import React from 'react';
import './../css/BannerBackground.css';

function BannerBackground({ children }) {
  return (
    <div className="banner-background">
      {children}
    </div>
  );
}

export default BannerBackground;
