import React, { useEffect, useState, useMemo } from 'react';
import '../Css/Leaderboard.css';
import small_diam from '../IMG/small_diam.png';
import nophoto from '../IMG/noprofilephoto.png';
import LoadingScreen from '../Loading/Loading.js';

function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [userRank, setUserRank] = useState(null);
    const [userCoins, setUserCoins] = useState(null);
    const [totalUsers, setTotalUsers] = useState(null);

    const [isLoadingLider, setisLoadingLider] = useState(false);
    const [isLoadingLiderSupport, setisLoadingLiderSupport] = useState(false);

    const [isLoadingLiderBlue, setisLoadingLiderBlue] = useState(false);
    const [isLoadingLiderBlueSupport, setisLoadingLiderBlueSupport] = useState(false);
    

    useEffect(() => {
        if (isLoadingLiderBlueSupport) {
            const timerBlue = setTimeout(() =>  setisLoadingLiderBlue(true), 350); 
            return () => clearTimeout(timerBlue);
        } else {
            setisLoadingLiderBlue(false); 
        }
    }, [isLoadingLiderBlueSupport]);

    useEffect(() => {
        if (isLoadingLiderSupport) {
            const timerBlue = setTimeout(() =>  setisLoadingLider(true), 350); 
            return () => clearTimeout(timerBlue);
        } else {
            setisLoadingLider(false); 
        }
    }, [isLoadingLiderSupport]);

    const targetTelegramIds = useMemo(() => [561009411, 6000155749, 727060329], []); 

    useEffect(() => {
        const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
        const telegramId = initDataUnsafe?.user?.id;

        if (telegramId) {
            const fetchLeaderboard = async () => {
                try {
                    const response = await fetch('https://anypatbackend-production.up.railway.app/leaderboard');
                    const data = await response.json();
                    setLeaderboardData(data);
                    setisLoadingLiderSupport(true);
                    
                } catch (error) {
                    console.error('Ошибка при загрузке данных лидерборда:', error);
                }
            };

            const fetchUserRank = async () => {
                try {
                    const response = await fetch(`https://anypatbackend-production.up.railway.app/user-rank?telegramId=${telegramId}`);
                    const data = await response.json();
                   
                    if (data.success) {
                        setUserRank(data.rank);
                        setUserCoins(data.user.coins);
                        setisLoadingLiderBlueSupport(true);
                    } else {
                        console.error(data.message);
                    }
                } catch (error) {
                    console.error('Ошибка при загрузке ранга пользователя:', error);
                }
            };

            if (targetTelegramIds.includes(telegramId)) {
                const fetchTotalUsers = async () => {
                    try {
                        const response = await fetch('https://anypatbackend-production.up.railway.app/total-users');
                        const data = await response.json();
                        if (data.success) {
                            setTotalUsers(data.totalUsers);
                    
                        } else {
                            console.error(data.message);
                        }
                    } catch (error) {
                        console.error('Ошибка при подсчете общего числа пользователей:', error);
                    }
                };
                fetchTotalUsers();
            }

            fetchUserRank();
            fetchLeaderboard();
        } else {
            console.error('Telegram ID не найден');
        }
    }, [targetTelegramIds]);

    return (
        <div className='leaderboardContainer'>                     
            <div className='blueContainer'> 

                <div className='blueContainerItem'>
                    {isLoadingLiderBlueSupport && <p className='blueContainerItemTitle fadeIn' >#{userRank || 'Loading...'}</p>}
                    {isLoadingLiderBlueSupport && <p className='blueContainerItemSubtitle fadeIn'>Your rank</p>}
                    {!isLoadingLiderBlue && <div className={`suportLodd ${isLoadingLiderBlueSupport ? 'hiddenLider' : ''}`}>
                        <div class="loaderBlue"></div>
                    </div>} 
                </div>
                        
                <div className='blueContainerItem'>
                    {isLoadingLiderBlueSupport && <p className='blueContainerItemTitle fadeIn'>{userCoins ? userCoins.toLocaleString() : 'Loading...'}</p>}
                    {isLoadingLiderBlueSupport && <p className='blueContainerItemSubtitle fadeIn'>Your points</p>}
                    {!isLoadingLiderBlue && <div className={`suportLodd ${isLoadingLiderBlueSupport ? 'hiddenLider' : ''}`}>
                        <div class="loaderBlue"></div>
                    </div>}
                </div>

                {targetTelegramIds.includes(window.Telegram.WebApp.initDataUnsafe?.user?.id) && (
                    <div className={'blueContainerItem'}>
                        {isLoadingLiderBlueSupport && <p className='blueContainerItemTitle fadeIn'>{totalUsers ? totalUsers.toLocaleString() : 'Loading...'}</p>}
                        {isLoadingLiderBlueSupport && <p className='blueContainerItemSubtitle fadeIn'>Total users</p>}
                        {!isLoadingLiderBlue && <div className={`suportLodd ${isLoadingLiderBlueSupport ? 'hiddenLider' : ''}`}>
                            <div className='loaderBlue'></div>
                        </div>}
                    </div>
                )}
            </div>
                
            
           <div className='whiteContainerLeaderboard'>
           {isLoadingLiderSupport &&<ul className='whiteContainerContent leaderboardScroll fadeIn'>
                        {leaderboardData.map((user, index) => (
                            <li className='leaderboardItem' key={user.telegramId}>
                                <div className='leaderboardItemLeft'>
                                    <div className='leaderboardAvatar'>
                                        <img src={user.photoUrl || nophoto} alt="" className='leaderboardAvatarImg' />
                                    </div>
                                    <div>
                                        <p className='leaderboardTitle'>
                                            {user.nickname && !/^user_\d+$/.test(user.nickname) ? user.nickname : user.firstName || 'Anonymous'}
                                        </p>
                                        <p className='leaderboardSubtitle'>
                                            {user.coins.toLocaleString()} <img src={small_diam} alt="" />
                                        </p>
                                    </div>
                                </div>
                                <div className='leaderboardItemRight'>
                                    {index + 1}
                                </div>
                            </li>
                        ))}
                    </ul>}
                    {!isLoadingLider && <LoadingScreen wrapperClass="loading-wrapper-leaderboard" loadingScreenClass={`loading-screen ${isLoadingLiderSupport ? 'hiddenLider' : ''}`} />}
                </div>
      
        </div>
    );
}

export default Leaderboard;
