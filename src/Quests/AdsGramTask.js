import React, { useEffect, useRef } from 'react';
import '../Css/Quests.css';

const AdsGramTask = ({ Ad }) => {
    const AdControllerRef = useRef(null);

    // Инициализация AdsGram SDK при первом рендере
    useEffect(() => {
        if (window.Adsgram) {
            AdControllerRef.current = window.Adsgram.init({
                blockId: "2649", // замените на ваш реальный blockId
                debug: true, // отключите в продакшене
                debugBannerType: "FullscreenMedia" // тип тестового баннера, если debug включен
            });
        }
    }, []); // пустой массив зависимостей для выполнения только один раз

    const showAd = () => {
        if (AdControllerRef.current) {
            AdControllerRef.current.show()
                .then((result) => {
                    if (result.done) {
                        console.log('Пользователь досмотрел рекламу до конца');
                        // Здесь можно добавить логику для начисления монет
                    }
                })
                .catch((error) => {
                    console.error('Ошибка при показе рекламы:', error);
                });
        } else {
            console.error('AdsGram SDK не загружен');
        }
    };

    return (
        <div className='questItem'>
            <div className='questItemLeft'>
                <div className='questIcon'>
                    <img src={Ad} alt=""/>
                </div>
                <div className='questItemLeftContent'>
                    <p className='questTitle'>Watch some interesting </p>
                    <p className='questSubtitle'>+200 points</p>
                </div>
            </div>
            <div className='questItemRight'>
                <button className='questBtn' onClick={showAd}>Watch!</button>
            </div>
        </div>
    );
};

export default AdsGramTask;