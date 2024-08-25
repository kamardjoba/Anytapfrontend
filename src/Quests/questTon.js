import React from 'react';
import '../Css/Quests.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import axios from 'axios';

const TonTrans = ({TonTran_val, arrows, telegramId}) => {
    const [tonConnectUI] = useTonConnectUI();

    const GoTon = async () => {
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
            try {
                await axios.post('https://anypatbackend-production.up.railway.app/make-ton-transaction', { telegramId });
                console.log('5000 монет добавлено пользователю');
            } catch (error) {
                console.error('Ошибка при добавлении монет:', error);
            }
            alert('Transaction sent successfully!');
            localStorage.setItem('TonTran_val', 'true');
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
