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

        // Если не подключено, возможно, нужно вызвать другой метод или инициировать подключение
        if (!connector.connected) {
            console.log("Trying to establish a new connection...");
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
