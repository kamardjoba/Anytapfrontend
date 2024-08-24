import React from 'react';
import '../Loading/Loading.css';
import ppnngg from '../IMG/diamond.png';

function LoadingScreen() {

    return (
        <div className="loading-screen">
            <img src={ppnngg} alt=''/>
            <div id="loading-wrapper">
                <div id="loading-content"></div>
            </div>

        </div>
    );
}

export default LoadingScreen;
