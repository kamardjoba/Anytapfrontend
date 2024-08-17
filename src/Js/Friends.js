import React, { useEffect, useState } from 'react';
import '../Css/Friends.css';
import inv_fr1 from '../IMG/inv_fr1.svg';
import inv_fr2 from '../IMG/inv_fr2.svg';
import copy from '../IMG/copy.svg';
import avatar from "../IMG/avatar.png";
import small_diam from "../IMG/small_diam.png";

function Friends() {
    const [referrals, setReferrals] = useState([]);
    const [referralCode, setReferralCode] = useState('');

    useEffect(() => {
        // Получаем Telegram ID через initDataUnsafe
        const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
        const telegramId = initDataUnsafe?.user?.id;

        if (telegramId) {
            const fetchReferrals = async () => {
                try {
                    const response = await fetch(`https://anypatbackend-production.up.railway.app/user-referrals?telegramId=${telegramId}`);
                    const data = await response.json();

                    if (data.success) {
                        setReferrals(data.referrals);
                        setReferralCode(data.referralCode); // Устанавливаем реферальный код
                    } else {
                        console.error(data.message); // Лог ошибки с сервера
                    }
                } catch (error) {
                    console.error('Ошибка при загрузке рефералов:', error);
                }
            };

            fetchReferrals();
        } else {
            console.error('Telegram ID не найден');
        }
    }, []);

    const handleCopyClick = () => {
        if (referralCode) {
            navigator.clipboard.writeText(referralCode)
                .then(() => {
                    console.log('Реферальный код скопирован:', referralCode);
                    alert('Реферальный код скопирован в буфер обмена!');
                })
                .catch(err => {
                    console.error('Ошибка при копировании реферального кода:', err);
                    alert('Не удалось скопировать реферальный код.');
                });
        }
    };

    return (
        <div className='friendsPage'>
            <div className='whiteContainerQuest friendsItems'>
                <div className='friendsItem'>
                    <img src={inv_fr1} alt=""/>
                    <p className='friendsItemText'>Get 10% of your friends’ points!</p>
                </div>
                <div className='friendsItem'>
                    <img src={inv_fr2} alt=""/>
                    <p className='friendsItemText'>Invite 10 friends and receive a unique NFT!</p>
                </div>
                <div className='linkCopyWrapper'>
                    <button className='linkBtn'>Link</button>
                    <button className='copyBtn' onClick={handleCopyClick}>
                        <img src={copy} alt=""/>
                    </button>
                </div>
            </div>

            <div className='friendsUsers'>
                <ul className='whiteContainerContent leaderboardScroll'>
                    {referrals.map((referral, index) => (
                        <li className='leaderboardItem' key={index}>
                            <div className='leaderboardItemLeft'>
                                <div className='leaderboardAvatar'>
                                    <img src={avatar} alt="" className='leaderboardAvatarImg'/>
                                </div>
                                <div>
                                    <p className='leaderboardTitle'>{referral.nickname || 'no_name'}</p>
                                    <p className='leaderboardSubtitle'>{referral.earnedCoins.toLocaleString()} <img src={small_diam} alt=""/></p>
                                </div>
                            </div>
                            <div className='leaderboardItemRight'>
                                {referral.earnedCoins}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Friends;
