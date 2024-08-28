import React from 'react';
import '../Css/HomePage.css';
import diamond from '../IMG/diamond.png';

function HomePage({ coins }) {

    function ClrLocal() {
      
        // localStorage.clear();
        // window.dispatchEvent(new Event('storage'));

    }

    return (
        <div className='homepageContainer'>
            <div className='homepageWrapper'>
                <p className='welcomeText'>Welcome to <br/>Anytap!</p>
                <div className='amountWrapper'>
                    <p className='amount'>{coins}</p> 
                    <img src={diamond} alt="" className='diamondImgHomepage' onClick={(event) => {ClrLocal();}} />
                </div>
                <p className='homepageDescr'>
                    Earn points, mint NFTs, <br/>and receive valuable <br/>  rewards for your activity!
                </p>
            </div>
        </div>
    );
}

export default HomePage;
