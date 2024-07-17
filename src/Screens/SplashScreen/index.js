import React from 'react';
import logo from '../../assets/logo/ursopadrao.png';
import './SplashScreen.css';

function SplashScreen() {
    return (
        <div className="splash-screen">
            <img src={logo} alt="Logo" />
        </div>
    );
}

export default SplashScreen;
