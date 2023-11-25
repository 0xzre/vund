import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThirdwebProvider, metamaskWallet, coinbaseWallet, walletConnect } from '@thirdweb-dev/react';
import { Sepolia } from "@thirdweb-dev/chains";

import App from './App.jsx';
import './index.css';
import { StateContextProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThirdwebProvider 
        activeChain={ Sepolia } 
        clientId='94066216886bfff14ff119b82dde1ac9'
        supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect()]}
        >
        <Router>
            <StateContextProvider>
                <App />
            </StateContextProvider>
        </Router>
    </ThirdwebProvider>
);