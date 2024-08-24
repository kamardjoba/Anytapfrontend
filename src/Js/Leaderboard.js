import React, { useEffect, useState } from 'react';
import '../Css/Leaderboard.css';
import small_diam from '../IMG/small_diam.png';
import nophoto from '../IMG/noprofilephoto.png';

function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [userRank, setUserRank] = useState(null);
    const [userCoins, setUserCoins] = useState(null);

    useEffect(() => {
        const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
        const telegramId = initDataUnsafe?.user?.id;

        if (telegramId) {
            const fetchLeaderboard = async () => {
                try {
                    const response = await fetch('https://anypatbackend-production.up.railway.app/leaderboard');
                    const data = await response.json();
                    setLeaderboardData(data);
                    
                } catch (error) {
                    console.error('Ошибка при загрузке данных лидерборда:', error);
                   
                }
            };

            console.log(`Используется telegramId: ${telegramId}`);
            const fetchUserRank = async () => {
                try {
                    const response = await fetch(`https://anypatbackend-production.up.railway.app/user-rank?telegramId=${telegramId}`);
                    const data = await response.json();

                    if (data.success) {
                        setUserRank(data.rank);
                        setUserCoins(data.user.coins);
                    } else {
                        console.error(data.message);
                    }
                } catch (error) {
                    console.error('Ошибка при загрузке ранга пользователя:', error);
                }
            };

            fetchUserRank();
            fetchLeaderboard();
        } else {
            console.error('Telegram ID не найден');
            
        }
    }, []);

    return (
        <div className='leaderboardContainer'>
            <div className='blueContainer'>
                <div className='blueContainerItem'>
                    <p className='blueContainerItemTitle'>#{userRank || 'Loading...'}</p> 
                    <p className='blueContainerItemSubtitle'>Your rank</p>
                </div>
                <div className='blueContainerItem'>
                    <p className='blueContainerItemTitle'>{userCoins ? userCoins.toLocaleString() : 'Loading...'}</p>
                    <p className='blueContainerItemSubtitle'>Your points</p>
                </div>
            </div>
            <div className='whiteContainerLeaderboard'>
                <ul className='whiteContainerContent leaderboardScroll'>
                    {leaderboardData.map((user, index) => (
                        <li className='leaderboardItem' key={user.telegramId}>
                            <div className='leaderboardItemLeft'>
                                <div className='leaderboardAvatar'>
                                    <img src={user.photoUrl || nophoto} alt="" className='leaderboardAvatarImg' />
                                </div>
                                <div>
                                    <p className='leaderboardTitle'>{user.nickname || 'no_name'}</p>
                                    <p className='leaderboardSubtitle'>{user.coins.toLocaleString()} <img src={small_diam} alt=""/></p>
                                </div>
                            </div>
                            <div className='leaderboardItemRight'>
                                {index + 1}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Leaderboard;
