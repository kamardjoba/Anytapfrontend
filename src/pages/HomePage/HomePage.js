import React from 'react';
import './../../App.css';
import diamond from './../../images/diamond.png';

function HomePage(props) {
    return (
        <div className='homepageContainer'>
            <div className='homepageWrapper'>
                <p className='welcomeText'>Welcome to Anytap!</p>
                <div className='amountWrapper'>
                    <p className='amount'>500</p>
                    <img src={diamond} alt="" className='diamondImgHomepage'/>
                </div>
                <p className='homepageDescr'>
                    Earn points, mint NFTs, and receive valuable rewards for your activity!
                </p>
            </div>
        </div>
    );
}

export default HomePage;