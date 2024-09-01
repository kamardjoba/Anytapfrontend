import React, { useState, useEffect } from 'react';
import '../Css/Friends.css';
import small_diam from "../IMG/small_diam.png";
import LoadingScreen from '../Loading/Loading.js';

function Friends({ userPhoto, referralLink, invite, MintStart, copy }) {
    const [referrals, setReferrals] = useState([]);
    const [isFrendsZapros, setisFrendsZapros] = useState(false);
    const [isFrendsSupport, setisFrendsSupport] = useState(false);

    useEffect(() => {
        if (isFrendsSupport) {
            const timerBlue = setTimeout(() =>  setisFrendsZapros(true), 350); 
            return () => clearTimeout(timerBlue);
        } else {
            setisFrendsZapros(false); 
        }
    }, [isFrendsSupport]);

    useEffect(() => {
        const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
        const telegramId = initDataUnsafe?.user?.id;
    
        if (telegramId) {
            const fetchReferrals = async () => {
                try {
                    const response = await fetch(`https://anypatbackend-production.up.railway.app/user-referrals?telegramId=${telegramId}`);
                    const data = await response.json();
    
                    if (data.success) {
                        const updatedReferrals = data.referrals.map(referral => {
                            const dynamicEarnedCoins = Math.floor(referral.coins * 0.1); // Вычисляем 10% от текущих монет реферала
                            return {
                                ...referral,
                                earnedCoins: dynamicEarnedCoins
                            };
                        });
                        setReferrals(updatedReferrals);
                        setisFrendsSupport(true);
                    } else {
                        console.error(data.message);
                    }
                } catch (error) {
                    console.error('Ошибка при загрузке рефералов:', error);
                }
            };
    
            fetchReferrals();
    
            const intervalId = setInterval(fetchReferrals, 10000);
    
            return () => clearInterval(intervalId);
        } else {
            console.error('Telegram ID не найден');
        }
    }, []);

    const handleCopyClick = () => {
        if (referralLink) {
            navigator.clipboard.writeText(referralLink)
                .then(() => {
                    console.log('Реферальная ссылка скопирована:', referralLink);
                    alert('Реферальная ссылка скопирована в буфер обмена!');
                })
                .catch(err => {
                    console.error('Ошибка при копировании реферальной ссылки:', err);
                    alert('Не удалось скопировать реферальную ссылку.');
                });
        }
    };

    const handleShareLink = () => {
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}`;
        window.open(telegramUrl, '_blank');
        window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
    };

    return (
        <div className='friendsPage'>
            <div className='whiteContainerQuest friendsItems'>
                <div className='friendsItem'>
                    <img src={invite} alt="" />
                    <p className='friendsItemText'>Get 10% of your friends’ points!</p>
                </div>
                <div className='friendsItem'>
                    <img src={MintStart} alt="" />
                    <p className='friendsItemText'>Invite 10 friends and receive a unique NFT!</p>
                </div>
                <div className='linkCopyWrapper'>
                    <button className='linkBtn' onClick = {handleShareLink}>Link</button>
                    <button className='copyBtn' onClick={handleCopyClick}>
                        <img src={copy} alt="" />
                    </button>
                </div>
            </div>

            {isFrendsSupport && <div className='friendsUsers fadeIn' >
                <ul className='whiteContainerContent leaderboardScroll'>
                    {referrals.map((referral, index) => (
                        <li className='FriendItem' key={index}>
                            <div className='leaderboardItemLeft'>
                                <div className='leaderboardAvatar'>
                                    <img
                                        src={referral.photoUrl ? referral.photoUrl : userPhoto}
                                        alt="referral avatar"
                                        className='leaderboardAvatarImg'
                                    />
                                </div>

                                <div>
                                    <p className='leaderboardTitle'>
                                        {referral.nickname && !/^user_\d+$/.test(referral.nickname) ? referral.nickname : referral.firstName || 'no_name'}
                                    </p>

                                    <p className='leaderboardSubtitle'>
                                        {referral.coins !== undefined ? referral.coins.toLocaleString() : 'N/A'}
                                        <img src={small_diam} alt="" />
                                    </p>
                                </div>
                            </div>
                            <div className='leaderboardItemRight'>
                                <p>
                                    {referral.earnedCoins !== undefined ? referral.earnedCoins : 'N/A'}
                                    <img src={small_diam} alt="" />
                                </p>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>}

             {!isFrendsZapros &&<div class= {`outer-containerF ${isFrendsSupport ? 'hiddenFriend' : ''}`}>
                
                    <LoadingScreen wrapperClass="loading-wrapper-friends"  loadingScreenClass={'loading-screen'} />  
                
            </div>}
        </div>
    );
}

export default Friends;
