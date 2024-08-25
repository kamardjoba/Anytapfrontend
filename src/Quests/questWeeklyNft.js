import React from 'react';
import '../Css/Quests.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';

const WeeklyNft = ({GoWeekNft, WeeklyNft_val, setWeeklyNft_val, arrows}) => {
    const [tonConnectUI] = useTonConnectUI();

    GoWeekNft = async () => {
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
            setWeeklyNft_val(true);  
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
                <img src={arrows} alt=""/>
            </div>
            <div className='questItemLeftContent'>
                <p className='questTitle'>Mint Weekly NFT</p>
                <p className='questSubtitle'>+2500 Points and Weekly NFT</p>
            </div>
        </div>
        <div className='questItemRight'>
            {!WeeklyNft_val &&(<button className='questBtn' onClick={GoWeekNft}>Mint</button>)}
        </div>
    </div>
    </TonConnectUIProvider>
  );
};

export default WeeklyNft;