import React from 'react';
import '../Css/Quests.css';
import arrows from '../IMG/arrows.svg';
import { useTonConnectUI } from '@tonconnect/ui-react';

const TonTrans = ({ TonTran_val }) => {
    const tonConnectContext = useTonConnectUI();
    console.log('TonConnect Context:', tonConnectContext);

    const { sendTransaction } = tonConnectContext;

    const GoTon = async () => {
        try {
            if (!sendTransaction) {
                throw new Error("sendTransaction is not available");
            }

            const transaction = {
                validUntil: Date.now() + 5 * 60 * 1000,
                messages: [
                    {
                        address: 'EQD6p7QkZK1npse29QdZ5ehTo1o3nEXW9fb-5aHkKX5gTonConnectAddress',
                        amount: '10000', // 0.01 TON в нанотонах
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

    return (
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
    );
};

export default TonTrans;
