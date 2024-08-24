// src/TonConnect.js
import { TonConnect } from '@tonconnect/sdk';
console.log("TonConnect.js loaded");
console.log("connectWallet function:", typeof connectWallet);

const connector = new TonConnect({
    manifestUrl: 'https://gleaming-semifreddo-896ccf.netlify.app/tonconnect-manifest.json',
});

export const connectWallet = async () => {
    try {
        await connector.restoreConnection();
        if (!connector.connected) {
            await connector.connectWallet();
        }
        return connector.wallet;
    } catch (error) {
        console.error("Failed to connect wallet:", error);
        return null;
    }
};

export const disconnectWallet = () => {
    connector.disconnect();
};

export const getWalletAddress = () => {
    return connector.connected ? connector.wallet?.account.address : null;
};
