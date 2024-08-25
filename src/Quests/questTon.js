import React from 'react';
import '../Css/Quests.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';

const TonTrans = ({ GoTon, TonTran_val, setTonTranVal, arrows }) => {
    const [tonConnectUI] = useTonConnectUI();

    GoTon = async () => {
        const walletInfo = tonConnectUI.walletInfo;
        if (!walletInfo) { // Если кошелек не подключен
            alert("First ‘Connect Wallet’ to you can call ‘Mint’ function");
            return; // Останавливаем выполнение функции
          }
        try {
            const transaction = {
                validUntil: Date.now() + 5 * 60 * 1000,
                messages: [
                    {
                        address: 'UQC-ZK_dPpZ15VaL-kwyXT1jTCYDTQricz8RxvXT0VmdbRYG',
                        amount: '1000000', // 1 TON в нанотонах
                    },
                ],
            };

            await tonConnectUI.sendTransaction(transaction);
            alert('Transaction sent successfully!');
            setTonTranVal(true);  // Устанавливаем TonTran_val в true
        } catch (error) {
            console.error('Transaction failed:', error);
            alert('Transaction failed: ' + error.message);
        }
    };

    return (
        <TonConnectUIProvider manifestUrl="https://gleaming-semifreddo-896ccf.netlify.app/tonconnect-manifest.json">
            <div className='questItem'>
                <div className='questItemLeft'>
                    <div className='questIcon'>
                        <img src={arrows} alt="" />
                    </div>
                    <div className='questItemLeftContent'>
                        <p className='questTitle'>Make Ton transactions</p>
                        <p className='questSubtitle'>+5000 Points</p>
                    </div>
                </div>
                <div className='questItemRight'>
                    {!TonTran_val && (<button className='questBtn' onClick={GoTon}>GO!</button>)}
                </div>
            </div>
        </TonConnectUIProvider>
    );
};

export default TonTrans;
