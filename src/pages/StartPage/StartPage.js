import React from 'react';
import diamond from './../../images/diamond.png';
import './../../App.css';

function StartPage(props) {
    return (
        <div className='startpageContainer'>
            <div className='startpageWrapper'>
                <div className='diamondImgWrapper'>
                    <img src={diamond} alt="" className='diamondImg'/>
                </div>
                <p className='startpageText'>
                    Connect your wallet and explore the world of cryptocurrencies by completing simple tasks!
                </p>
                <button className='connectBtn'>Connect</button>
            </div>
        </div>

    );
}

export default StartPage;