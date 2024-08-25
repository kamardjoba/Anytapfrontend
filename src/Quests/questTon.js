import React, { useEffect } from 'react';
import '../Css/Quests.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import axios from 'axios';

const TonTrans = ({ arrows, telegramId }) => {
    const [tonConnectUI] = useTonConnectUI();
    const [TonTran_val, setTonTranVal] = React.useState(false);

    // Функция для получения значения TonTran_val с сервера
    const fetchTonTranVal = async () => {
        try {
            const response = await axios.get('https://anypatbackend-production.up.railway.app/get-ton-tran-val', {
                params: { telegramId }
            });
            const { TonTran_val } = response.data;
            setTonTranVal(TonTran_val);
            localStorage.setItem('TonTran_val', TonTran_val.toString());
        } catch (error) {
            console.error('Ошибка при получении TonTran_val с сервера:', error);
        }
    };

    // Используем эффект для периодического получения значения с сервера
    useEffect(() => {
        fetchTonTranVal();
        const interval = setInterval(fetchTonTranVal, 60000); // Обновляем каждую минуту

        return () => clearInterval(interval);
    }, [telegramId]);

    const GoTon = async () => {
        const walletInfo = tonConnectUI.walletInfo;
        if (!walletInfo) {
            alert("First ‘Connect Wallet’ to you can call ‘Mint’ function");
            return;
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
                const response = await axios.post('https://anypatbackend-production.up.railway.app/make-ton-transaction', { telegramId });
                setTonTranVal(true); // Обновляем значение в состоянии
                localStorage.setItem('TonTran_val', 'true'); // Обновляем значение в localStorage
                console.log('5000 монет добавлено пользователю и TonTran_val обновлено в localStorage');
            } catch (error) {
                console.error('Ошибка при добавлении монет:', error);
            }
            alert('Transaction sent successfully!');
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
