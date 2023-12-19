
import $ from "jquery";
import React, { useState } from 'react';

const ThemeSwitcher = () => {
  const [isSwitcherToggled, setSwitcherToggled] = useState(false);

  const toggleSwitcher = () => {
    setSwitcherToggled((prev) => !prev);
  };

  const closeSwitcher = () => {
    setSwitcherToggled(false);
  };

  const setTheme = (theme) => {
    document.body.className = `bg-theme ${theme}`;
  };

  return (
    <div className={`wrapper ${isSwitcherToggled ? 'switcher-toggled' : ''}`}>
      <div className="switcher-wrapper">
        <div className="switcher-btn" onClick={toggleSwitcher}>
          <i className="bx bx-cog bx-spin"></i>
        </div>
        <div className="switcher-body">
          <div className="d-flex align-items-center">
            <h5 className="mb-0 text-uppercase">Theme Customizer</h5>
            <button type="button" className="btn-close ms-auto close-switcher" aria-label="Close" onClick={closeSwitcher}></button>
          </div>
          <hr />
          <p className="mb-0">Gaussian Texture</p>
          <hr />
          <ul className="switcher">
            {[1, 2, 3, 4, 5, 6].map((theme) => (
              <li key={`theme${theme}`} onClick={() => setTheme(`bg-theme${theme}`)}></li>
            ))}
          </ul>
          <hr />
          <p className="mb-0">Gradient Background</p>
          <hr />
          <ul className="switcher">
            {[7, 8, 9, 10, 11, 12, 13, 14, 15].map((theme) => (
              <li key={`theme${theme}`} onClick={() => setTheme(`bg-theme${theme}`)}></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
