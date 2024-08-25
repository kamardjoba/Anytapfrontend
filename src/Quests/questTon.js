import React, { useEffect } from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import axios from 'axios';

const TonTrans = ({ TonTran_val, arrows, telegramId }) => {
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
                // Обновляем значение TonTran_val в базе данных и локальном хранилище
                await axios.post('https://anypatbackend-production.up.railway.app/make-ton-transaction', { telegramId });
                console.log('5000 монет добавлено пользователю');
                localStorage.setItem('TonTran_val', 'true'); // Устанавливаем в локальном хранилище
            } catch (error) {
                console.error('Ошибка при добавлении монет:', error);
            }
            alert('Transaction sent successfully!');
        } catch (error) {
            console.error('Transaction failed:', error);
            alert('Transaction failed: ' + error.message);
        }
    };

    useEffect(() => {
        const syncTonTranVal = async () => {
            try {
                const response = await axios.get(`https://anypatbackend-production.up.railway.app/user-info?telegramId=${telegramId}`);
                if (response.data.success) {
                    const dbTonTranVal = response.data.TonTran_val;
                    if (dbTonTranVal === false) {
                        localStorage.setItem('TonTran_val', 'false'); // Синхронизируем с локальным хранилищем
                    }
                }
            } catch (error) {
                console.error('Ошибка при синхронизации TonTran_val:', error);
            }
        };

        const intervalId = setInterval(syncTonTranVal, 60000); // проверяем каждую минуту

        return () => clearInterval(intervalId); // Очистка интервала при размонтировании компонента
    }, [telegramId]);

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
