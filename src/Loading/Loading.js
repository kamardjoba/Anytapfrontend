import React from 'react';
import '../Loading/Loading.css';
import ppnngg from '../IMG/diamond.png';

function LoadingScreen({ wrapperClass, loadingScreenClass }) {
    return (
        <div className={loadingScreenClass}>
            <img src={ppnngg} alt=''/>
            <div className={wrapperClass}>
                <div id="loading-content"></div>
            </div>
        </div>
    );
}

export default LoadingScreen;
