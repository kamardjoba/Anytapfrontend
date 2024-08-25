import React from 'react';
import '../Loading/Loading.css';
import ppnngg from '../IMG/diamond.png';

function LoadingScreen({ wrapperClass }) {
    return (
        <div className="loading-screen">
            <img src={ppnngg} alt=''/>
            <div className={wrapperClass}>
                <div id="loading-content"></div>
            </div>
        </div>
    );
}

export default LoadingScreen;
