// src/TonConnect.js
import { TonConnect } from '@tonconnect/sdk';

const connector = new TonConnect({
    manifestUrl: 'https://yourdomain.com/tonconnect-manifest.json',
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
