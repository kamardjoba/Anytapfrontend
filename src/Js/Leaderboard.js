import React, { useEffect, useState, useMemo } from 'react';
import '../Css/Leaderboard.css';
import small_diam from '../IMG/small_diam.png';
import nophoto from '../IMG/noprofilephoto.png';
import LoadingScreen from '../Loading/Loading.js';

function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [userRank, setUserRank] = useState(null);
    const [userCoins, setUserCoins] = useState(null);
    const [isLoadingLider, setisLoadingLider] = useState(false);
    const [totalUsers, setTotalUsers] = useState(null);



    const [isLoadingLiderBlue, setisLoadingLiderBlue] = useState(false);
    const [isLoadingLiderBlueSupport, setisLoadingLiderBlueSupport] = useState(false);
    

    useEffect(() => {
        if (isLoadingLiderBlueSupport) {
            const timerBlue = setTimeout(() =>  setisLoadingLiderBlue(true), 500); // Задержка на время затухания
            return () => clearTimeout(timerBlue);
        } else {
            setisLoadingLiderBlue(false); // Показываем загрузку сразу при включении
        }
    }, [isLoadingLiderBlueSupport]);







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
                    setisLoadingLider(true);
                    
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
                   
            {!targetTelegramIds.includes(window.Telegram.WebApp.initDataUnsafe?.user?.id) && (
                <>
                    <div className='blueContainer'>
                        {isLoadingLiderBlue  ? (  
                            <div className='blueContainerItem'>
                                <p className='blueContainerItemTitle' >#{userRank || 'Loading...'}</p>
                                <p className='blueContainerItemSubtitle'>Your rank</p>
                            </div> 
                        ) : ( 
                            <div className={'blueContainerItem'}>
                                <p className='blueContainerItemTitle' id='LodBlue'>#{userRank || 'Loading...'}</p>
                                <p className='blueContainerItemSubtitle' id='LodBlue'>Your rank</p>
                                <div class="loaderBlue"></div>
                            </div>)}

                        {isLoadingLiderBlue  ? (
                            <div className='blueContainerItem'>
                                <p className='blueContainerItemTitle'>{userCoins ? userCoins.toLocaleString() : 'Loading...'}</p>
                                <p className='blueContainerItemSubtitle'>Your points</p>
                            </div> 
                        ) : ( 
                            <div className='blueContainerItem'>
                                <p className='blueContainerItemTitle' id='LodBlue'>#{userRank || 'Loading...'}</p>
                                <p className='blueContainerItemSubtitle' id='LodBlue'>Your rank</p>
                                <div class="loaderBlue"></div>
                            </div>)}
                    </div>
                </>
                )}
                
                {targetTelegramIds.includes(window.Telegram.WebApp.initDataUnsafe?.user?.id) && (
                <>  
                    <div className='blueContainerL'>
                        {isLoadingLiderBlue  ? (  
                            <div className='blueContainerItem'>
                                <p className='blueContainerItemTitle' >#{userRank || 'Loading...'}</p>
                                <p className='blueContainerItemSubtitle'>Your rank</p>
                            </div>
                        ) : ( 
                            <div className='blueContainerItem'>
                                <div class="loaderBlue"></div>
                            </div>)}

                        {isLoadingLiderBlue  ? ( 
                            <div className='blueContainerItem'>
                                <p className='blueContainerItemTitle'>{userCoins ? userCoins.toLocaleString() : 'Loading...'}</p>
                                <p className='blueContainerItemSubtitle'>Your points</p>
                            </div>
                        ) : ( 
                            <div className='blueContainerItem'>
                                <div class="loaderBlue"></div>
                            </div>)}

                        {isLoadingLiderBlue  &&
                            <div className='blueContainerItem'>
                                <p className='blueContainerItemTitle'>{totalUsers ? totalUsers.toLocaleString() : 'Loading...'}</p>
                                <p className='blueContainerItemSubtitle'>Total users</p>
                            </div>}
                        
                            {!isLoadingLiderBlue  && <div className={`blueContainerItem ${isLoadingLiderBlueSupport ? 'hiddenMain' : ''}`}>
                                <div className="loaderBlue"></div>
                            </div>}
                    </div>
                </>)}

            
            {isLoadingLider ? (
                <div className='whiteContainerLeaderboard'>
                    <ul className='whiteContainerContent leaderboardScroll'>
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
                    </ul>
                </div>
            ) : (
                <div class="outer-container">
                    <div className="white_Container_Leaderboard_Load">
                        <LoadingScreen wrapperClass="loading-wrapper-leaderboard" loadingScreenClass={'loading-screen'} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Leaderboard;
