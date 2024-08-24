import { TonConnect } from '@tonconnect/sdk';

const connector = new TonConnect({
    manifestUrl: 'https://gleaming-semifreddo-896ccf.netlify.app/tonconnect-manifest.json',
});
console.log("Connector object:", connector);
console.log("Connector methods:", Object.keys(connector));

export const connectWallet = async () => {
    try {
        await connector.restoreConnection();
        console.log("Connector connected:", connector.connected);

        // Проверьте, есть ли другой метод для подключения кошелька
        if (!connector.connected) {
            const wallet = await connector.requestSign();
            console.log("Wallet request sign:", wallet);
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
