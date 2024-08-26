import React, { useEffect, useState } from 'react';
import '../Css/App.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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

function App() {

    const [VisiblaBasedTask, setVisiblaBasedTask] = useState(true);
    const [VisiblaWeekTask, setVisiblaWeekTask] = useState(false);
    const [VisiblaComplatedTask, setVisiblaComplatedTask] = useState(false);

    if (!localStorage.getItem('TgChanel_val')) {localStorage.setItem('TgChanel_val', 'false');}
    const TgChanel_val = localStorage.getItem('TgChanel_val') === 'true';

    if (!localStorage.getItem('TgOcties_val')) {localStorage.setItem('TgOcties_val', 'false');}
    const TgOcties_val = localStorage.getItem('TgOcties_val') === 'true';

    if (!localStorage.getItem('X_val')) {localStorage.setItem('X_val', 'false');}
    const X_val = localStorage.getItem('X_val') === 'true';

    if (!localStorage.getItem('Inst_val')) {localStorage.setItem('Inst_val', 'false');}
    const Inst_val = localStorage.getItem('Inst_val') === 'true';
    
    if (!localStorage.getItem('StartNft_val')) {localStorage.setItem('StartNft_val', 'false');}
    const StartNft_val = localStorage.getItem('StartNft_val') === 'true';
    
    if (!localStorage.getItem('WeeklyNft_val')) {localStorage.setItem('WeeklyNft_val', 'false');}
    const WeeklyNft_val = localStorage.getItem('WeeklyNft_val') === 'true';
    
    if (!localStorage.getItem('TonTran_val')) {localStorage.setItem('TonTran_val', 'false');}
    const TonTran_val = localStorage.getItem('TonTran_val') === 'true';
    
    if (!localStorage.getItem('Frends_val')) {localStorage.setItem('Frends_val', 'false');}
    const Frends_val = localStorage.getItem('Frends_val') === 'true';
    
    if (!localStorage.getItem('Wallet_val')) {localStorage.setItem('Wallet_val', 'false');}
    const Wallet_val = localStorage.getItem('Wallet_val') === 'true';

    useEffect(() => {
        if (TgChanel_val ||
            TgOcties_val || 
            X_val ||
            StartNft_val || 
            Frends_val ||
            Wallet_val || 
            WeeklyNft_val || 
            TonTran_val || 
            Inst_val) 
            {setVisiblaComplatedTask(true);}}, 
            [TgChanel_val, 
            TgOcties_val, 
            X_val, 
            StartNft_val, 
            Frends_val, 
            Wallet_val, 
            TonTran_val, 
            WeeklyNft_val,
            Inst_val]);


    useEffect(() => {
        if (TgChanel_val && TgOcties_val && X_val && StartNft_val && Frends_val && Wallet_val && Inst_val) {
            setVisiblaBasedTask(false);
        }
    }, [TgChanel_val, TgOcties_val, X_val, StartNft_val, Frends_val, Wallet_val, Inst_val]);

    useEffect(() => {
        if (WeeklyNft_val && TonTran_val) {
            setVisiblaWeekTask(false);
        }
    }, [WeeklyNft_val, TonTran_val]);



    const navigate = useNavigate();
    const location = useLocation();
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        coins: 0,
        photoUrl: ''
    });
    const [activeItem, setActiveItem] = useState(null);
  
    const [isLoading, setLoading] = useState(false);


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

        const urlParams = new URLSearchParams(window.location.search);
        const telegramId = urlParams.get('telegramId');

        if (telegramId) {
            fetch(`https://anypatbackend-production.up.railway.app/user-info?telegramId=${telegramId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        setUserInfo({
                            firstName: data.firstName,
                            coins: data.coins,
                            photoUrl: data.photoUrl
                            
                        });
                        setLoading(false);
                    } else {
                        console.error('Ошибка при получении данных о пользователе:', data.message);
                        setLoading(false);
                    }
                })
                .catch(error => {
                    console.error('Ошибка при запросе:', error);
                    setLoading(false);
                });
        }
        if (location.pathname === "/") {
            navigate("/home");
            setActiveItem(0);
        }
    }, [navigate, location]);

    const handleNavigation = (path, index) => {
        navigate(path);
        setActiveItem(index);
    };

    // ________________________________________________

    const [referrals, setReferrals] = useState([]);
    const [referralLink, setReferralLink] = useState('');
    const [userPhoto, setUserPhoto] = useState(avatar); 

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

    //______________________________________________________________

    return (
        <div className="App">
        {isLoading && <LoadingScreen wrapperClass="loading-wrapper-app" />}
        <div className={`appWrapper ${isLoading ? 'hidden' : ''}`}>
            <header className='headerWrapper'>
                <p className='userName'>{userInfo.firstName}</p>
                <div className='userAvatarWrapper'>
                    <img className='userAvatarImg' src={userInfo.photoUrl || nophoto} alt="userAvatar" />
                </div>
            </header>

            <div className='centeredBlock'>
                <Routes>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/nofriends" element={<NoFriends invite={invite} referralLink={referralLink} MintStart={MintStart}/>} />
                    <Route path="/friends" element={<Friends referrals={referrals} referralLink={referralLink} userPhoto={userPhoto} invite={invite} MintStart={MintStart} copy={copy}/>} />
                    <Route path="/quests" element={<Quests 
                    X={X} arrows={arrows} invite={invite} userInfo={userInfo} MintStart={MintStart} wallet={wallet} inst={inst} telegram={telegram}
                    TgChanel_val={TgChanel_val}  TgOcties_val={TgOcties_val}  X_val={X_val}  StartNft_val={StartNft_val}  Frends_val={Frends_val}  Wallet_val={Wallet_val} WeeklyNft_val={WeeklyNft_val} TonTran_val={TonTran_val} Inst_val={Inst_val}
                    VisiblaBasedTask={VisiblaBasedTask} VisiblaWeekTask={VisiblaWeekTask} VisiblaComplatedTask={VisiblaComplatedTask}/>}/>
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