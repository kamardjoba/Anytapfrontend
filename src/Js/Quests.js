import React, { useState, useEffect } from 'react';
import '../Css/Quests.css';
import axios from 'axios';
import TgQuest from '../Quests/questTg';
import TgOctiesQuest from '../Quests/questOctiesTg';
import XQuest from '../Quests/questX';
import MintStartNft from '../Quests/questStartNft';
import FrendsQuest from '../Quests/questFriends';
import WeeklyNft from '../Quests/questWeeklyNft';
import TonTrans from '../Quests/questTon';
import TonW from '../Quests/questTonWallet';
import AdsGramTask from '../Quests/AdsGramTask';
// import Gas from '../Quests/questGaspump.js';
import GasChanel from '../Quests/GasChanell.js';
// import Captcha from '../Quests/Captcha.js'
import Partners from '../Quests/Quest_partner.js';
import PartnersTwo from '../Quests/Quest_partnerTwo.js';
import BuyAny from '../Quests/BuyAny.js';



function Quests({ X, arrows, invite, MintStart, wallet, inst, Ad, telegram,
    TgChanel_val,  TgOcties_val,  X_val,StartNft_val, Frends_val, WeeklyNft_val, TonTran_val, Inst_val, Bot_val, BotBourekas_val,
    VisiblaBasedTask, VisiblaWeekTask,VisiblaComplatedTask,referralsCount, TgFox_val, AppCenter_val, AppCenterChanel_val, MushroomQuest_val,
    PixelQuest_val, Gas_val, GasChanel_val, Partners_val, Partners_val2, BuyAny_val, chart_bar
}) {


    const [adsWatched, setAdsWatched] = useState(0); 
    const [telegramId, setTelegramId] = useState(null);

    useEffect(() => {
        if (window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
            if (user) {
                setTelegramId(user.id);
            } else {
                console.error('Не удалось получить Telegram ID');
            }
        }
    }, []);

    useEffect(() => {
       
        if (telegramId) {
            axios.get(`https://anypatbackend-production.up.railway.app/get-ads-watched?telegramId=${telegramId}`)
                .then(response => {
                    if (response.data.success) {
                        setAdsWatched(response.data.adsWatched); 
                    } else {
                        console.error('Ошибка при получении количества просмотренной рекламы:', response.data.message);
                    }
                })
                .catch(error => {
                    console.error('Ошибка при запросе количества просмотренной рекламы:', error);
                });
        }
    }, [telegramId]);



    useEffect(() => {
        if (window.Telegram.WebApp) {
            window.Telegram.WebApp.ready();
            const user = window.Telegram.WebApp.initDataUnsafe.user;
    
            if (user) {
                const telegramId = user.id;
                const checkSubscription = async () => {
                    try {
                        const response = await axios.post('https://anypatbackend-production.up.railway.app/check-subscription', { telegramId });
                        if (response.data.success && response.data.isSubscribedToChannel) {
                            localStorage.setItem('TgChanel_val', 'true');
                            window.dispatchEvent(new Event('storage'));
                        }else{
                            localStorage.setItem('TgChanel_val', 'false');
                            window.dispatchEvent(new Event('storage'));
                        }
                        if (response.data.success && response.data.isSubscribedToOctiesChannel) {
                            localStorage.setItem('TgOcties_val', 'true');
                            window.dispatchEvent(new Event('storage'));
                        }else{
                            localStorage.setItem('TgOcties_val', 'false');
                            window.dispatchEvent(new Event('storage'));
                        }
                        if (response.data.isSubscribedToTwitter) {
                            localStorage.setItem('X_val', 'true');
                            window.dispatchEvent(new Event('storage'));
                        }else{
                        localStorage.setItem('X_val', 'false');
                        window.dispatchEvent(new Event('storage'));
                        }
                        if (response.data.isSubscribedToInstagram) {
                            localStorage.setItem('Inst_val', 'true');
                            window.dispatchEvent(new Event('storage'));
                        }else{
                        localStorage.setItem('Inst_val', 'false');
                        window.dispatchEvent(new Event('storage'));
                        }
                        if (response.data.isSubscribedToBot) {
                            localStorage.setItem('Bot_val', 'true');
                            window.dispatchEvent(new Event('storage'));
                        }else{
                        localStorage.setItem('Bot_val', 'false');
                        window.dispatchEvent(new Event('storage'));
                        }
                        if (response.data.isSubscribedToBourekas) {
                            localStorage.setItem('BotBourekas_val', 'true');
                            window.dispatchEvent(new Event('storage'));
                        }else{
                        localStorage.setItem('BotBourekas_val', 'false');
                        window.dispatchEvent(new Event('storage'));
                        }
                        if (response.data.Frends_val) {
                            localStorage.setItem('Frends_val', 'true');
                            window.dispatchEvent(new Event('storage'));
                        }else{
                        localStorage.setItem('Frends_val', 'false');
                        window.dispatchEvent(new Event('storage'));
                        }
                        if (response.data.isSubscribedToFox) {
                            localStorage.setItem('TgFox_val', 'true'); 
                            window.dispatchEvent(new Event('storage'));
                        }else{
                            localStorage.setItem('TgFox_val', 'false'); 
                            window.dispatchEvent(new Event('storage'));
                        }
                        if (response.data.isSubscribedToCenter) {
                            localStorage.setItem('AppCenterChanel_val', 'true'); 
                            window.dispatchEvent(new Event('storage'));
                        }else{
                            localStorage.setItem('AppCenterChanel_val', 'false'); 
                            window.dispatchEvent(new Event('storage'));
                        }
                        if (response.data.isSubscribedToCenterapp) {
                            localStorage.setItem('AppCenter_val', 'true'); 
                            window.dispatchEvent(new Event('storage'));
                        }else{
                            localStorage.setItem('AppCenter_val', 'false'); 
                            window.dispatchEvent(new Event('storage'));
                        }
                        if (response.data.isSubscribedToMushroom) {
                            localStorage.setItem('MushroomQuest_val', 'true'); 
                            window.dispatchEvent(new Event('storage'));
                        }else{
                            localStorage.setItem('MushroomQuest_val', 'false'); 
                            window.dispatchEvent(new Event('storage'));
                        }
                        if (response.data.isSubscribedToPixel) {
                            localStorage.setItem('PixelQuest_val', 'true'); 
                            window.dispatchEvent(new Event('storage'));
                        }else{
                            localStorage.setItem('PixelQuest_val', 'false'); 
                            window.dispatchEvent(new Event('storage'));
                        }
                        if (response.data.isSubscribedToChat) {
                            localStorage.setItem('GasChanel_val', 'true'); 
                            window.dispatchEvent(new Event('storage'));
                        }else{
                            localStorage.setItem('GasChanel_val', 'false'); 
                            window.dispatchEvent(new Event('storage'));
                        }
                        if (response.data.isSubscribedToGaspump) {
                            localStorage.setItem('Gas_val', 'true'); 
                            window.dispatchEvent(new Event('storage'));
                        }else{
                            localStorage.setItem('Gas_val', 'false'); 
                            window.dispatchEvent(new Event('storage'));
                        }
                        if (response.data.isSubscribedToGaspump) {
                            localStorage.setItem('GoCaptcha_val', 'true'); 
                            window.dispatchEvent(new Event('storage'));
                        }else{
                            localStorage.setItem('GoCaptcha_val', 'false'); 
                            window.dispatchEvent(new Event('storage'));
                        }
                        if (response.data.isSubscribedTofuccdafomo) {
                            localStorage.setItem('Partners_val', 'true'); 
                            window.dispatchEvent(new Event('storage'));
                        }else{
                            localStorage.setItem('Partners_val', 'false'); 
                            window.dispatchEvent(new Event('storage'));
                        }
                        

                    } catch (error) {
                        console.error('Ошибка при проверке подписки:', error);
                    }
                };

                checkSubscription();
            } else {
                console.error('Не удалось получить данные пользователя из WebApp');
            }
        } else {
            console.error('Telegram WebApp API не доступен');
        }
    }, []);

    function GoX() {
        window.open('https://x.com/anytap_dapps?s=21', '_blank'); 
    
        if (window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
            if (user) {
                const telegramId = user.id;
                setTimeout(async () => {
                    try {
                        await axios.post('https://anypatbackend-production.up.railway.app/update-twitter-subscription', { telegramId });
                        localStorage.setItem('X_val', 'true'); 
                        window.dispatchEvent(new Event('storage'));
                        
                    } catch (error) {
                        console.error('Ошибка при обновлении подписки на Twitter:', error);
                    }
                     const referralUpdateResponse = await axios.post('https://anypatbackend-production.up.railway.app/add-coins-to-referral', { telegramId, amount: 200 });
                     if (referralUpdateResponse.data.success) {
                         console.log('Монеты реферера обновлены');
                     } else {
                         console.error('Ошибка при обновлении монет реферера:', referralUpdateResponse.data.message);
                     }
                }, 5000); 
            }
        }
    }

   
    function GoGasChanelNomer5() {
        window.open('https://t.me/anytapcommunity', '_blank'); 
    
        if (window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
            if (user) {
                const telegramId = user.id;
                setTimeout(async () => {
                    try {
                        await axios.post('https://anypatbackend-production.up.railway.app/update-telegram-Chat', { telegramId });
                        localStorage.setItem('GasChanel_val', 'true'); 
                        window.dispatchEvent(new Event('storage'));
                        
                    } catch (error) {
                        console.error('Ошибка при обновлении подписки на Twitter:', error);
                    }
                     const referralUpdateResponse = await axios.post('https://anypatbackend-production.up.railway.app/add-coins-to-referral', { telegramId, amount: 1000 });
                     if (referralUpdateResponse.data.success) {
                         console.log('Монеты реферера обновлены');
                     } else {
                         console.error('Ошибка при обновлении монет реферера:', referralUpdateResponse.data.message);
                     }
                }, 5000); 
            }
        }
    }
    function GoPartners() {
        window.open('https://t.me/fuccdafomo', '_blank'); 
    
        if (window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
            if (user) {
                const telegramId = user.id;
                setTimeout(async () => {
                    try {
                        await axios.post('https://anypatbackend-production.up.railway.app/update-telegram-fuccdafomo', { telegramId });
                        localStorage.setItem('Partners_val', 'true'); 
                        window.dispatchEvent(new Event('storage'));
                        
                    } catch (error) {
                        console.error('Ошибка при обновлении подписки на Twitter:', error);
                    }
                     const referralUpdateResponse = await axios.post('https://anypatbackend-production.up.railway.app/add-coins-to-referral', { telegramId, amount: 1000 });
                     if (referralUpdateResponse.data.success) {
                         console.log('Монеты реферера обновлены');
                     } else {
                         console.error('Ошибка при обновлении монет реферера:', referralUpdateResponse.data.message);
                     }
                }, 5000); 
            }
        }
    }
    function GoPartners2() {
        window.open('https://t.me/stare_blog', '_blank'); 
    
        if (window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
            if (user) {
                const telegramId = user.id;
                setTimeout(async () => {
                    try {
                        await axios.post('https://anypatbackend-production.up.railway.app/update-telegram-Chat', { telegramId });
                        localStorage.setItem('Partners_val2', 'true'); 
                        window.dispatchEvent(new Event('storage'));
                        
                    } catch (error) {
                        console.error('Ошибка при обновлении подписки на Twitter:', error);
                    }
                     const referralUpdateResponse = await axios.post('https://anypatbackend-production.up.railway.app/add-coins-to-referral', { telegramId, amount: 1000 });
                     if (referralUpdateResponse.data.success) {
                         console.log('Монеты реферера обновлены');
                     } else {
                         console.error('Ошибка при обновлении монет реферера:', referralUpdateResponse.data.message);
                     }
                }, 5000); 
            }
        }
    }
    function GoBuyAny() {
        window.open('https://dedust.io/swap/TON/EQBcRNasT9lQwvXR-k2gCZtPWuo3lN8a6qveOGTlyJZ6jWsV?amount=5000000000', '_blank'); 
    
        if (window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
            if (user) {
                const telegramId = user.id;
                setTimeout(async () => {
                    try {
                        await axios.post('https://anypatbackend-production.up.railway.app/update-telegram-Chat', { telegramId });
                        localStorage.setItem('BuyAny_val', 'true'); 
                        window.dispatchEvent(new Event('storage'));
                        
                    } catch (error) {
                        console.error('Ошибка при обновлении подписки на Twitter:', error);
                    }
                     const referralUpdateResponse = await axios.post('https://anypatbackend-production.up.railway.app/add-coins-to-referral', { telegramId, amount: 2000 });
                     if (referralUpdateResponse.data.success) {
                         console.log('Монеты реферера обновлены');
                     } else {
                         console.error('Ошибка при обновлении монет реферера:', referralUpdateResponse.data.message);
                     }
                }, 5000); 
            }
        }
    }

    function GoTg() {
        window.open('https://t.me/any_tap', '_blank');
        
        if (window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
        
            if (user) {
                const telegramId = user.id;
    
                const intervalId = setInterval(async () => {
                    try {
                        const response = await axios.post('https://anypatbackend-production.up.railway.app/check-subscription', { telegramId });
    
                        if (response.data.success && response.data.isSubscribedToChannel) {
                            localStorage.setItem('TgChanel_val', 'true');
                            window.dispatchEvent(new Event('storage'));
                            
                            try {
                                const referralUpdateResponse = await axios.post('https://anypatbackend-production.up.railway.app/add-coins-to-referral', { telegramId, amount: 200 });
                                if (referralUpdateResponse.data.success) {
                                    console.log('Монеты реферера обновлены');
                                    clearInterval(intervalId); 
                                } else {
                                    console.error('Ошибка при обновлении монет реферера:', referralUpdateResponse.data.message);
                                }
                            } catch (error) {
                                console.error('Ошибка при вызове add-coins-to-referral:', error);
                            }
                        } else {
                            localStorage.setItem('TgChanel_val', 'false');
                            window.dispatchEvent(new Event('storage'));
                        }
                    } catch (error) {
                        console.error('Ошибка при проверке подписки:', error);
                        localStorage.setItem('TgChanel_val', 'false');
                        window.dispatchEvent(new Event('storage'));
                    }
                }, 5000); 
            }
        }
    }
    
    function GoOct() {
        window.open('https://t.me/octies_community', '_blank');
        
        if (window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
        
            if (user) {
                const telegramId = user.id;
    
                const intervalId = setInterval(async () => {
                    try {
                        const response = await axios.post('https://anypatbackend-production.up.railway.app/check-subscription', { telegramId });
    
                        if (response.data.success && response.data.isSubscribedToOctiesChannel) {
                            localStorage.setItem('TgOcties_val', 'true');
                            window.dispatchEvent(new Event('storage'));
                            
                            try {
                                const referralUpdateResponse = await axios.post('https://anypatbackend-production.up.railway.app/add-coins-to-referral', { telegramId, amount: 200 });
                                if (referralUpdateResponse.data.success) {
                                    console.log('Монеты реферера обновлены');
                                    clearInterval(intervalId); 
                                } else {
                                    console.error('Ошибка при обновлении монет реферера:', referralUpdateResponse.data.message);
                                }
                            } catch (error) {
                                console.error('Ошибка при вызове add-coins-to-referral:', error);
                            }
                        } else {
                            localStorage.setItem('TgOcties_val', 'false');
                            window.dispatchEvent(new Event('storage'));
                        }
                    } catch (error) {
                        console.error('Ошибка при проверке подписки:', error);
                        localStorage.setItem('TgOcties_val', 'false');
                        window.dispatchEvent(new Event('storage'));
                    }
                }, 5000); 
            }
        }
    }

    return (
        <div className='questsPage'>

            <div className='basedtask'>
                <TonW wallet={wallet} telegramId={telegramId} />
            </div>
            {VisiblaBasedTask && <div className='basedtask'>
                <div className='txtNf'>
                    <p>Based task</p>
                </div>
                {!BuyAny_val && <BuyAny chart_bar={chart_bar} GoBuyAny={GoBuyAny}/>} 
                {!Partners_val && <Partners telegram={telegram} GoPartners={GoPartners}/>} 
                {!Partners_val2 && <PartnersTwo telegram={telegram} GoPartners2={GoPartners2}/>} 
                {/* {!Gas_val && <Gas telegram={telegram} GoGas={GoGas}/>} */}
                {!GasChanel_val && <GasChanel telegram={telegram} GoGasChanelNomer5={GoGasChanelNomer5}/>}
                {/* {!GoCaptcha_val && <Captcha telegram={telegram} GoCaptcha={GoCaptcha}/>} */}
                {/* {!MushroomQuest_val && <MushroomQuest telegram={telegram} GoMushrom={GoMushroom}/>} */}
                {/* {!AppCenter_val && <TgAppCenter telegram={telegram} GoAppCenter={GoAppCenter}/>} */}
                {/* {!AppCenterChanel_val && <TgAppChanell telegram={telegram} GoAppChanel={GoAppChanel}/>} */}
                {/* {!TgFox_val && <FoxQuest telegram={telegram} GoFox={GoFox}/>} */}
                

                {!TgChanel_val && <TgQuest GoTg={GoTg} telegram={telegram} />}
                {!TgOcties_val && <TgOctiesQuest GoOct={GoOct} telegram={telegram}/>}
                {!X_val && <XQuest GoX={GoX} X={X}/>}
                {!StartNft_val && <MintStartNft  StartNft_val={StartNft_val}  MintStart={MintStart} telegramId={telegramId}/>}
                {!Frends_val && <FrendsQuest telegramId={telegramId} invite={invite} referralsCount={referralsCount} />}
                <AdsGramTask Ad={Ad} telegramId={telegramId} adsWatched={adsWatched}/>

            </div>}

            {VisiblaWeekTask &&<div className='basedtask'>
                <div className='txtNf'>
                    <p>Weekly task</p>
                </div>

                {!WeeklyNft_val && <WeeklyNft WeeklyNft_val = {WeeklyNft_val} telegramId={telegramId} arrows={arrows}/>}
                {!TonTran_val && <TonTrans TonTran_val={TonTran_val} telegramId={telegramId} arrows={arrows} />}     

            </div>}

            {VisiblaComplatedTask && <div id='complatedtask'>
                <div className='txtNf'>
                    <p>Complеted task</p>
                </div>

                {BuyAny_val && <BuyAny chart_bar={chart_bar} BuyAny_val={BuyAny_val}/>} 
                {Partners_val && <Partners telegram={telegram} Partners_val={Partners_val}/>} 
                {Partners_val2 && <PartnersTwo telegram={telegram} Partners_val2={Partners_val2}/>} 
                {/* {Gas_val && <Gas telegram={telegram} Gas_val={Gas_val}/>} */}
                {GasChanel_val && <GasChanel telegram={telegram} GasChanel_val={GasChanel_val }/>}
                {/* {GoCaptcha_val && <Captcha telegram={telegram} GoCaptcha_val={GoCaptcha_val }/>} */}
                {/* {MushroomQuest_val && <MushroomQuest MushroomQuest_val={MushroomQuest_val} telegram={telegram} />} */}
                {/* {PixelQuest_val && <PixelQuest PixelQuest_val={PixelQuest_val} telegram={telegram} />} */}

                {/* {AppCenter_val && <TgAppCenter telegram={telegram} AppCenter_val={AppCenter_val}/>} */}
                {/* {AppCenterChanel_val && <TgAppChanell telegram={telegram} AppCenterChanel_val={AppCenterChanel_val}/>} */}
                {/* {TgFox_val && <FoxQuest telegram={telegram} TgFox_val={TgFox_val}/>} */}

                {TgChanel_val && <TgQuest TgChanel_val={TgChanel_val} telegram={telegram}/>}
                {TgOcties_val && <TgOctiesQuest TgOcties_val={TgOcties_val} telegram={telegram}/>}
                {X_val && <XQuest X_val={X_val} X={X} />}
                {StartNft_val && <MintStartNft StartNft_val={StartNft_val} MintStart={MintStart} telegramId={telegramId}/>}
                {Frends_val && <FrendsQuest Frends_val={Frends_val} telegramId={telegramId} invite={invite} referralsCount={referralsCount} />}
                {WeeklyNft_val && <WeeklyNft WeeklyNft_val={WeeklyNft_val} telegramId={telegramId} arrows={arrows} />}
                {TonTran_val && <TonTrans TonTran_val={TonTran_val} telegramId={telegramId} arrows={arrows} />}

            </div>}
        </div>
    );
}

export default Quests;