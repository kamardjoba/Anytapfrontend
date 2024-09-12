import React, { useEffect, useRef } from 'react';
import '../Css/Quests.css';

const AdsGramTask = ({ Ad, telegramId, adsWatched }) => {
    const AdControllerRef = useRef(null);

    // Инициализация AdsGram SDK при первом рендере
    useEffect(() => {
        if (window.Adsgram) {
            AdControllerRef.current = window.Adsgram.init({
                blockId: "2682", // замените на ваш реальный blockId
                debug: false, // отключите в продакшене
                debugBannerType: "FullscreenMedia" // тип тестового баннера, если debug включен
            });
        }
    }, []); // пустой массив зависимостей для выполнения только один раз

    // const showAd = () => {
    //     try {
    //         // Fetch the number of ads watched
    //         const response = await fetch(`https://anypatbackend-production.up.railway.app/get-ads-watched?telegramId=${telegramId}`);
    //         const data = await response.json();
            
    //         if (data.success) {
    //             const adsWatched = data.adsWatched;

    //             // Check if the user has watched 20 or more ads
    //             if (adsWatched >= 20) {
    //                 alert('Лимит на просмотр рекламы превышен. Вы уже просмотрели 20 реклам.');
    //                 return; // Don't proceed with showing the ad
    //             }
                

    //             if (AdControllerRef.current) {
    //                 AdControllerRef.current.show()
    //                     .then(async (result) => {
    //                         if (result.done) {
    //                             console.log('Пользователь досмотрел рекламу до конца');
                      

    //                     // Добавляем монеты пользователю
    //                     try {
    //                         const response = await fetch('https://anypatbackend-production.up.railway.app/add-coins', {
    //                             method: 'POST',
    //                             headers: {
    //                                 'Content-Type': 'application/json',
    //                             },
    //                             body: JSON.stringify({ telegramId, amount: 25 }),
    //                         });
    
    //                         const data = await response.json();
    //                         if (data.success) {
    //                             console.log('25 монет успешно добавлены пользователю');

    //                             const adsResponse = await fetch('https://anypatbackend-production.up.railway.app/update-ads-watched', {
    //                                 method: 'POST',
    //                                 headers: {
    //                                     'Content-Type': 'application/json',
    //                                 },
    //                                 body: JSON.stringify({ telegramId }),
    //                             });

    //                             const adsData = await adsResponse.json();
    //                             if (adsData.success) {
    //                                 console.log('Количество просмотров рекламы обновлено:', adsData.adsWatched);
    //                             } else {
    //                                 console.error('Ошибка при обновлении количества просмотров рекламы:', adsData.message);
    //                             }
    //                             // Теперь обновляем монеты реферера
    //                             const referralUpdateResponse = await fetch('https://anypatbackend-production.up.railway.app/add-coins-to-referral', {
    //                                 method: 'POST',
    //                                 headers: {
    //                                     'Content-Type': 'application/json',
    //                                 },
    //                                 body: JSON.stringify({ telegramId, amount: 25 }), // Можно настроить количество монет
    //                             });

    //                             const referralData = await referralUpdateResponse.json();
    //                             if (referralData.success) {
    //                                 console.log('Монеты реферера успешно обновлены');
    //                             } else {
    //                                 console.error('Ошибка при обновлении монет реферера:', referralData.message);
    //                             }
    //                         } else {
    //                             console.error('Ошибка при добавлении монет пользователю:', data.message);
    //                         }
    //                     } catch (error) {
    //                         console.error('Ошибка при выполнении запроса на добавление монет:', error);
    //                     }
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.error('Ошибка при показе рекламы:', error);
    //             });
    //     } else {
    //         console.error('AdsGram SDK не загружен');
    //     }
    // };


    const showAd = async () => {
        try {
            // Fetch the number of ads watched
            const response = await fetch(`https://anypatbackend-production.up.railway.app/get-ads-watched?telegramId=${telegramId}`);
            const data = await response.json();
            
            if (data.success) {
                const adsWatched = data.adsWatched;

                // Check if the user has watched 20 or more ads
                if (adsWatched >= 20) {
                    alert('Лимит на просмотр рекламы превышен. Вы уже просмотрели 20 реклам.');
                    return; // Don't proceed with showing the ad
                }

                // If ads watched are less than 20, show the ad
                if (AdControllerRef.current) {
                    AdControllerRef.current.show()
                        .then(async (result) => {
                            if (result.done) {
                                console.log('Пользователь досмотрел рекламу до конца');
                                
                                // Add coins to user
                                try {
                                    const addCoinsResponse = await fetch('https://anypatbackend-production.up.railway.app/add-coins', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ telegramId, amount: 25 }),
                                    });

                                    const coinsData = await addCoinsResponse.json();
                                    if (coinsData.success) {
                                        console.log('25 монет успешно добавлены пользователю');
                                        
                                        // Update ads watched count
                                        const updateAdsResponse = await fetch('https://anypatbackend-production.up.railway.app/update-ads-watched', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({ telegramId }),
                                        });

                                        const adsUpdateData = await updateAdsResponse.json();
                                        if (adsUpdateData.success) {
                                            console.log('Количество просмотров рекламы обновлено:', adsUpdateData.adsWatched);
                                        } else {
                                            console.error('Ошибка при обновлении количества просмотров рекламы:', adsUpdateData.message);
                                        }
                                        const referralUpdateResponse = await fetch('https://anypatbackend-production.up.railway.app/add-coins-to-referral', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({ telegramId, amount: 25 }), // Можно настроить количество монет
                                        });
                                        const referralData = await referralUpdateResponse.json();
                                        if (referralData.success) {
                                            console.log('Монеты реферера успешно обновлены');
                                        } else {
                                            console.error('Ошибка при обновлении монет реферера:', referralData.message);
                                        }
                                    } else {
                                        console.error('Ошибка при добавлении монет пользователю:', coinsData.message);
                                    }
                                } catch (error) {
                                    console.error('Ошибка при выполнении запроса на добавление монет:', error);
                                }
                            }
                        })
                        .catch((error) => {
                            console.error('Ошибка при показе рекламы:', error);
                        });
                } else {
                    console.error('AdsGram SDK не загружен');
                }
            } else {
                console.error('Ошибка при получении количества просмотренной рекламы:', data.message);
            }
        } catch (error) {
            console.error('Ошибка при запросе количества просмотренной рекламы:', error);
        }
    };

    return (
        <div className='questItem'>
            <div className='questItemLeft'>
                <div className='questIcon'>
                    <img src={Ad} alt=""/>
                </div>
                <div className='questItemLeftContent'>
                    <p className='questTitle'>Watch an ad and earn points</p>
                    <p className='questSubtitle'>+25 points</p>
                </div>
            </div>
            <div className='questItemRight'>
                <button className='questBtn' onClick={showAd}>Watch!</button>
            </div>
        </div>
    );
};

export default AdsGramTask;