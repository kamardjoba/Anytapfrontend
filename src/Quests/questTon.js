import React, {useEffect}from 'react';
import '../Css/Quests.css';
import arrows from'../IMG/arrows.svg';
import { TonConnectUIProvider} from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';



const TonTrans = ({GoTon, TonTran_val}) => {
    const [tonConnectUI] = useTonConnectUI();
    useEffect(() => {
        if (window.TON_CONNECT_UI) {
            const tonConnectUI = new window.TON_CONNECT_UI.TonConnectUI({
                manifestUrl: 'https://resilient-madeleine-9ff7c2.netlify.app/tonconnect-manifest.json',
                buttonRootId: 'TonMainConBtn'
            });
    
            tonConnectUI.onStatusChange((walletInfo) => {
                if (walletInfo) {
                    console.log('Кошелек подключен!', walletInfo);
                } else {
                    console.log('Кошелек отключен!');
                }
            });
        }
    }, []);
     GoTon = async () => {
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
        } catch (error) {
            console.error('Transaction failed:', error);
            alert('Transaction failed: ' + error.message);
        }
    };
  return (
    <TonConnectUIProvider manifestUrl="https://resilient-madeleine-9ff7c2.netlify.app/tonconnect-manifest.json">

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