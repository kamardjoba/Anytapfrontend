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

function App() {
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
                        setReferralLink(`https://t.me/Anytap_FrontTest_bot?start=${data.referralCode}`);
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
                    <Route path="/nofriends" element={<NoFriends />} invite={invite} MintStart={MintStart}/>
                    <Route path="/friends" element={<Friends referrals={referrals} referralLink={referralLink} userPhoto={userPhoto} />} />
                    <Route path="/quests" element={<Quests X={X} arrows={arrows} invite={invite} MintStart={MintStart} wallet={wallet} inst={inst} telegram={telegram}/>} />
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
