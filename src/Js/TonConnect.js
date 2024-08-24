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

        // Используйте другой метод для выполнения подключения
        if (!connector.connected) {
            // Пытаемся использовать доступные методы объекта connector
            console.log("Wallet object:", connector.wallet);
            // Проверка, возвращает ли wallet какой-либо объект или статус
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
