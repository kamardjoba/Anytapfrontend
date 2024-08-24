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

        // Подписка на изменение статуса
        connector.onStatusChange((status) => {
            console.log("Connection status changed:", status);
        });

        if (!connector.connected) {
            console.log("Trying to establish a new connection...");
            // Используйте доступные методы для попытки соединения
            const wallet = await connector.wallet;
            console.log("Wallet object:", wallet);
            if (wallet) {
                return wallet;
            }
        } else {
            console.log("Wallet already connected:", connector.wallet);
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
