import React, { useEffect, useState } from 'react';
import '../Css/App.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from '../Loading/Loading.js';
import home from '../IMG/footerLogo/HM.png';
import leaderboard from '../IMG/footerLogo/LB.png';
import quests from '../IMG/footerLogo/QE.png';
import friends from '../IMG/footerLogo/FR.png';
import HomePage from "./HomePage";
import Leaderboard from "./Leaderboard";
import NoFriends from "./NoFriends";
import Friends from "./Friends";
import Quests from "./Quests";
import nophoto from '../IMG/noprofilephoto.png';
import avatar from "../IMG/avatar.png";

import X from'../IMG/x_chan.svg';
import arrows from'../IMG/arrows.svg';
import invite from'../IMG/invite.svg';
import MintStart from'../IMG/mint.svg';
import wallet from'../IMG/wallet.svg';
import inst from'../IMG/inst.svg';
import telegram from'../IMG/telegram.svg';
import copy from '../IMG/copy.svg';
import Ad from '../IMG/Ad.svg'

function App() {

    const [VisiblaBasedTask, setVisiblaBasedTask] = useState(true);
    const [VisiblaWeekTask, setVisiblaWeekTask] = useState(true);
    const [VisiblaComplatedTask, setVisiblaComplatedTask] = useState(false);

    const [TgChanel_val, setTgChanel_val] = useState(localStorage.getItem('TgChanel_val') === 'true');
    const [TgOcties_val, setTgOcties_val] = useState(localStorage.getItem('TgOcties_val') === 'true');
    const [TgFox_val, setTgFox_val] = useState(localStorage.getItem('TgFox_val') === 'true');
    const [X_val, setXVal] = useState(localStorage.getItem('X_val') === 'true');
    const [Inst_val, setInstVal] = useState(localStorage.getItem('Inst_val') === 'true');
    const [Bot_val, setBotVal] = useState(localStorage.getItem('Bot_val') === 'true');
    const [BotBourekas_val, setBotBourekas_val] = useState(localStorage.getItem('BotBourekas_val') === 'true');
    const [StartNft_val, setStartNftVal] = useState(localStorage.getItem('StartNft_val') === 'true');
    const [WeeklyNft_val, setWeeklyNftVal] = useState(localStorage.getItem('WeeklyNft_val') === 'true');
    const [TonTran_val, setTonTranVal] = useState(localStorage.getItem('TonTran_val') === 'true');
    const [Frends_val, setFrendsVal] = useState(localStorage.getItem('Frends_val') === 'true');
    const [AppCenter_val, setAppCenter_val] = useState(localStorage.getItem('AppCenter_val') === 'true');
    const [AppCenterChanel_val, setAppCenterChanel_val] = useState(localStorage.getItem('AppCenterChanel_val') === 'true');
    const [MushroomQuest_val, setMushroomQuest_val] = useState(localStorage.getItem('MushroomQuest_val') === 'true');
    const [PixelQuest_val, setPixelQuest_val] = useState(localStorage.getItem('PixelQuest_val') === 'true');
    const [Gas_val, setGas_val] = useState(localStorage.getItem('Gas_val') === 'true');

    const navigate = useNavigate();
    const location = useLocation();
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        coins: 0,
        photoUrl: ''
    });
    const [activeItem, setActiveItem] = useState(null);

    const [showLoading, setShowLoading] = useState(true);
    const [isLoading, setLoading] = useState(true);

    const [telegramId1, setTelegramId1] = useState(null);

    useEffect(() => {
        // Извлекаем данные Telegram при запуске приложения
        const initDataUnsafe = window.Telegram?.WebApp?.initDataUnsafe;
        if (initDataUnsafe && initDataUnsafe.user) {
            const extractedTelegramId1 = initDataUnsafe.user.id;
            console.log(`Telegram ID: ${extractedTelegramId1}`);
            
            // Сохраняем telegramId в состояние компонента
            setTelegramId1(extractedTelegramId1);

            // Можно сохранить telegramId в localStorage для дальнейшего использования
            localStorage.setItem('telegramId1', extractedTelegramId1);
        } else {
            console.error('Telegram ID не найден');
        }
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            setTgChanel_val(localStorage.getItem('TgChanel_val') === 'true');
            setTgOcties_val(localStorage.getItem('TgOcties_val') === 'true');
            setXVal(localStorage.getItem('X_val') === 'true');
            setInstVal(localStorage.getItem('Inst_val') === 'true');
            setBotVal(localStorage.getItem('Bot_val') === 'true');
            setStartNftVal(localStorage.getItem('StartNft_val') === 'true');
            setWeeklyNftVal(localStorage.getItem('WeeklyNft_val') === 'true');
            setTonTranVal(localStorage.getItem('TonTran_val') === 'true');
            setFrendsVal(localStorage.getItem('Frends_val') === 'true');
            setBotBourekas_val(localStorage.getItem('BotBourekas_val') === 'true');
            setTgFox_val(localStorage.getItem('TgFox_val') === 'true');
            setAppCenter_val(localStorage.getItem('AppCenter_val') === 'true');
            setAppCenterChanel_val(localStorage.getItem('AppCenterChanel_val') === 'true');
            setMushroomQuest_val(localStorage.getItem('MushroomQuest_val') === 'true');
            setPixelQuest_val(localStorage.getItem('PixelQuest_val') === 'true');
            setGas_val(localStorage.getItem('Gas_val') === 'true');
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        if (TgChanel_val ||
            TgOcties_val || 
            X_val ||
            StartNft_val || 
            Frends_val ||
            Bot_val ||
            BotBourekas_val ||
            WeeklyNft_val || 
            TonTran_val || 
            TgFox_val || 
            AppCenter_val || 
            AppCenterChanel_val || 
            MushroomQuest_val || 
            PixelQuest_val || 
            Gas_val || 
            Inst_val) 
            {setVisiblaComplatedTask(true);}}, 
            [TgChanel_val, 
            TgOcties_val, 
            X_val, 
            StartNft_val, 
            Frends_val, 
            Bot_val,
            BotBourekas_val,
            TonTran_val, 
            TgFox_val, 
            WeeklyNft_val,
            AppCenter_val,
            AppCenterChanel_val,
            MushroomQuest_val,
            PixelQuest_val,
            Gas_val,
            Inst_val]);

    useEffect(() => {
        if (TgChanel_val && TgOcties_val && X_val && StartNft_val && Frends_val && Inst_val && Bot_val  && BotBourekas_val && TgFox_val && AppCenter_val && AppCenterChanel_val && MushroomQuest_val && PixelQuest_val && Gas_val) {
            setVisiblaBasedTask(true);//old False
        }
    }, [TgChanel_val, TgOcties_val, X_val, StartNft_val, Frends_val, Inst_val, Bot_val, BotBourekas_val, TgFox_val, AppCenter_val, AppCenterChanel_val, MushroomQuest_val, PixelQuest_val, Gas_val]);

    useEffect(() => {
        if (WeeklyNft_val && TonTran_val) {
            setVisiblaWeekTask(false);
        }
    }, [WeeklyNft_val, TonTran_val]);

    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => setShowLoading(false), 500); // Задержка на время затухания
            return () => clearTimeout(timer);
        } else {
            setShowLoading(true); // Показываем загрузку сразу при включении
        }
    }, [isLoading]);

    useEffect(() => {

        const preloadImage = (src) => {
            const img = new Image();
            img.src = src;
        };
        preloadImage(X); 
        preloadImage(arrows); 
        preloadImage(invite);
        preloadImage(MintStart);
        preloadImage(wallet);
        preloadImage(inst);
        preloadImage(telegram);
        preloadImage(copy);
        preloadImage(Ad);

        const urlParams = new URLSearchParams(window.location.search);
        let telegramId = urlParams.get('telegramId');

        // Check if telegramId is present in URL, otherwise check localStorage
        if (!telegramId) {
            telegramId = localStorage.getItem('telegramId');
        } else {
            localStorage.setItem('telegramId', telegramId);
        }

        if (telegramId1) {
            console.log(`Запрос на сервер с telegramId1: ${telegramId1}`);
            fetch(`https://anypatbackend-production.up.railway.app/user-info?telegramId=${telegramId1}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log('Данные успешно получены:', data);
                        setUserInfo({
                            firstName: data.firstName,
                            coins: data.coins,
                            photoUrl: data.photoUrl
                        });
                        setLoading(false);
                    } else {
                        console.error('Ошибка при получении данных о пользователе:', data.message);
                        
                    }
                })
                .catch(error => {
                    console.error('Ошибка при запросе:', error);
                    
                });
        } else {
            console.error('telegramId не найден');
            
        }

        if (location.pathname === "/") {
            navigate("/home");
            setActiveItem(0);
        }
    }, [navigate, location,telegramId1]);

    const handleNavigation = (path, index) => {
        navigate(path);
        setActiveItem(index);
    };

    useEffect(() => {
        const telegramId = localStorage.getItem('telegramId');
        
        if (telegramId) {
            // Запрашиваем данные пользователя с сервера
            axios.get(`https://anypatbackend-production.up.railway.app/user-info?telegramId=${telegramId}`)
                .then(response => {
                    if (response.data.success) {
                        const { StartNft_val } = response.data;
                        if (StartNft_val) {
                            // Если StartNft_val = true в базе данных, обновляем на фронте
                            setStartNftVal(true);
                            localStorage.setItem('StartNft_val', 'true');
                        }
                    }
                    if (response.data.success) {
                        setBotVal(response.data.isSubscribedToBot); // Update the Bot_val state based on response
                        localStorage.setItem('Bot_val', response.data.isSubscribedToBot ? 'true' : 'false'); // 
                    }
                    if (response.data.success) {
                        setBotVal(response.data.isSubscribedToMushroom); // Update the Bot_val state based on response
                        localStorage.setItem('Bot_val', response.data.isSubscribedToMushroom ? 'true' : 'false'); // 
                    }
                     else {
                        console.error('Ошибка при получении данных пользователя:', response.data.message);
                    }
                })
                .catch(error => {
                    console.error('Ошибка при запросе данных:', error);
                });
        } else {
            console.error('Telegram ID не найден');
        }
    }, []);

    useEffect(() => {
        const telegramId = localStorage.getItem('telegramId');
        const StartNft_val = localStorage.getItem('StartNft_val') === 'true';

        if (StartNft_val) {
            axios.post('https://anypatbackend-production.up.railway.app/update-startnft-val', {
                telegramId,
                StartNft_val: true
            }).then(response => {
                console.log('StartNft_val synchronized with database.');
            }).catch(error => {
                console.error('Error synchronizing StartNft_val:', error);
            });
        }
    }, []);


    useEffect(() => {
        const telegramId = localStorage.getItem('telegramId');
        const Frends_val = localStorage.getItem('Frends_val') === 'true';
    
        if (Frends_val) {
            axios.post('https://anypatbackend-production.up.railway.app/update-frends-val', {
                telegramId,
                Frends_val: true
            }).then(response => {
                console.log('Frends_val synchronized with database.');
            }).catch(error => {
                console.error('Error synchronizing Frends_val:', error);
            });
        }
    }, []);
  

    const [referralLink, setReferralLink] = useState('');
    const [userPhoto, setUserPhoto] = useState(avatar); 
    const [referrals, setReferrals] = useState([]);
    const [referralsCount, setReferralsCount] = useState(0);
    
    useEffect(() => {
        const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
        const telegramId = initDataUnsafe?.user?.id;
    
        if (telegramId) {
            const fetchReferrals = async () => {
                try {
                    const response = await fetch(`https://anypatbackend-production.up.railway.app/user-referrals?telegramId=${telegramId}`);
                    const data = await response.json();
    
                    if (data.success) {
                        setReferrals(data.referrals);
                        setReferralsCount(data.referrals.length); // Устанавливаем количество рефералов
                        setReferralLink(`https://t.me/AnyTap_bot?start=${data.referralCode}`);
                        if (data.photoUrl) {
                            setUserPhoto(data.photoUrl); 
                        }
                    } else {
                        console.error(data.message); 
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

    return (
        <div className="App">
            {showLoading && (
                <LoadingScreen wrapperClass={'loading-wrapper-app '} loadingScreenClass={`loading-screen ${isLoading ? '' : 'hiddenMain'}`} />
            )}
            <div className={`appWrapper ${isLoading ? 'hidden' : ''}`}>
                <header className='headerWrapper'>
                    <p className='userName'>{userInfo.firstName}</p>
                    <div className='userAvatarWrapper'>
                        <img className='userAvatarImg' src={userInfo.photoUrl || nophoto} alt="userAvatar" />
                    </div>
                </header>

                <div className='centeredBlock'>
                    <Routes>
                        <Route path="/home" element={<HomePage coins={userInfo.coins} />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/nofriends" element={<NoFriends invite={invite} referralLink={referralLink} MintStart={MintStart}/>} />
                        <Route path="/friends" element={<Friends referrals={referrals} referralLink={referralLink} userPhoto={userPhoto} invite={invite} MintStart={MintStart} copy={copy}/>} />
                        <Route path="/quests" element={<Quests 
                            X={X} arrows={arrows} invite={invite} userInfo={userInfo} MintStart={MintStart} wallet={wallet} inst={inst} Ad={Ad} telegram={telegram}
                            TgChanel_val={TgChanel_val}  TgOcties_val={TgOcties_val}  X_val={X_val}  StartNft_val={StartNft_val}  Frends_val={Frends_val}  WeeklyNft_val={WeeklyNft_val} TonTran_val={TonTran_val} Inst_val={Inst_val} Bot_val={Bot_val}
                            VisiblaBasedTask={VisiblaBasedTask} VisiblaWeekTask={VisiblaWeekTask} referralsCount={referralsCount} MushroomQuest_val={MushroomQuest_val} VisiblaComplatedTask={VisiblaComplatedTask} BotBourekas_val={BotBourekas_val} TgFox_val={TgFox_val} AppCenter_val={AppCenter_val} AppCenterChanel_val={AppCenterChanel_val}
                            PixelQuest_val={PixelQuest_val} Gas_val={Gas_val}/>}/>
                    </Routes>
                </div>

                <footer className='footer'>
                    <ul className='footerItems'>
                        <li className={`footerItem ${activeItem === 0 ? 'active' : ''}`} onClick={() => handleNavigation('/home', 0)}>
                            <div className='footerItemImgWrapper'>
                                <img src={home} alt="home" className='footerItemImg' />
                            </div>
                            <p className='footerItemLabel'>Home</p>
                        </li>
                        <li className={`footerItem ${activeItem === 1 ? 'active' : ''}`} onClick={() => handleNavigation('/leaderboard', 1)}>
                            <div className='footerItemImgWrapper'>
                                <img src={leaderboard} alt="leaderboard" className='footerItemImg' />
                            </div>
                            <p className='footerItemLabel'>Leaderboard</p>
                        </li>
                        <li className={`footerItem ${activeItem === 2 ? 'active' : ''}`} onClick={() => handleNavigation('/quests', 2)}>
                            <div className='footerItemImgWrapper'>
                                <img src={quests} alt="quests" className='footerItemImg' />
                            </div>
                            <p className='footerItemLabel'>Quests</p>
                        </li>
                        <li className={`footerItem ${activeItem === 3 ? 'active' : ''}`}
                            onClick={() => handleNavigation(referrals.length > 0 ? '/friends' : '/nofriends', 3)}>
                            <div className='footerItemImgWrapper'>
                                <img src={friends} alt="friends" className='footerItemImg' />
                            </div>
                            <p className='footerItemLabel'>Friends</p>
                        </li>
                    </ul>
                </footer>
            </div>
        </div>
    );
}

export default App;