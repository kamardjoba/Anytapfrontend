import React from 'react';
import '../Css/Quests.css';
import arrows from '../IMG/arrows.svg';
import { useTonConnectUI, TonConnectUIProvider } from '@tonconnect/ui-react';

const TonTrans = ({ TonTran_val }) => {
    const { sendTransaction } = useTonConnectUI();

    console.log('sendTransaction:', sendTransaction);

    const GoTon = async () => {
        try {
            if (!sendTransaction) {
                throw new Error("sendTransaction is not available");
            }

            const transaction = {
                validUntil: Date.now() + 5 * 60 * 1000, // Время, до которого транзакция действительна (5 минут с момента создания)
                messages: [
                    {
                        address: 'UQC-ZK_dPpZ15VaL-kwyXT1jTCYDTQricz8RxvXT0VmdbRYG', // Адрес получателя
                        amount: '10000', // 0.01 TON в нанотонах (1 TON = 1e9 нанотонов)
                    },
                ],
            };

            await sendTransaction(transaction);
            alert('Transaction sent successfully!');
        } catch (error) {
            console.error('Transaction failed', error);
            alert('Transaction failed: ' + error.message);
        }
    };
    const manifestUrl = 'https://gleaming-semifreddo-896ccf.netlify.app/tonconnect-manifest.json';
    return (
        <TonConnectUIProvider manifestUrl={manifestUrl}>
        <div className='questItem'>
            <div className='questItemLeft'>
                <div className='questIcon'>
                    <img src={arrows} alt=""/>
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
