import React, { useState, useEffect } from 'react';
import '../Css/Friends.css';
import copy from '../IMG/copy.svg';
import small_diam from "../IMG/small_diam.png";

function Friends({ userPhoto, referralLink, invite, MintStart }) {
    const [referrals] = useState([]);

    const updateCoins = async (telegramId, newCoins) => {
        try {
            const response = await fetch('https://your-api-url/update-coins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ telegramId, coins: newCoins }),
            });

            const data = await response.json();
            if (data.success) {
                console.log('Монеты успешно обновлены');
            } else {
                console.error('Ошибка при обновлении монет:', data.message);
            }
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    useEffect(() => {
        const telegramId = window.Telegram.WebApp.initDataUnsafe?.user?.id;
        const initialCoins = 500; // Замените на фактическое начальное количество монет

        if (telegramId) {
            const intervalId = setInterval(() => {
                // Получение актуального количества монет пользователя
                const newCoins = initialCoins; // Здесь можно использовать реальное количество монет пользователя

                // Отправка данных на сервер
                updateCoins(telegramId, newCoins);
            }, 60000); // 60000 миллисекунд = 1 минута

            // Очистка интервала при размонтировании компонента
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

            <div className='friendsUsers'>
                <ul className='whiteContainerContent leaderboardScroll'>
                    {referrals.map((referral, index) => (
                        <li className='leaderboardItem' key={index}>
                            <div className='leaderboardItemLeft'>
                                <div className='leaderboardAvatar'>
                                    <img
                                        src={referral.photoUrl ? referral.photoUrl : userPhoto}
                                        alt="referral avatar"
                                        className='leaderboardAvatarImg'
                                    />
                                </div>

                                <div>
                                    <p className='leaderboardTitle'>{referral.nickname || 'no_name'}</p>
                                    <p className='leaderboardSubtitle'>
                                        {referral.coins !== undefined ? referral.coins.toLocaleString() : 'N/A'}
                                        <img src={small_diam} alt="" />
                                    </p>
                                </div>
                            </div>
                            <div className='leaderboardItemRight'>
                                <p>
                                    {referral.coins !== undefined ? referral.coins : 'N/A'}
                                    <img src={small_diam} alt="" />
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Friends;
